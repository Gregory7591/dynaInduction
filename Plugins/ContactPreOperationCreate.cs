using System;
using CrmCalculations;
using CrmEarlyBound;
using Microsoft.Xrm.Sdk;

namespace DynaInduction.Plugins
{

  public class ContactPreOperationCreate : PluginBase
  {
    public ContactPreOperationCreate(string unsecure, string secure)
        : base(typeof(ContactPreOperationCreate)) { }



    protected override void ExecuteCrmPlugin(LocalPluginContext localContext)
    {
      if (localContext == null)
      {
        throw new InvalidPluginExecutionException("localContext");
      }

      IPluginExecutionContext context = localContext.PluginExecutionContext;
      ITracingService trace = localContext.TracingService;

      if (context.InputParameters.Contains("Target") && context.InputParameters["Target"] is Entity)
      {
        Entity entity = (Entity)context.InputParameters["Target"];
        Contact contact = entity.ToEntity<Contact>();
        try
        {
          Calculations calc = new Calculations();
          contact.di_age = calc.CalculateAge(contact, null);
          contact.di_EsitimatedReturnFinal = calc.CalculateEstReturn(contact, null);
          contact.di_maturity_date = calc.CalculateMaturityDate(contact, null);
        }
        catch (Exception ex)
        {
          throw new InvalidPluginExecutionException("An error occured in the plugin:Pre Create", ex);
        }

      }
    }
  }
}
