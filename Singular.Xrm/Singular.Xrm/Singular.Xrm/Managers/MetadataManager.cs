namespace Singular.Xrm.Managers
{
  using System.Collections.Generic;
  using Microsoft.Xrm.Sdk;
  using Microsoft.Xrm.Sdk.Messages;
  using Microsoft.Xrm.Sdk.Metadata;

  /// <summary>
  /// The MetadataManager class
  /// </summary>
  public sealed class MetadataManager
  {
    /// <summary>
    /// lock object to lock setting
    /// </summary>
    private static readonly object LockMetadata = new object();

    /// <summary>
    /// Cached setting record
    /// </summary>
    private static Dictionary<string, EntityMetadata> metadata = new Dictionary<string, EntityMetadata>();

    /// <summary>
    /// Prevents a default instance of the <see cref="MetadataManager"/> class from being created.
    /// </summary>
    private MetadataManager()
    {
    }

    /// <summary>
    /// Get the metadata for the supplied entity
    /// </summary>
    /// <param name="service">The organisation service</param>
    /// <param name="logicalName">The logical name of the entity</param>
    /// <returns>The metadata for the supplied entity</returns>
    public static EntityMetadata GetEntityMetadata(IOrganizationService service, string logicalName)
    {
      lock (MetadataManager.LockMetadata)
      {
        if (!MetadataManager.metadata.ContainsKey(logicalName))
        {
          EntityMetadata entityMetadata = ((RetrieveEntityResponse)service.Execute(
            new RetrieveEntityRequest
            {
              LogicalName = logicalName,
              EntityFilters = EntityFilters.All
            })).EntityMetadata;

          MetadataManager.metadata.Add(logicalName, entityMetadata);
        }

        return MetadataManager.metadata[logicalName];
      }
    }
  }
}
