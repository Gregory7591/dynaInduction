namespace DynaInduction.Plugins
{
  using System;
  using CrmCalculations;
  using CrmEarlyBound;
  using Microsoft.Xrm.Sdk;

  /// <summary>
  /// ContactPreOperationUpdate Plugin
  /// /// </summary>
  public class ContactPreOperationUpdate : PluginBase
  {
    /// <summary>
    /// Initializes a new instance of the <see cref="ContactPreOperationUpdate"/> class.
    /// </summary>
    /// <param name="unsecure">Contains public (unsecured) configuration information</param>
    /// <param name="secure">Contains non-public (secured) configuration information.</param>
    public ContactPreOperationUpdate(string unsecure, string secure)
        : base(typeof(ContactPreOperationUpdate))
    {
    }

    /// <summary>
    /// Main entry point for he business logic that the plug-in is to execute.
    /// </summary>
    /// <param name="localContext">The LocalPluginContext which contains the
    /// <see cref="IPluginExecutionContext"/>,
    /// <see cref="IOrganizationService"/>
    /// and <see cref="ITracingService"/>
    /// </param>
    protected override void ExecuteCrmPlugin(LocalPluginContext localContext)
    {
      if (localContext == null)
      {
        throw new InvalidPluginExecutionException("localContext");
      }

      IPluginExecutionContext context = localContext.PluginExecutionContext;

      if (context.InputParameters.Contains("Target") && context.InputParameters["Target"] is Entity)
      {
        Entity entity = (Entity)context.InputParameters["Target"];
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
          throw new InvalidPluginExecutionException("An error occured in the plugin:Pre Update", ex);
        }
      }
    }
  }
}