namespace System
{
  using System.Collections.Generic;
  using System.Globalization;
  using System.Linq;

  /// <summary>
  /// The IntExtensions class
  /// </summary>
  public static class IntExtensions
  {
    /// <summary>
    /// Dictionary of numbers and their equivalent in english
    /// </summary>
    private static Dictionary<long, string> numberWords = new Dictionary<long, string>()
    {
      { 0, "zero" }, { 1, "one" }, { 2, "two" }, { 3, "three" }, { 4, "four" }, { 5, "five" }, { 6, "six" }, { 7, "seven" }, { 8, "eight" }, { 9, "nine" },
      { 10, "ten" }, { 11, "eleven" }, { 12, "twelve" }, { 13, "thirteen" }, { 14, "fourteen" }, { 15, "fifteen" }, { 16, "sixteen" }, { 17, "seventeen" }, { 18, "eighteen" }, { 19, "nineteen" },
      { 20, "twenty" }, { 30, "thirty" }, { 40, "forty" }, { 50, "fifty" }, { 60, "sixty" }, { 70, "seventy" }, { 80, "eighty" }, { 90, "ninety" },
      { (long)Math.Pow(10, 2), "hundred" }, { (long)Math.Pow(10, 3), "thousand" }, { (long)Math.Pow(10, 6), "million" }, { (long)Math.Pow(10, 9), "billion" }, { (long)Math.Pow(10, 12), "trillion" }, { (long)Math.Pow(10, 15), "quadrillion" }, { (long)Math.Pow(10, 18), "quintillion" },
      // { (Int64)Math.Pow(10, 21), "sextillion" }, { (Int64)Math.Pow(10, 24), "septillion" }, { (Int64)Math.Pow(10, 27), "octillion" }, { (Int64)Math.Pow(10, 30), "nonillion" }, { (Int64)Math.Pow(10, 33), "decillion" }, { (Int64)Math.Pow(10, 36), "undecillion" }, { (Int64)Math.Pow(10, 39), "duodecillion" }
    };

    /// <summary>
    /// Return the ordinal representation of this instance
    /// </summary>
    /// <param name="number">A System.Int16 instance</param>
    /// <returns>The ordinal representation of this instance</returns>
    public static string ToOrdinal(this short number)
    {
      return ((long)number).ToOrdinal();
    }

    /// <summary>
    /// Return the ordinal representation of this instance
    /// </summary>
    /// <param name="number">A System.Int32 instance</param>
    /// <returns>The ordinal representation of this instance</returns>
    public static string ToOrdinal(this int number)
    {
      return ((long)number).ToOrdinal();
    }

    /// <summary>
    /// Return the ordinal representation of this instance
    /// </summary>
    /// <param name="number">A System.Int64 instance</param>
    /// <returns>The ordinal representation of this instance</returns>
    public static string ToOrdinal(this long number)
    {
      string value = number.ToString();
      switch (value.Right(1))
      {
        case "1": return value.ToString() + (value.Length > 1 && value.Right(2).Left(1) == "1" ? "th" : "st");
        case "2": return value.ToString() + (value.Length > 1 && value.Right(2).Left(1) == "1" ? "th" : "nd");
        case "3": return value.ToString() + (value.Length > 1 && value.Right(2).Left(1) == "1" ? "th" : "rd");
        default: return value.ToString() + "th";
      }
    }

    /// <summary>
    /// Return the word representation of this instance
    /// </summary>
    /// <param name="number">A System.Int16 instance</param>
    /// <returns>The word representation of this instance</returns>
    public static string ToWords(this short number)
    {
      return ((long)number).ToWords();
    }

    /// <summary>
    /// Return the word representation of this instance
    /// </summary>
    /// <param name="number">A System.Int32 instance</param>
    /// <returns>The word representation of this instance</returns>
    public static string ToWords(this int number)
    {
      return ((long)number).ToWords();
    }

    /// <summary>
    /// Return the word representation of this instance
    /// </summary>
    /// <param name="number">A System.Int64 instance</param>
    /// <returns>The word representation of this instance</returns>
    public static string ToWords(this long number)
    {
      if (number < 0)
      {
        return "minus " + Math.Abs(number).ToWords();
      }
      else if (number == 0)
      {
        return IntExtensions.numberWords[number];
      }
      else
      {
        string words = string.Empty;

        foreach (KeyValuePair<long, string> orderOfMagnitude in IntExtensions.numberWords.Where(n => n.Key >= 100).OrderByDescending(f => f.Key))
        {
          if (number / orderOfMagnitude.Key > 0)
          {
            words += string.Format(CultureInfo.InvariantCulture, "{0} {1} ", (number / orderOfMagnitude.Key).ToWords(), orderOfMagnitude.Value);
            number %= orderOfMagnitude.Key;
          }
        }

        if (number > 0)
        {
          words += string.IsNullOrEmpty(words) ? string.Empty : "and ";
          if (number < 20)
          {
            words += IntExtensions.numberWords[number];
          }
          else
          {
            words += IntExtensions.numberWords[(number / 10) * 10];
            if ((number % 10) > 0)
            {
              words += " " + IntExtensions.numberWords[number % 10];
            }
          }
        }

        return words;
      }
    }
  }
}
