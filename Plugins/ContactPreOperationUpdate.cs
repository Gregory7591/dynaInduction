// <copyright file="ContactPreOperationUpdate.cs" company="">
// Copyright (c) 2018 All Rights Reserved
// </copyright>
// <author></author>
// <date>2/21/2018 3:24:31 PM</date>
// <summary>Implements the ContactPreOperationUpdate Plugin.</summary>
// <auto-generated>
//     This code was generated by a tool.
//     Runtime Version:4.0.30319.1
// </auto-generated>

using System;
using CrmCalculations;
using CrmEarlyBound;
using Microsoft.Xrm.Sdk;

namespace Plugins
{

  /// <summary>
  /// ContactPreOperationUpdate Plugin.
  /// </summary>    
  public class ContactPreOperationUpdate : PluginBase
  {
    /// <summary>
    /// Initializes a new instance of the <see cref="ContactPreOperationUpdate"/> class.
    /// </summary>
    /// <param name="unsecure">Contains public (unsecured) configuration information.</param>
    /// <param name="secure">Contains non-public (secured) configuration information. 
    /// When using Microsoft Dynamics 365 for Outlook with Offline Access, 
    /// the secure string is not passed to a plug-in that executes while the client is offline.</param>
    public ContactPreOperationUpdate(string unsecure, string secure)
        : base(typeof(ContactPreOperationUpdate))
    {

      // TODO: Implement your custom configuration handling.
    }


    /// <summary>
    /// Main entry point for he business logic that the plug-in is to execute.
    /// </summary>
    /// <param name="localContext">The <see cref="LocalPluginContext"/> which contains the
    /// <see cref="IPluginExecutionContext"/>,
    /// <see cref="IOrganizationService"/>
    /// and <see cref="ITracingService"/>
    /// </param>
    /// <remarks>
    /// For improved performance, Microsoft Dynamics 365 caches plug-in instances.
    /// The plug-in's Execute method should be written to be stateless as the constructor
    /// is not called for every invocation of the plug-in. Also, multiple system threads
    /// could execute the plug-in at the same time. All per invocation state information
    /// is stored in the context. This means that you should not use global variables in plug-ins.
    /// </remarks>
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
