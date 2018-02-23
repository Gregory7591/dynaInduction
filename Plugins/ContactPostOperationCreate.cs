using System;
using System.ServiceModel;
using CrmEarlyBound;
using Microsoft.Xrm.Sdk;

namespace DynaInduction.Plugins
{
  public class ContactPostOperationCreate : PluginBase
  {
    public ContactPostOperationCreate(string unsecure, string secure)
        : base(typeof(ContactPostOperationCreate)) { }

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


