namespace DynaInduction.Plugins
{
  using System;
  using System.Collections.Generic;
  using System.Linq;
  using System.Xml.Linq;
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
    private Guid emailId = new Guid("5ad5b095-aee7-e011-9765-115056be0007");
    private Guid templateId = new Guid("5ad5b095-aee7-e011-9765-005056be0007");
   
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
      Entity preEntity = (Entity)context.PreEntityImages["contactPreImage"];
      Contact precontact = preEntity.ToEntity<Contact>();
      Entity postEntity = (Entity)context.PostEntityImages["contactPostImage"];
      Contact postContact = postEntity.ToEntity<Contact>();

      if (precontact.di_IntialInvesmentFinal != postContact.di_IntialInvesmentFinal || precontact.di_interest_rate != postContact.di_interest_rate || precontact.di_InvestmentPeriod != postContact.di_InvestmentPeriod)
      {
        Entity entity = GetGlobalTemplate("Changes", service);
        Email email = new Email();        
        ActivityParty activityParty = new ActivityParty();
        email.LogicalName = "email";
        email.Subject = GetDataFromXml("match", entity.Attributes["subject"].ToString());
        email.Subject = email.Subject.ToString().Replace("[subject]", "Changes Noticed on your account");
        email.Description = GetDataFromXml("match", entity.Attributes["body"].ToString());
        string urlToReplace =
          "<html><body><table border=1>" +
          "<tr><th>Field</th><th>Before</th><th>After</th>" +
          "</tr><tr><td>Initial Investment</td><td>" + Math.Round(precontact.di_IntialInvesmentFinal.GetValueOrDefault(0), 2) + "</td><td>" + Math.Round(postContact.di_IntialInvesmentFinal.GetValueOrDefault(0), 2) +
          "</td></tr><tr><td>Interest Rate</td><td>" + Math.Round(precontact.di_interest_rate.GetValueOrDefault(0), 2) + "</td><td>" + Math.Round(postContact.di_interest_rate.GetValueOrDefault(0), 2) +
          "</td></tr><tr><td>Investment Period</td><td>" + precontact.di_InvestmentPeriod + "</td><td>" + postContact.di_InvestmentPeriod + "</td></tr>" +
          "</table></body></html>";
        email.Description = email.Description.ToString().Replace("[fullname]", postContact.FullName);
        email.Description = email.Description.ToString().Replace("[table]", urlToReplace);
        email.From = CreateActivityPartyList(postContact.OwnerId);
        email.To = CreateActivityPartyList(new EntityReference(Contact.EntityLogicalName, postContact.ContactId.Value));
        email.RegardingObjectId = (new EntityReference(Contact.EntityLogicalName, postContact.ContactId.Value));
        Guid emailCreated = service.Create(email);
        SendEmailRequest req = new SendEmailRequest();
        req.EmailId = emailCreated;
        req.TrackingToken = string.Empty;
        req.IssueSend = true;
        SendEmailResponse res = (SendEmailResponse)service.Execute(req);
      }
    }

    /// <summary>
    /// 54646
    /// </summary>
    /// <param name="title">213123</param>
    /// <param name="orgService">2132131</param>
    /// <returns>2131232</returns>
    public static Entity GetGlobalTemplate(string title, IOrganizationService orgService)
    {
      Entity emailTemplate = null;
      try
      {
        QueryExpression query = new QueryExpression();
        query.EntityName = "template";
        query.ColumnSet.AllColumns = true;
        query.Criteria = new FilterExpression();
        query.Criteria.FilterOperator = LogicalOperator.And;
        ConditionExpression condition1 = new ConditionExpression();
        condition1.AttributeName = "title";
        condition1.Operator = ConditionOperator.Equal;
        condition1.Values.Add(title);
        query.Criteria.Conditions.Add(condition1);
        EntityCollection entityColl = orgService.RetrieveMultiple(query);

        if (entityColl.Entities.Count > 0)
        {
          emailTemplate = entityColl.Entities[0];
        }
      }
      catch
      {
        throw;
      }
      return emailTemplate;
    }

    /// <summary>
    /// 678687
    /// </summary>
    /// <param name="attributeName">213213</param>
    /// <param name="value">213213</param>
    /// <returns>21321</returns>
    private static string GetDataFromXml(string attributeName, string value)
    {
      if (string.IsNullOrEmpty(value))
      {
        return string.Empty;
      }

      XDocument document = XDocument.Parse(value);
      XElement element = document.Descendants().Where(ele => ele.Attributes().Any(attr => attr.Name == attributeName)).FirstOrDefault();
      return element == null ? string.Empty : element.Value;
    }

    /// <summary>
    /// Create an activity party list
    /// </summary>
    /// <param name="parties">The Parties</param>
    /// <returns>An activity party list</returns>
    public static ActivityParty[] CreateActivityPartyList(params EntityReference[] parties)
    {
      List<ActivityParty> activityParties = new List<ActivityParty>();
      foreach (EntityReference party in parties)
      {
        if (party != null)
        {
          activityParties.Add(new ActivityParty { PartyId = party });
        }
      }
      return activityParties.ToArray();
    }
  }
}
