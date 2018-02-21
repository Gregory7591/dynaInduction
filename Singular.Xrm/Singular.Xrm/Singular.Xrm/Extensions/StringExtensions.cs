namespace System
{
  /// <summary>
  /// The StringExtensions class
  /// </summary>
  public static class StringExtensions
  {
    /// <summary>
    /// Returns this instance replaced with the supplied replace value if this instance is empty
    /// </summary>
    /// <param name="value">A System.String reference</param>
    /// <param name="replace">The value to replace this instance with if this instance is empty</param>
    /// <returns>This instance replaced with the supplied replace value if this instance is empty</returns>
    public static string CvEmpty(this string value, string replace)
    {
      if (value == string.Empty)
      {
        return replace;
      }
      else
      {
        return value;
      }
    }

    /// <summary>
    /// Retrieves a substring of a specified length from the left hand side of this instance.
    /// </summary>
    /// <param name="value">A System.String reference</param>
    /// <param name="length">The number of characters to return</param>
    /// <exception cref="NullReferenceException">A NullReferenceException</exception>
    /// <returns>A substring of a specified length from the left hand side of this instance</returns>
    public static string Left(this string value, int length)
    {
      if (value == null)
      {
        throw new NullReferenceException();
      }
      if (value.Length > length)
      {
        return value.Substring(0, length);
      }
      else
      {
        return value;
      }
    }

    /// <summary>
    /// Retrieves a substring of a specified length from the right hand side of this instance.
    /// </summary>
    /// <param name="value">A System.String reference</param>
    /// <param name="length">The number of characters to return</param>
    /// <exception cref="NullReferenceException">A NullReferenceException</exception>
    /// <returns>A substring of a specified length from the left right side of this instance</returns>
    public static string Right(this string value, int length)
    {
      if (value == null)
      {
        throw new NullReferenceException();
      }
      if (value.Length > length)
      {
        return value.Substring(value.Length - length);
      }
      else
      {
        return value;
      }
    }

    /// <summary>
    /// Returns a copy of this System.String object converted to camel case.
    /// </summary>
    /// <param name="value">A System.String reference</param>
    /// <exception cref="NullReferenceException">A NullReferenceException</exception>
    /// <returns>A copy of this System.String object converted to camel case</returns>
    public static string ToCamel(this string value)
    {
      if (value == null)
      {
        throw new NullReferenceException();
      }

      string result = string.Empty;
      bool capitalise = true;
      foreach (char c in value.ToLower())
      {
        if (char.IsWhiteSpace(c))
        {
          result += c;
          capitalise = true;
        }
        else if (char.IsLetter(c))
        {
          result += capitalise ? c.ToUpper() : c;
          capitalise = false;
        }
        else if (char.IsDigit(c))
        {
          result += c;
        }
        else
        {
          result += c;
        }
      }
      return result;
    }

    /// <summary>
    /// Returns a copy of this System.String object converted to camel case, using the casing rules of the specified culture.
    /// </summary>
    /// <param name="value">A System.String reference</param>
    /// <param name="culture">An object that supplies culture-specific casing rules</param>
    /// <exception cref="NullReferenceException">A NullReferenceException</exception>
    /// <returns>A copy of this System.String object converted to camel case, using the casing rules of the specified culture</returns>
    public static string ToCamel(this string value, System.Globalization.CultureInfo culture)
    {
      if (value == null)
      {
        throw new NullReferenceException();
      }

      string result = string.Empty;
      bool capitalise = true;
      foreach (char c in value.ToLower(culture))
      {
        if (char.IsWhiteSpace(c))
        {
          result += c;
          capitalise = true;
        }
        else if (char.IsLetter(c))
        {
          result += capitalise ? c.ToUpper(culture) : c;
          capitalise = false;
        }
        else if (char.IsDigit(c))
        {
          result += c;
        }
        else
        {
          result += c;
        }
      }
      return result;
    }

    /// <summary>
    /// Returns a copy of this System.String object converted to camel case, using the casing rules of the invariant culture.
    /// </summary>
    /// <param name="value">A System.String reference</param>
    /// <exception cref="NullReferenceException">A NullReferenceException</exception>
    /// <returns>A copy of this System.String object converted to camel case, using the casing rules of the invariant culture</returns>
    public static string ToCamelInvariant(this string value)
    {
      if (value == null)
      {
        throw new NullReferenceException();
      }

      string result = string.Empty;
      bool capitalise = true;
      foreach (char c in value.ToLowerInvariant())
      {
        if (char.IsWhiteSpace(c))
        {
          result += c;
          capitalise = true;
        }
        else if (char.IsLetter(c))
        {
          result += capitalise ? c.ToUpperInvariant() : c;
          capitalise = false;
        }
        else if (char.IsDigit(c))
        {
          result += c;
        }
        else
        {
          result += c;
        }
      }
      return result;
    }

    /// <summary>
    /// Removes all trailing occcurences of a string from the current System.String object.
    /// </summary>
    /// <param name="value">A System.String reference</param>
    /// <param name="trimString">A System.String object to remove, or null.</param>
    /// <returns>The System.String object with all trailing occcurences of a string removed.</returns>
    public static string TrimEnd(this string value, string trimString)
    {
      if (value == null)
      {
        throw new NullReferenceException();
      }

      trimString = (trimString ?? string.Empty);
      string result = value;
      while (result.EndsWith(trimString))
      {
        result = result.Left(result.Length - trimString.Length);
      }
      return result;
    }

    /// <summary>
    /// Removes all leading occcurences of a string from the current System.String object.
    /// </summary>
    /// <param name="value">A System.String reference</param>
    /// <param name="trimString">A System.String object to remove, or null.</param>
    /// <returns>The System.String object with all leading occcurences of a string removed.</returns>
    public static string TrimStart(this string value, string trimString)
    {
      if (value == null)
      {
        throw new NullReferenceException();
      }

      string result = value;
      trimString = (trimString ?? string.Empty);
      while (result.StartsWith(trimString))
      {
        result = result.Right(result.Length - trimString.Length);
      }
      return result;
    }
  }
}
