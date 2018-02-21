namespace System
{
  using System.Collections.Generic;
  using System.Globalization;
  using System.Linq;

  /// <summary>
  /// The DecimalExtensions class
  /// </summary>
  public static class DecimalExtensions
  {
    /// <summary>
    /// Return the word representation of this instance
    /// </summary>
    /// <param name="number">A System.Decimal instance</param>
    /// <returns>The word representation of this instance</returns>
    public static string ToWords(this decimal number)
    {
      return number.ToWords("point");
    }

    /// <summary>
    /// Return the word representation of this instance
    /// </summary>
    /// <param name="number">A System.Decimal instance</param>
    /// <param name="decimalSeperator">The word to use as the decimal seperator. Defaults to point.</param>
    /// <returns>The word representation of this instance</returns>
    public static string ToWords(this decimal number, string decimalSeperator)
    {
      List<string> words = new List<string>();

      words.Add(((decimal)number).ToWords());
      if (number % 1 != 0)
      {
        words.Add(decimalSeperator);
        foreach (char character in number.ToString(CultureInfo.InvariantCulture).Split(new char[] { '.' }, StringSplitOptions.RemoveEmptyEntries)[1])
        {
          words.Add(character.ToNumericWord());
        }
      }

      return string.Join(" ", words);
    }
  }
}
