namespace DynaInduction.Plugins
{
  using System;
  using System.IO;
  using System.Xml.Serialization;
  using CrmEarlyBound;
  using Microsoft.Crm.Sdk.Messages;
  using Microsoft.Xrm.Sdk;
  using Microsoft.Xrm.Sdk.Client;
  using Microsoft.Xrm.Sdk.Query;

  /// <summary>
  /// ContactPostOperationUpdate Plugin.
  /// </summary>    
  public class ContactPostOperationUpdate : PluginBase
  {
    private Guid emailId;
    private Guid contactId;
    private Guid userId;
    private Guid templateId;
    private OrganizationServiceProxy serviceProxy;

    /// <summary>
    /// Initializes a new instance of the <see cref="ContactPostOperationUpdate"/> class.
    /// </summary>
    /// <param name="unsecure">Contains public (unsecured) configuration information.</param>
    /// <param name="secure">Contains non-public (secured) configuration information. 
    /// When using Microsoft Dynamics 365 for Outlook with Offline Access, 
    /// the secure string is not passed to a plug-in that executes while the client is offline.</param>
    public ContactPostOperationUpdate(string unsecure, string secure)
        : base(typeof(ContactPostOperationUpdate))
    {
    }
    
    /// <summary>
    /// Main entry point for he business logic that the plug-in is to execute.
    /// </summary>
    /// <param name="localContext">The <see cref="LocalPluginContext"/> which contains the
    /// <see cref="IPluginExecutionContext"/>,
    /// <see cref="IOrganizationService"/>
    /// and <see cref="ITracingService"/>
    /// </param>      
    protected override void ExecuteCrmPlugin(LocalPluginContext localContext)
    {
      IPluginExecutionContext context = localContext.PluginExecutionContext;
      IOrganizationService service = localContext.OrganizationService;
      ITracingService tracing = localContext.TracingService;
      Entity entity = (Entity)context.InputParameters["Target"];
      Contact contact = entity.ToEntity<Contact>();
      Entity postEntity = (Entity)context.PostEntityImages["contactPostImage"];
      Contact postContact = postEntity.ToEntity<Contact>();

      string bodyXml =
                     "<?xml version=\"1.0\" ?>"
                     + "<xsl:stylesheet xmlns:xsl=\"http://www.w3.org/1999/XSL/Transform\" version=\"1.0\">"
                     + "<xsl:output method=\"text\" indent=\"no\"/><xsl:template match=\"/data\">"
                     + "<![CDATA["
                     + "This message is to notify you that a new account has been created."
                     + "]]></xsl:template></xsl:stylesheet>";

      string subjectXml =
         "<?xml version=\"1.0\" ?>"
         + "<xsl:stylesheet xmlns:xsl=\"http://www.w3.org/1999/XSL/Transform\" version=\"1.0\">"
         + "<xsl:output method=\"text\" indent=\"no\"/><xsl:template match=\"/data\">"
         + "<![CDATA[New account notification]]></xsl:template></xsl:stylesheet>";

      string presentationXml =
         "<template><text><![CDATA["
         + "This message is to notify you that a new account has been created."
         + "]]></text></template>";

      string subjectPresentationXml =
         "<template><text><![CDATA[New account notification]]></text></template>";

      tracing.Trace("2");

      Template template = new Template
      {
        Title = "Sample E-mail Template for Account",
        Body = bodyXml,
        Subject = subjectXml,
        PresentationXml = presentationXml,
        SubjectPresentationXml = subjectPresentationXml,
        TemplateTypeCode = Contact.EntityLogicalName,
        LanguageCode = 1033, // For US English.
        IsPersonal = false
      };
      
      tracing.Trace("3");

      this.templateId = service.Create(template);
      Console.WriteLine("Created {0}.", template.Title);
      tracing.Trace("4");

      InstantiateTemplateRequest instTemplateReq = new InstantiateTemplateRequest
      {
        TemplateId = template.Id,
        ObjectId = contact.Id,
        ObjectType = Contact.EntityLogicalName
      };
      tracing.Trace("5");
      InstantiateTemplateResponse instTemplateResp = (InstantiateTemplateResponse)service.Execute(instTemplateReq);
      WhoAmIRequest systemUserRequest = new WhoAmIRequest();
      tracing.Trace("6");
      WhoAmIResponse systemUserResponse = (WhoAmIResponse)service.Execute(systemUserRequest);
      tracing.Trace("7");
      this.userId = systemUserResponse.UserId;
      tracing.Trace("8");

      ActivityParty fromParty = new ActivityParty
      {
        PartyId = new EntityReference(context.PrimaryEntityName, context.UserId)
      };
      tracing.Trace("9");

      // Create the 'To:' activity party for the email
      ActivityParty toParty = new ActivityParty
      {
        PartyId = new EntityReference(Contact.EntityLogicalName, this.contactId)
      };
      tracing.Trace("10");
      Email email = new Email
      {
        To = new ActivityParty[] { toParty },
        From = new ActivityParty[] { fromParty },
        Subject = "SDK Sample e-mail",
        Description = "SDK Sample for SendEmail Message.",
        DirectionCode = true
      };
      tracing.Trace("11");
      tracing.Trace("12");
      
      tracing.Trace("13");
      
      tracing.Trace("14");

      SendEmailFromTemplateRequest emailUsingTemplateReq = new SendEmailFromTemplateRequest
      {
        Target = email,

        // Use a built-in Email Template of type "contact".
        TemplateId = template.Id,

        // The regarding Id is required, and must be of the same type as the Email Template.
        RegardingId = contact.Id,
        RegardingType = Contact.EntityLogicalName
      };
      tracing.Trace("16");
      SendEmailFromTemplateResponse emailUsingTemplateResp = (SendEmailFromTemplateResponse)service.Execute(emailUsingTemplateReq);
      tracing.Trace("17");
      this.emailId = emailUsingTemplateResp.Id;

      tracing.Trace("18");
    }
  }
}