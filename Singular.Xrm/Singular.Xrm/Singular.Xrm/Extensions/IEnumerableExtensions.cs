namespace System.Collections.Generic
{
  using System.Linq;

  /// <summary>
  /// The IEnumerableExtensions class
  /// </summary>
  public static class IEnumerableExtensions
  {
    /// <summary>
    /// Creates a System.Collections.Generic.HashSet&lt;T&gt; from an System.Collections.Generic.IEnumerable&lt;T&gt;
    /// </summary>
    /// <typeparam name="TSource">The type of elements in the collection</typeparam>
    /// <param name="source">A System.Collections.Generic.IEnumerable&lt;T&gt; instance</param>
    /// <exception cref="System.ArgumentNullException">source is null</exception>
    /// <returns>A System.Collections.Generic.HashSet&lt;T&gt; that contains elements from the input sequence</returns>
    public static HashSet<TSource> ToHashSet<TSource>(this IEnumerable<TSource> source)
    {
      if (source == null)
      {
        throw new ArgumentNullException("source");
      }

      return new HashSet<TSource>(source);
    }

    /// <summary>
    /// Creates a System.Collections.Generic.HashSet&lt;T&gt; from an System.Collections.Generic.IEnumerable&lt;T&gt;
    /// </summary>
    /// <typeparam name="TSource">The type of elements in the collection</typeparam>
    /// <param name="source">A System.Collections.Generic.IEnumerable&lt;T&gt; instance</param>
    /// <param name="comparer">An System.Collections.Generic.IEqualityComparer&lt;T&gt; to compare keys</param>
    /// <exception cref="System.ArgumentNullException">source is null</exception>
    /// <returns>A System.Collections.Generic.HashSet&lt;T&gt; that contains elements from the input sequence</returns>
    public static HashSet<TSource> ToHashSet<TSource>(this IEnumerable<TSource> source, IEqualityComparer<TSource> comparer)
    {
      if (source == null)
      {
        throw new ArgumentNullException("source");
      }

      return new HashSet<TSource>(source, comparer);
    }

    /// <summary>
    /// Creates a System.Collections.Generic.HashSet&lt;TResult&gt; from an System.Collections.Generic.IEnumerable&lt;T&gt; according to a specific item selector function
    /// </summary>
    /// <typeparam name="TSource">The source type of elements in the collection</typeparam>
    /// <typeparam name="TResult">The destination type of elements in the collection</typeparam>
    /// <param name="source">A System.Collections.Generic.IEnumerable&lt;T&gt; instance</param>
    /// <param name="newItemSelector">A System.Func&lt;in T, out TResult&gt; item selector function</param>
    /// <exception cref="System.ArgumentNullException">source is null</exception>
    /// <returns>A System.Collections.Generic.HashSet&lt;TResult&gt; from an System.Collections.Generic.IEnumerable&lt;T&gt; according to a specific item selector function</returns>
    public static HashSet<TResult> ToHashSet<TSource, TResult>(this IEnumerable<TSource> source, Func<TSource, TResult> newItemSelector)
    {
      return source.Select(newItemSelector).ToHashSet();
    }
  }
}
