namespace OneXrm.Generator
{
  using CommandLine;
  using CommandLine.Text;

  /// <summary>
  /// The Options class
  /// </summary>
  public sealed class Options
  {
    /// <summary>
    /// Gets or sets the connection string
    /// </summary>
    [Option('c', "connectionstring", Required = true, HelpText = "The connection string to the Dynamics 365 instance.")]
    public string ConnectionString { get; set; }

    /// <summary>
    /// Gets or sets the list of entities to generate wrappers for
    /// </summary>
    [Option('e', "entities", HelpText = "Comma separated list of entities to generate wrapper classes for.")]
    public string Entities { get; set; }

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
