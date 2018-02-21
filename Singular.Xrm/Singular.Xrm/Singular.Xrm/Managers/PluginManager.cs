namespace Singular.Xrm.Managers
{
  using System.Collections.Generic;
  using System.Xml;
  using Microsoft.Xrm.Sdk;
  using Microsoft.Xrm.Sdk.Query;

  /// <summary>
  /// The PluginManager class
  /// </summary>
  public sealed class PluginManager
  {
    /// <summary>
    /// Prevents a default instance of the <see cref="PluginManager"/> class from being created.
    /// </summary>
    private PluginManager()
    {
    }

    /// <summary>
    /// Gets the value of an entity attribute from the entity if it contains it, or from the pre-entity if it contains it, or null.
    /// </summary>
    /// <param name="entityPre">The entity (pre-image)</param>
    /// <param name="entity">The entity</param>
    /// <param name="attribute">The attribute</param>
    /// <returns>The value of an entity attribute from the entity if it contains it, or from the pre-entity if it contains it, or null</returns>
    public static object GetValue(Entity entityPre, Entity entity, string attribute)
    {
      if (entity != null && entity.Contains(attribute))
      {
        return entity[attribute];
      }
      else if (entityPre != null && entityPre.Contains(attribute))
      {
        return entityPre[attribute];
      }
      else
      {
        return null;
      }
    }

    /// <summary>
    /// Force dependent columns to be retrieved
    /// </summary>
    /// <param name="context">The plugin execution context</param>
    /// <param name="dependentColumns">The dependent columns</param>
    public static void PreRetrieveAddColumns(IPluginExecutionContext context, PluginManager.DependentColumn[] dependentColumns)
    {
      if (Helpers.Plugins.Retrieve.InputParameters.ContainsColumnSet(context))
      {
        PluginManager.AddColumns(Helpers.Plugins.Retrieve.InputParameters.GetColumnSet(context), dependentColumns);
      }
    }

    /// <summary>
    /// Force dependent columns to be retrieved
    /// </summary>
    /// <param name="context">The plugin execution context</param>
    /// <param name="entityLogicalName">The entity logical name</param>
    /// <param name="dependentColumns">The dependent columns</param>
    public static void PreRetrieveMultipleAddColumns(IPluginExecutionContext context, string entityLogicalName, PluginManager.DependentColumn[] dependentColumns)
    {
      if (Helpers.Plugins.RetrieveMultiple.InputParameters.ContainsQuery(context))
      {
        QueryBase queryBase = Helpers.Plugins.RetrieveMultiple.InputParameters.GetQuery(context);
        if (queryBase is QueryExpression)
        {
          PluginManager.AddColumns((QueryExpression)queryBase, dependentColumns);
        }
        else if (queryBase is FetchExpression)
        {
          PluginManager.AddColumns((FetchExpression)queryBase, entityLogicalName, dependentColumns);
        }
      }
    }

    /// <summary>
    /// Adds dependent columns to a retrieval
    /// </summary>
    /// <param name="queryExpression">The query expression</param>
    /// <param name="dependentColumns">The dependent columns</param>
    private static void AddColumns(QueryExpression queryExpression, PluginManager.DependentColumn[] dependentColumns)
    {
      PluginManager.AddColumns(queryExpression.ColumnSet, dependentColumns);
    }

    /// <summary>
    /// Adds dependent columns to a retrieval
    /// </summary>
    /// <param name="fetchExpression">The fetch expression</param>
    /// <param name="entityLogicalName">The entity logical name</param>
    /// <param name="dependentColumns">The dependent columns</param>
    private static void AddColumns(FetchExpression fetchExpression, string entityLogicalName, PluginManager.DependentColumn[] dependentColumns)
    {
      XmlDocument xmlDocument = new XmlDocument();
      xmlDocument.LoadXml(fetchExpression.Query);
      foreach (XmlNode entity in xmlDocument.SelectNodes(string.Format("//entity[@name='{0}']", entityLogicalName)))
      {
        if (entity.SelectSingleNode("all-attributes") == null)
        {
          HashSet<string> columns = new HashSet<string>();
          foreach (DependentColumn dependentColumn in dependentColumns)
          {
            if (entity.SelectSingleNode(string.Format("attribute[@name='{0}']", dependentColumn.Column)) != null)
            {
              foreach (string column in dependentColumn.DependentColumns)
              {
                columns.Add(column);
              }
            }
          }

          foreach (string column in columns)
          {
            if (entity.SelectSingleNode(string.Format("attribute[@name='{0}']", column)) == null)
            {
              XmlNode attributeNode = xmlDocument.CreateNode(XmlNodeType.Element, "attribute", entity.NamespaceURI);
              attributeNode.Attributes.Append(xmlDocument.CreateAttribute("name"));
              attributeNode.Attributes["name"].Value = column;
              entity.InsertAfter(attributeNode, entity.SelectSingleNode("attribute[last()]"));
            }
          }
        }
      }
      fetchExpression.Query = xmlDocument.OuterXml;
    }

    /// <summary>
    /// Adds dependent columns to a retrieval
    /// </summary>
    /// <param name="columnSet">The column set</param>
    /// <param name="dependentColumns">The dependent columns</param>
    private static void AddColumns(ColumnSet columnSet, PluginManager.DependentColumn[] dependentColumns)
    {
      if (!columnSet.AllColumns)
      {
        HashSet<string> columns = new HashSet<string>();
        foreach (DependentColumn dependentColumn in dependentColumns)
        {
          if (columnSet.Columns.Contains(dependentColumn.Column))
          {
            foreach (string column in dependentColumn.DependentColumns)
            {
              columns.Add(column);
            }
          }
        }

        foreach (string column in columns)
        {
          if (!columnSet.Columns.Contains(column))
          {
            columnSet.Columns.Add(column);
          }
        }
      }
    }

    /// <summary>
    /// The DependentColumn class
    /// </summary>
    public sealed class DependentColumn
    {
      /// <summary>
      /// Initializes a new instance of the <see cref="DependentColumn"/> class.
      /// </summary>
      /// <param name="column">The column</param>
      /// <param name="dependentColumns">The list of columns that the column depends on</param>
      public DependentColumn(string column, params string[] dependentColumns)
      {
        this.Column = column;
        this.DependentColumns = dependentColumns;
      }

      /// <summary>
      /// Gets or sets the column
      /// </summary>
      public string Column { get; set; }

      /// <summary>
      /// Gets or sets the list of columns that Column depends on
      /// </summary>
      public string[] DependentColumns { get; set; }
    }
  }
}
