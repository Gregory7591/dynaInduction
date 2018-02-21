namespace OneXrm.Generator
{
  using System;
  using System.IO;
  using System.Linq;
  using System.Text;
  using Helpers;
  using Microsoft.Xrm.Sdk;
  using Microsoft.Xrm.Sdk.Messages;
  using Microsoft.Xrm.Sdk.Metadata;
  using Microsoft.Xrm.Tooling.Connector;

  /// <summary>
  /// The Program class
  /// </summary>
  public class Program
  {
    /// <summary>
    /// The main method
    /// </summary>
    /// <param name="args">The arguments</param>
    public static void Main(string[] args)
    {
      var options = new Options();
      if (CommandLine.Parser.Default.ParseArguments(args, options))
      {
        Console.WriteLine("Connection String: {0}", options.ConnectionString);
        Console.WriteLine("Entities: {0}", options.Entities ?? "None");
        Console.WriteLine(string.Empty);

        foreach (string sourceFileName in Directory.GetFiles(@"..\..\OneXrm\", "*.ts"))
        {
          string destFileName = string.Format(@"..\..\..\..\..\CrmPackage.Singular\OneXrm\{0}", Path.GetFileName(sourceFileName));
          Console.Write("Copying: {0} to {1}... ", sourceFileName, destFileName);
          File.Copy(sourceFileName, destFileName, true);
          Console.WriteLine("Done");
        }

        TemplateList templates = new TemplateList();

        Console.Write("Connecting to Dynamics 365... ");
        CrmServiceClient connection = new CrmServiceClient(options.ConnectionString);
        if (connection.IsReady)
        {
          Console.WriteLine("Done");
          IOrganizationService service = (IOrganizationService)connection.OrganizationServiceProxy;

          foreach (string entity in options.Entities.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
          {
            Console.Write("Retrieving {0}... ", entity.Trim());
            RetrieveEntityResponse retrieveEntityResponse = (RetrieveEntityResponse)service.Execute(new RetrieveEntityRequest
            {
              LogicalName = entity.Trim(),
              EntityFilters = EntityFilters.Attributes
            });

            EntityMetadata entityMetadata = retrieveEntityResponse.EntityMetadata;

            Console.Write("Generating OneXrm.Sdk.Entities.{0}... ", retrieveEntityResponse.EntityMetadata.SchemaName);

            string content = templates.Entity;

            StringBuilder attributes = new StringBuilder();
            StringBuilder optionSets = new StringBuilder();
            StringBuilder metadataAttributes = new StringBuilder();

            foreach (AttributeMetadata attributeMetadata in entityMetadata.Attributes.Where(ma => ma.AttributeOf == null).OrderBy(ma => ma.LogicalName))
            {
              string attributeContent = string.Empty;
              switch (attributeMetadata.AttributeType)
              {
                case AttributeTypeCode.BigInt: attributeContent = templates.BigIntAttribute; break;
                case AttributeTypeCode.Boolean: attributeContent = templates.BooleanAttribute; break;
                case AttributeTypeCode.Customer: attributeContent = templates.CustomerAttribute; break;
                case AttributeTypeCode.DateTime: attributeContent = templates.DateTimeAttribute; break;
                case AttributeTypeCode.Decimal: attributeContent = templates.DecimalAttribute; break;
                case AttributeTypeCode.Double: attributeContent = templates.DoubleAttribute; break;
                case AttributeTypeCode.Integer: attributeContent = templates.IntegerAttribute; break;
                case AttributeTypeCode.Memo: attributeContent = templates.MemoAttribute; break;
                case AttributeTypeCode.Money:
                  MoneyAttributeMetadata moneyAttributeMetadata = (MoneyAttributeMetadata)attributeMetadata;
                  if (moneyAttributeMetadata.CalculationOf == null) { attributeContent = templates.MoneyAttribute; }
                  break;
                case AttributeTypeCode.Owner: attributeContent = templates.OwnerAttribute; break;
                case AttributeTypeCode.PartyList: attributeContent = templates.PartyListAttribute; break;
                case AttributeTypeCode.Picklist: attributeContent = templates.PicklistAttribute; break;
                case AttributeTypeCode.State: attributeContent = templates.StateAttribute; break;
                case AttributeTypeCode.Status: attributeContent = templates.StatusAttribute; break;
                case AttributeTypeCode.String: attributeContent = templates.StringAttribute; break;
                case AttributeTypeCode.Lookup: attributeContent = templates.LookupAttribute; break;
                case AttributeTypeCode.Virtual: if (attributeMetadata is MultiSelectPicklistAttributeMetadata) { attributeContent = templates.MultiSelectPicklistAttribute; } break;
              }
              if (!string.IsNullOrEmpty(attributeContent))
              {
                attributeContent = attributeContent.Replace("{Attribute:LogicalNameProperty}", attributeMetadata.LogicalName == "name" ? "nameAttribute" : attributeMetadata.LogicalName);
                attributeContent = attributeContent.Replace("{Attribute:LogicalNameValue}", attributeMetadata.LogicalName);
                attributes.AppendLine(attributeContent);
              }

              bool isOptionSet = false;
              switch (attributeMetadata.AttributeType)
              {
                case AttributeTypeCode.Boolean:
                case AttributeTypeCode.Picklist:
                case AttributeTypeCode.State:
                case AttributeTypeCode.Status:
                  isOptionSet = true;
                  break;
                case AttributeTypeCode.Virtual:
                  isOptionSet = attributeMetadata is MultiSelectPicklistAttributeMetadata;
                  break;
              }

              if (isOptionSet)
              {
                string optionSetContent = templates.OptionSetEnum;
                optionSetContent = optionSetContent.Replace("{Attribute:LogicalNameProperty}", attributeMetadata.LogicalName == "name" ? "nameAttribute" : attributeMetadata.LogicalName);
                optionSetContent = optionSetContent.Replace("{Attribute:LogicalNameValue}", attributeMetadata.LogicalName);
                optionSetContent = optionSetContent.Replace("{Attribute:Options}", Utils.GetOptions(attributeMetadata));
                optionSets.AppendLine(optionSetContent);
              }

              string metadataAttributeContent = string.Empty;
              string attributeTargets = string.Empty;
              switch (attributeMetadata.AttributeType)
              {
                case AttributeTypeCode.BigInt:
                case AttributeTypeCode.Boolean:
                case AttributeTypeCode.Customer:
                case AttributeTypeCode.DateTime:
                case AttributeTypeCode.Decimal:
                case AttributeTypeCode.Double:
                case AttributeTypeCode.Integer:
                case AttributeTypeCode.Memo:
                case AttributeTypeCode.Owner:
                case AttributeTypeCode.PartyList:
                case AttributeTypeCode.Picklist:
                case AttributeTypeCode.State:
                case AttributeTypeCode.Status:
                case AttributeTypeCode.String:
                case AttributeTypeCode.Uniqueidentifier:
                  metadataAttributeContent = templates.MetadataAttribute;
                  break;
                case AttributeTypeCode.Lookup:
                  LookupAttributeMetadata lookupAttributeMetadata = (LookupAttributeMetadata)attributeMetadata;
                  attributeTargets = string.Format(",\n            targets: [{0}]", string.Join(",", lookupAttributeMetadata.Targets.Select(t => string.Format("\"{0}\"", t))));

                  metadataAttributeContent = templates.MetadataAttribute;
                  break;
                case AttributeTypeCode.Money:
                  MoneyAttributeMetadata moneyAttributeMetadata = (MoneyAttributeMetadata)attributeMetadata;
                  if (moneyAttributeMetadata.CalculationOf == null) { metadataAttributeContent = templates.MetadataAttribute; }
                  break;
                case AttributeTypeCode.Virtual:
                  if (attributeMetadata is MultiSelectPicklistAttributeMetadata)
                  {
                    metadataAttributeContent = templates.MetadataAttribute;
                  }
                  break;
              }
              if (!string.IsNullOrEmpty(metadataAttributeContent))
              {
                metadataAttributeContent = metadataAttributeContent.Replace("{Attribute:LogicalNameProperty}", attributeMetadata.LogicalName == "name" ? "nameAttribute" : attributeMetadata.LogicalName);
                metadataAttributeContent = metadataAttributeContent.Replace("{Attribute:LogicalNameValue}", attributeMetadata.LogicalName);
                metadataAttributeContent = metadataAttributeContent.Replace("{Attribute:SchemaName}", attributeMetadata.SchemaName);
                metadataAttributeContent = metadataAttributeContent.Replace("{Attribute:AttributeType}", attributeMetadata.AttributeType.ToString());
                metadataAttributeContent = metadataAttributeContent.Replace("{Attribute:Targets}", attributeTargets);
                metadataAttributes.AppendLine(metadataAttributeContent);
              }
            }

            content = content.Replace("{Entity:Attributes}", attributes.ToString());
            content = content.Replace("{Entity:OptionSets}", optionSets.ToString());
            content = content.Replace("{Entity:MetadataAttributes}", metadataAttributes.ToString());

            content = content.Replace("{Entity:LogicalName}", entityMetadata.LogicalName);
            content = content.Replace("{Entity:SchemaName}", entityMetadata.SchemaName);
            content = content.Replace("{Entity:PrimaryIdAttribute}", entityMetadata.PrimaryIdAttribute);
            content = content.Replace("{Entity:LogicalCollectionName}", entityMetadata.LogicalCollectionName);
            content = content.Replace("{Entity:ObjectTypeCode}", (entityMetadata.IsCustomEntity ?? false) ? "null" : (entityMetadata.ObjectTypeCode ?? 0).ToString());
            content = content.Replace("{Entity:IsCustomEntity}", (entityMetadata.IsCustomEntity ?? false) ? "true" : "false");

            File.WriteAllText(string.Format(@"..\..\..\..\..\CrmPackage.Singular\OneXrm\OneXrm.Entities.{0}.ts", entityMetadata.LogicalName), content, Encoding.UTF8);

            Console.WriteLine("Done");
          }
        }
        else
        {
          Console.Write("Unable to connect to Dynamics 365: ");
          Console.WriteLine(connection.LastCrmError);
        }
      }

      Console.WriteLine("Press enter to close...");
      Console.ReadLine();
    }
  }
}
