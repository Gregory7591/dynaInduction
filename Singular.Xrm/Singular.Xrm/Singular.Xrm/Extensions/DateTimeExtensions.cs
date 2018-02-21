namespace System
{
  /// <summary>
  /// The DateTimeExtensions class.
  /// </summary>
  public static class DateTimeExtensions
  {
    /// <summary>
    /// Returns a new System.DateTime that adds the specified number of weekdays to this instance
    /// </summary>
    /// <param name="value">A System.DateTime reference</param>
    /// <param name="days">The number of weekdays to add to the date</param>
    /// <returns>A new System.DateTime that adds the specified number of weekdays to this instance</returns>
    public static DateTime AddWeekDays(this DateTime value, int days)
    {
      DateTime d = value;
      int i = 0;
      while (i < Math.Abs(days))
      {
        d = d.AddDays(days >= 0 ? 1 : -1);
        switch (d.DayOfWeek)
        {
          case DayOfWeek.Saturday:
          case DayOfWeek.Sunday:
            break;
          default:
            i++;
            break;
        }
      }
      return d;
    }

    /// <summary>
    /// Returns this instance with the time set to 00:00:00
    /// </summary>
    /// <param name="value">A System.DateTime reference</param>
    /// <returns>This instance with the time set to 00:00:00</returns>
    public static DateTime DayStart(this DateTime value)
    {
      return new DateTime(value.Year, value.Month, value.Day, 0, 0, 0);
    }

    /// <summary>
    /// Returns this instance with the time set to 23:59:59
    /// </summary>
    /// <param name="value">A System.DateTime reference</param>
    /// <returns>This instance with the time set to 23:59:59</returns>
    public static DateTime DayEnd(this DateTime value)
    {
      return new DateTime(value.Year, value.Month, value.Day, 23, 59, 59);
    }
  }
}
