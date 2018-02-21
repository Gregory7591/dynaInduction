namespace CrmPackage.Singular.PostBuild
{
  using System;
  using System.IO;
  using System.Text;
  using System.Text.RegularExpressions;
  using System.Xml;
  using Microsoft.Ajax.Utilities;

  /// <summary>
  /// The Program class
  /// </summary>
  public class Program
  {
    /// <summary>
    /// The arguments
    /// </summary>
    private static Options options;

    /// <summary>
    /// The main method
    /// </summary>
    /// <param name="args">The arguments</param>
    public static void Main(string[] args)
    {
      options = new Options();
      if (CommandLine.Parser.Default.ParseArguments(args, options))
      {
        Console.WriteLine("Copying web resources from {0}...", options.Source);

        ProcessFolder(options.Source, options.Source);

        Console.WriteLine("Done copying web resources");
      }
    }

    /// <summary>
    /// Process an output folder
    /// </summary>
    /// <param name="directoryPath">The directory path</param>
    /// <param name="sourceRoot">The source root directory</param>
    private static void ProcessFolder(string directoryPath, string sourceRoot)
    {
      Minifier minifier = new Minifier();
      foreach (string filePath in Directory.GetFiles(directoryPath))
      {
        FileInfo fileInfo = new FileInfo(filePath);
        string destinationPath = fileInfo.FullName.Replace(@"\CrmPackage.Singular\", @"\CrmPackage\");

        if (File.Exists(destinationPath))
        {
          Console.WriteLine("Processing {0}", destinationPath);

          bool addOneXrm = false;

          string fileContent = File.ReadAllText(filePath);

          Match match = Regex.Match(fileContent, @"\/\/\/ <.{1,}\/>");
          while (match.Success)
          {
            XmlDocument xmlDocument = new XmlDocument();
            xmlDocument.LoadXml(match.Value.Substring(4));

            bool include = xmlDocument.ChildNodes[0].Attributes["include"] != null && xmlDocument.ChildNodes[0].Attributes["include"].Value == "true";
            string includePath = xmlDocument.ChildNodes[0].Attributes["path"].Value;

            addOneXrm |= includePath.Contains("/OneXrm/OneXrm.ts") && include;

            if (include)
            {
              Console.WriteLine("Including {0}", includePath);
              string includeFileContent = File.ReadAllText(string.Format("{0}\\{1}", directoryPath, includePath.Replace(".ts", ".js")));
              fileContent = fileContent.Replace(match.Value, includeFileContent);
            }
            else
            {
              fileContent = fileContent.Replace(match.Value, string.Empty);
            }

            match = Regex.Match(fileContent, @"\/\/\/ <.{1,}\/>");
          }

          StringBuilder stringBuilder = new StringBuilder();
          if (addOneXrm)
          {
            string jQuery = File.ReadAllText(string.Format("..\\..\\Singular.Xrm\\Singular.Xrm\\CrmPackage.Singular.PostBuild\\Scripts\\jquery-3.1.1{0}.js", options.Minify ? ".min" : string.Empty));
            string linq = File.ReadAllText(string.Format("..\\..\\Singular.Xrm\\Singular.Xrm\\CrmPackage.Singular.PostBuild\\Scripts\\linq{0}.js", options.Minify ? ".min" : string.Empty));

            stringBuilder.AppendLine(jQuery);
            stringBuilder.AppendLine(linq);
            stringBuilder.AppendLine("window['OneXrmjQuery'] = jQuery.noConflict(true);");
            stringBuilder.AppendLine("(function ($) {");
          }

          stringBuilder.AppendLine(options.Minify ? minifier.MinifyJavaScript(fileContent) : fileContent);

          if (addOneXrm)
          {
            stringBuilder.AppendLine("})(window['OneXrmjQuery']);");
          }

          File.WriteAllText(destinationPath, stringBuilder.ToString());
        }
      }

      foreach (string subDirectoryPath in Directory.GetDirectories(directoryPath))
      {
        ProcessFolder(subDirectoryPath, sourceRoot);
      }
    }
  }
}
