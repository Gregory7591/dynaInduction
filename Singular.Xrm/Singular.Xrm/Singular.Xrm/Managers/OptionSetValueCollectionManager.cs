namespace Singular.Xrm.Managers
{
  using System.Collections.Generic;
  using Microsoft.Xrm.Sdk;

  /// <summary>
  /// The OptionSetValueCollectionManager class
  /// </summary>
  public sealed class OptionSetValueCollectionManager
  {
    /// <summary>
    /// Prevents a default instance of the <see cref="OptionSetValueCollectionManager"/> class from being created.
    /// </summary>
    private OptionSetValueCollectionManager()
    {
    }

    /// <summary>
    /// Temporary helper method while OptionSetValueCollection does not support System.Linq Select
    /// </summary>
    /// <param name="optionSetValueCollection">The option set collection</param>
    /// <returns>The option set values</returns>
    public static IEnumerable<int> GetValues(OptionSetValueCollection optionSetValueCollection)
    {
      List<int> values = new List<int>();
      if (optionSetValueCollection != null)
      {
        foreach (OptionSetValue optionSetValue in optionSetValueCollection)
        {
          values.Add(optionSetValue.Value);
        }
      }
      return values;
    }
  }
}
