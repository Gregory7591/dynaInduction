namespace System
{
  /// <summary>
  /// The CharExtensions class.
  /// </summary>
  public static class CharExtensions
  {
    /// <summary>
    /// Returns a copy of this System.Char converted to uppercase.
    /// </summary>
    /// <param name="value">The value</param>
    /// <returns>A copy of the char converted to uppercase</returns>
    public static char ToLower(this char value)
    {
      return value.ToString().ToLower()[0];
    }

    /// <summary>
    /// Returns a copy of this System.Char object converted to lowercase, using the casing rules of the specified culture.
    /// </summary>
    /// <param name="value">The value</param>
    /// <param name="culture">An object that supplies culture-specific casing rules</param>
    /// <returns>A copy of the char converted to lowercase, using the casing rules of the specified culture</returns>
    public static char ToLower(this char value, System.Globalization.CultureInfo culture)
    {
      return value.ToString().ToLower(culture)[0];
    }

    /// <summary>
    /// Returns a copy of this System.Char object converted to lowercase, using the casing rules of the invariant culture.
    /// </summary>
    /// <param name="value">The value</param>
    /// <returns>A copy of this System.Char object converted to lowercase, using the casing rules of the invariant culture</returns>
    public static char ToLowerInvariant(this char value)
    {
      return value.ToString().ToLowerInvariant()[0];
    }

    /// <summary>
    /// Returns a copy of this System.Char object converted to lowercase.
    /// </summary>
    /// <param name="value">The value</param>
    /// <returns>A copy of the char converted to lowercase</returns>
    public static char ToUpper(this char value)
    {
      return value.ToString().ToUpper()[0];
    }

    /// <summary>
    /// Returns a copy of this System.Char object converted to uppercase, using the casing rules of the specified culture.
    /// </summary>
    /// <param name="value">The value</param>
    /// <param name="culture">An object that supplies culture-specific casing rules</param>
    /// <returns>A copy of the char converted to uppercase, using the casing rules of the specified culture</returns>
    public static char ToUpper(this char value, System.Globalization.CultureInfo culture)
    {
      return value.ToString().ToUpper(culture)[0];
    }

    /// <summary>
    /// Returns a copy of this System.Char object converted to uppercase, using the casing rules of the invariant culture.
    /// </summary>
    /// <param name="value">The value</param>
    /// <returns>A copy of this System.Char object converted to uppercase, using the casing rules of the invariant culture</returns>
    public static char ToUpperInvariant(this char value)
    {
      return value.ToString().ToUpperInvariant()[0];
    }

    /// <summary>
    /// Returns the word representation of this character if it is numeric.
    /// </summary>
    /// <param name="value">The value</param>
    /// <returns>The word representation of this character if it is numeric.</returns>
    public static string ToNumericWord(this char value)
    {
      switch (value)
      {
        case '0': return "zero";
        case '1': return "one";
        case '2': return "two";
        case '3': return "three";
        case '4': return "four";
        case '5': return "five";
        case '6': return "six";
        case '7': return "seven";
        case '8': return "eight";
        case '9': return "nine";
        default: return value.ToString();
      }
    }
  }
}
