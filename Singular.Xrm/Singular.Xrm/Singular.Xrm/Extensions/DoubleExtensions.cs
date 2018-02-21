namespace System
{
  using System.Collections.Generic;
  using System.Globalization;
  using System.Linq;

  /// <summary>
  /// The DoubleExtensions class
  /// </summary>
  public static class DoubleExtensions
  {
    /// <summary>
    /// Return the word representation of this instance
    /// </summary>
    /// <param name="number">A System.Double instance</param>
    /// <returns>The word representation of this instance</returns>
    public static string ToWords(this double number)
    {
      return number.ToWords("point");
    }

    /// <summary>
    /// Return the word representation of this instance
    /// </summary>
    /// <param name="number">A System.Double instance</param>
    /// <param name="decimalSeperator">The word to use as the decimal seperator. Defaults to point.</param>
    /// <returns>The word representation of this instance</returns>
    public static string ToWords(this double number, string decimalSeperator)
    {
      List<string> words = new List<string>();

      words.Add(((long)number).ToWords());
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
