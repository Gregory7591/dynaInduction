using System;
using CrmCalculations;
using CrmEarlyBound;
using Microsoft.Xrm.Sdk;

namespace DynaInduction.Plugins
{

  public class ContactPreOperationUpdate : PluginBase
  {
    public ContactPreOperationUpdate(string unsecure, string secure)
        : base(typeof(ContactPreOperationUpdate)) { }

    protected override void ExecuteCrmPlugin(LocalPluginContext localContext)
    {
      if (localContext == null)
      {
        throw new InvalidPluginExecutionException("localContext");
      }

      IPluginExecutionContext context = localContext.PluginExecutionContext;

      if (context.InputParameters.Contains("Target") && context.InputParameters["Target"] is Entity)
      {
        Entity entity = (Entity)context.PreEntityImages["Target"];
        Contact contact = entity.ToEntity<Contact>();
        Entity preEntity = (Entity)context.PreEntityImages["contactPreImage"];
        Contact preContact = preEntity.ToEntity<Contact>();

        try
        {
          Calculations calc = new Calculations();
          contact.di_age = calc.CalculateAge(contact, preContact);
          contact.di_EsitimatedReturnFinal = calc.CalculateEstReturn(contact, preContact);
          contact.di_maturity_date = calc.CalculateMaturityDate(contact, preContact);
        }
        catch (Exception ex)
        {
          throw new InvalidPluginExecutionException("An error occured in the plugin:", ex);
        }
      }

    }
  }
}


