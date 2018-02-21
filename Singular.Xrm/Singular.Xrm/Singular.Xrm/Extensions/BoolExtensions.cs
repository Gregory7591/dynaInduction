namespace System
{
  using System.ComponentModel;
  using System.Reflection;

  /// <summary>
  /// The BoolExtensions class
  /// </summary>
  public static class BoolExtensions
  {
    /// <summary>
    /// Converts the value of this instance to its equivalent description attribute
    /// </summary>
    /// <param name="value">A System.Boolean value</param>
    /// <returns>The value of this instance to its equivalent description attribute</returns>
    public static string ToDescription(this bool value)
    {
      FieldInfo fieldInfo = value.GetType().GetField(value.ToString());
      DescriptionAttribute attribute = Attribute.GetCustomAttribute(fieldInfo, typeof(DescriptionAttribute)) as DescriptionAttribute;
      return attribute.Description;
    }
  }
}
