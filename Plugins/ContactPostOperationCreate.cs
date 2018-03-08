namespace DynaInduction.Plugins
{
  using System;
  using System.ServiceModel;
  using CrmEarlyBound;
  using Microsoft.Xrm.Sdk;

  /// <summary>
  /// ContactPostOperationCreate Plugin.
  /// </summary>
  public class ContactPostOperationCreate : PluginBase
  {
    /// <summary>
    /// Initializes a new instance of the <see cref="ContactPostOperationCreate"/> class.
    /// </summary>
    /// <param name="unsecure">Contains public (unsecured) configuration information.</param>
    /// <param name="secure">Contains non-public (secured) configuration information. </param>
    public ContactPostOperationCreate(string unsecure, string secure)
        : base(typeof(ContactPostOperationCreate)) {
    }

    /// <summary>
    /// Main entry point for he business logic that the plug-in is to execute.
    /// </summary>
    /// <param name="localContext">The LocalPluginContext which contains the
    /// <see cref="IPluginExecutionContext"/>,
    /// <see cref="IOrganizationService"/>
    /// and <see cref="ITracingService"/></param>
    protected override void ExecuteCrmPlugin(LocalPluginContext localContext)
    {
      if (localContext == null)
      {
        throw new InvalidPluginExecutionException("localContext");
      }

      IOrganizationService service = localContext.OrganizationService;
      IPluginExecutionContext context = localContext.PluginExecutionContext;

      if (context.InputParameters.Contains("Target") && context.InputParameters["Target"] is Entity)
      {
        Entity entity = (Entity)context.InputParameters["Target"];
        if (entity.LogicalName != "contact" && context.MessageName != "Create")
        {
          return;
        }
        else
        {
          try
          {
            Task contactTask = new Task();
            contactTask.Subject = "First follow up meeting";
            contactTask.Description = "This is a reminder for new users to set up a follow up meeting";

            if (context.OutputParameters.Contains("id"))
            {
              Guid regardingobjectid = new Guid(context.OutputParameters["id"].ToString());
              string regardingobjectidType = "contact";
              contactTask.RegardingObjectId = new EntityReference(regardingobjectidType, regardingobjectid);
              service.Create(contactTask);
            }
          }
          catch (FaultException ex)
          {
            throw new InvalidPluginExecutionException("An error occurred in the plug-in: Post Create", ex);
          }
        }
      }
    }
  }
}