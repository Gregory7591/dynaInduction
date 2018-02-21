namespace CrmPackage.Singular.PostBuild
{
  using CommandLine;
  using CommandLine.Text;

  /// <summary>
  /// The Options class
  /// </summary>
  public sealed class Options
  {
    /// <summary>
    /// Gets or sets the Source argument
    /// </summary>
    [Option('s', "source", Required = true, HelpText = "The path to the source WebResources folder.")]
    public string Source { get; set; }

    /// <summary>
    /// Gets or sets a value indicating whether to minify the output
    /// </summary>
    [Option('m', "minify", DefaultValue = false, HelpText = "A value indicating whether to minify the included library javascript.")]
    public bool Minify { get; set; }

    /// <summary>
    /// Gets or sets the last parser state
    /// </summary>
    [ParserState]
    public IParserState LastParserState { get; set; }

    /// <summary>
    /// Gets the usage of the arguments
    /// </summary>
    /// <returns>The usage of the arguments</returns>
    [HelpOption]
    public string GetUsage()
    {
      return HelpText.AutoBuild(this, (HelpText current) => HelpText.DefaultParsingErrorsHandler(this, current));
    }
  }
}
