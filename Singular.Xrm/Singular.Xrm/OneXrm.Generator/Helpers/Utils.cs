namespace OneXrm.Generator.Helpers
{
  using System.Collections.Generic;
  using System.Globalization;
  using System.Linq;
  using System.Text.RegularExpressions;
  using Microsoft.Xrm.Sdk.Metadata;

  /// <summary>
  /// The Utils class
  /// </summary>
  public sealed class Utils
  {
    /// <summary>
    /// Get the string representation of the options from attribute metadata
    /// </summary>
    /// <param name="attributeMetadata">The attribute metadata</param>
    /// <returns>The string representation of the options from attribute metadata</returns>
    public static string GetOptions(AttributeMetadata attributeMetadata)
    {
      Dictionary<int, string> options = new Dictionary<int, string>();
      switch (attributeMetadata.AttributeType)
      {
        case AttributeTypeCode.Boolean:
          BooleanAttributeMetadata booleanAttributeMetadata = (BooleanAttributeMetadata)attributeMetadata;
          options.Add(1, booleanAttributeMetadata.OptionSet.TrueOption == null ? "Yes" : Utils.ToValidIdentifier(booleanAttributeMetadata.OptionSet.TrueOption.Label.UserLocalizedLabel.Label));
          options.Add(0, booleanAttributeMetadata.OptionSet.FalseOption == null ? "No" : Utils.ToValidIdentifier(booleanAttributeMetadata.OptionSet.FalseOption.Label.UserLocalizedLabel.Label));
          break;
        case AttributeTypeCode.Picklist: options = Utils.ToUniqueValues(((PicklistAttributeMetadata)attributeMetadata).OptionSet.Options); break;
        case AttributeTypeCode.State: options = Utils.ToUniqueValues(((StateAttributeMetadata)attributeMetadata).OptionSet.Options); break;
        case AttributeTypeCode.Status: options = Utils.ToUniqueValues(((StatusAttributeMetadata)attributeMetadata).OptionSet.Options); break;
        case AttributeTypeCode.Virtual:
          if (attributeMetadata is MultiSelectPicklistAttributeMetadata)
          {
            options = Utils.ToUniqueValues(((MultiSelectPicklistAttributeMetadata)attributeMetadata).OptionSet.Options);
          }
          break;
      }

      return string.Join(",\n", options.Select(o => string.Format("      {0} = {1}", o.Value, o.Key.ToString(CultureInfo.InvariantCulture))).ToArray());
    }

    /// <summary>
    /// Replace special characters in the supplied value
    /// </summary>
    /// <param name="value">The value</param>
    /// <returns>The supplied value with special characters removed</returns>
    private static string ReplaceSpecial(string value)
    {
      return value.Replace("<>", "NotEquals").Replace("!=", "NotEquals").Replace("=", "Equals").Replace("<", "LessThan").Replace(">", "GreaterThan").Replace("+", "Plus");
    }

    /// <summary>
    /// Get the unique values from an option metadata collection
    /// </summary>
    /// <param name="optionMetadataCollection">The option metadata collection</param>
    /// <returns>The unique values from an option metadata collection</returns>
    private static Dictionary<int, string> ToUniqueValues(OptionMetadataCollection optionMetadataCollection)
    {
      return Utils.ToUniqueValues(optionMetadataCollection.ToDictionary(m => m.Value.Value, m => m.Label.UserLocalizedLabel.Label));
    }

    /// <summary>
    /// Get unique values from the supplied source
    /// </summary>
    /// <param name="source">The source</param>
    /// <returns>The unique values from the supplied source</returns>
    private static Dictionary<int, string> ToUniqueValues(Dictionary<int, string> source)
    {
      source = source.ToDictionary(sv => sv.Key, sv => Utils.ToValidIdentifier(sv.Value));
      Dictionary<string, int> uniqueValues = source.GroupBy(sv => sv.Value).ToDictionary(g => g.Key, g => g.Count());
      return source.ToDictionary(sv => sv.Key, sv => uniqueValues[sv.Value] == 1 ? sv.Value : string.Format("{0}_{1}", sv.Value, sv.Key.ToString(CultureInfo.InvariantCulture)));
    }

    /// <summary>
    /// Convert the source to a valid identifier
    /// </summary>
    /// <param name="source">The source</param>
    /// <returns>A valid identifier</returns>
    private static string ToValidIdentifier(string source)
    {
      if (string.IsNullOrEmpty(source))
      {
        return "None";
      }
      else
      {
        source = Utils.ReplaceSpecial(source);

        string result = string.Empty;
        foreach (Match m in Regex.Matches(source, "[A-Za-z0-9]"))
        {
          result += m.ToString();
        }

        if (string.IsNullOrEmpty(source))
        {
          result = "None";
        }

        if (char.IsDigit(result[0]))
        {
          result = "_" + result;
        }

        return result;
      }
    }
  }
}
