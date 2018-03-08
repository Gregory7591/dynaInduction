/// <reference path="OneXrm.ts" />

namespace OneXrm {
  export module Entities {
    export class contact extends Entity {
      public readonly entityType = contact;

      public static readonly metadata: Metadata.EntityMetadata = {
        isCustomEntity: false,
        logicalCollectionName: "contacts",
        logicalName: "contact",
        objectTypeCode: 2,
        primaryIdAttribute: "contactid",
        schemaName: "Contact"
      };

      /** Initializes a new instance of the OneXrm.Entities.contact class. */
      constructor() {
        super(contact.metadata.logicalName);
      }

      get contactid() {
        return this.id;
      }
      set contactid(value: string) {
        this.id = value;
      }

      public accountid: EntityReference;
      public accountrolecode: {
        value: OptionSets.contact_accountrolecode,
        name?: string
      };
      public address1_addresstypecode: {
        value: OptionSets.contact_address1_addresstypecode,
        name?: string
      };
      public address1_city: string;
      public address1_composite: string;
      public address1_country: string;
      public address1_county: string;
      public address1_fax: string;
      public address1_freighttermscode: {
        value: OptionSets.contact_address1_freighttermscode,
        name?: string
      };
      public address1_latitude: {
        value: number,
        name?: string
      };
      public address1_line1: string;
      public address1_line2: string;
      public address1_line3: string;
      public address1_longitude: {
        value: number,
        name?: string
      };
      public address1_name: string;
      public address1_postalcode: string;
      public address1_postofficebox: string;
      public address1_primarycontactname: string;
      public address1_shippingmethodcode: {
        value: OptionSets.contact_address1_shippingmethodcode,
        name?: string
      };
      public address1_stateorprovince: string;
      public address1_telephone1: string;
      public address1_telephone2: string;
      public address1_telephone3: string;
      public address1_upszone: string;
      public address1_utcoffset: {
        value: number,
        name?: string
      };
      public address2_addresstypecode: {
        value: OptionSets.contact_address2_addresstypecode,
        name?: string
      };
      public address2_city: string;
      public address2_composite: string;
      public address2_country: string;
      public address2_county: string;
      public address2_fax: string;
      public address2_freighttermscode: {
        value: OptionSets.contact_address2_freighttermscode,
        name?: string
      };
      public address2_latitude: {
        value: number,
        name?: string
      };
      public address2_line1: string;
      public address2_line2: string;
      public address2_line3: string;
      public address2_longitude: {
        value: number,
        name?: string
      };
      public address2_name: string;
      public address2_postalcode: string;
      public address2_postofficebox: string;
      public address2_primarycontactname: string;
      public address2_shippingmethodcode: {
        value: OptionSets.contact_address2_shippingmethodcode,
        name?: string
      };
      public address2_stateorprovince: string;
      public address2_telephone1: string;
      public address2_telephone2: string;
      public address2_telephone3: string;
      public address2_upszone: string;
      public address2_utcoffset: {
        value: number,
        name?: string
      };
      public address3_addresstypecode: {
        value: OptionSets.contact_address3_addresstypecode,
        name?: string
      };
      public address3_city: string;
      public address3_composite: string;
      public address3_country: string;
      public address3_county: string;
      public address3_fax: string;
      public address3_freighttermscode: {
        value: OptionSets.contact_address3_freighttermscode,
        name?: string
      };
      public address3_latitude: {
        value: number,
        name?: string
      };
      public address3_line1: string;
      public address3_line2: string;
      public address3_line3: string;
      public address3_longitude: {
        value: number,
        name?: string
      };
      public address3_name: string;
      public address3_postalcode: string;
      public address3_postofficebox: string;
      public address3_primarycontactname: string;
      public address3_shippingmethodcode: {
        value: OptionSets.contact_address3_shippingmethodcode,
        name?: string
      };
      public address3_stateorprovince: string;
      public address3_telephone1: string;
      public address3_telephone2: string;
      public address3_telephone3: string;
      public address3_upszone: string;
      public address3_utcoffset: {
        value: number,
        name?: string
      };
      public aging30: {
        value: number,
        name?: string
      };
      public aging60: {
        value: number,
        name?: string
      };
      public aging90: {
        value: number,
        name?: string
      };
      public anniversary: {
        value: Date,
        name?: string
      };
      public annualincome: {
        value: number,
        name?: string
      };
      public assistantname: string;
      public assistantphone: string;
      public birthdate: {
        value: Date,
        name?: string
      };
      public business2: string;
      public callback: string;
      public childrensnames: string;
      public company: string;
      public createdby: EntityReference;
      public createdbyexternalparty: EntityReference;
      public createdon: {
        value: Date,
        name?: string
      };
      public createdonbehalfby: EntityReference;
      public creditlimit: {
        value: number,
        name?: string
      };
      public creditonhold: {
        value: boolean,
        name?: string
      };
      public customersizecode: {
        value: OptionSets.contact_customersizecode,
        name?: string
      };
      public customertypecode: {
        value: OptionSets.contact_customertypecode,
        name?: string
      };
      public defaultpricelevelid: EntityReference;
      public department: string;
      public description: string;
      public di_age: {
        value: number,
        name?: string
      };
      public di_dateofbirth: {
        value: Date,
        name?: string
      };
      public di_esitimatedreturnfinal: {
        value: number,
        name?: string
      };
      public di_estimated_return: string;
      public di_interest_rate: {
        value: number,
        name?: string
      };
      public di_intial_investment: {
        value: number,
        name?: string
      };
      public di_intialinvesmentfinal: {
        value: number,
        name?: string
      };
      public di_investmentperiod: {
        value: number,
        name?: string
      };
      public di_joining_date: {
        value: Date,
        name?: string
      };
      public di_maturity_date: {
        value: Date,
        name?: string
      };
      public donotbulkemail: {
        value: boolean,
        name?: string
      };
      public donotbulkpostalmail: {
        value: boolean,
        name?: string
      };
      public donotemail: {
        value: boolean,
        name?: string
      };
      public donotfax: {
        value: boolean,
        name?: string
      };
      public donotphone: {
        value: boolean,
        name?: string
      };
      public donotpostalmail: {
        value: boolean,
        name?: string
      };
      public donotsendmm: {
        value: boolean,
        name?: string
      };
      public educationcode: {
        value: OptionSets.contact_educationcode,
        name?: string
      };
      public emailaddress1: string;
      public emailaddress2: string;
      public emailaddress3: string;
      public employeeid: string;
      public exchangerate: {
        value: number,
        name?: string
      };
      public externaluseridentifier: string;
      public familystatuscode: {
        value: OptionSets.contact_familystatuscode,
        name?: string
      };
      public fax: string;
      public firstname: string;
      public followemail: {
        value: boolean,
        name?: string
      };
      public ftpsiteurl: string;
      public fullname: string;
      public gendercode: {
        value: OptionSets.contact_gendercode,
        name?: string
      };
      public governmentid: string;
      public haschildrencode: {
        value: OptionSets.contact_haschildrencode,
        name?: string
      };
      public home2: string;
      public importsequencenumber: {
        value: number,
        name?: string
      };
      public isautocreate: {
        value: boolean,
        name?: string
      };
      public isbackofficecustomer: {
        value: boolean,
        name?: string
      };
      public isprivate: {
        value: boolean,
        name?: string
      };
      public jobtitle: string;
      public lastname: string;
      public lastonholdtime: {
        value: Date,
        name?: string
      };
      public lastusedincampaign: {
        value: Date,
        name?: string
      };
      public leadsourcecode: {
        value: OptionSets.contact_leadsourcecode,
        name?: string
      };
      public managername: string;
      public managerphone: string;
      public marketingonly: {
        value: boolean,
        name?: string
      };
      public masterid: EntityReference;
      public merged: {
        value: boolean,
        name?: string
      };
      public middlename: string;
      public mobilephone: string;
      public modifiedby: EntityReference;
      public modifiedbyexternalparty: EntityReference;
      public modifiedon: {
        value: Date,
        name?: string
      };
      public modifiedonbehalfby: EntityReference;
      public nickname: string;
      public numberofchildren: {
        value: number,
        name?: string
      };
      public onholdtime: {
        value: number,
        name?: string
      };
      public originatingleadid: EntityReference;
      public overriddencreatedon: {
        value: Date,
        name?: string
      };
      public ownerid: EntityReference;
      public owningbusinessunit: EntityReference;
      public owningteam: EntityReference;
      public owninguser: EntityReference;
      public pager: string;
      public parentcontactid: EntityReference;
      public parentcustomerid: EntityReference;
      public participatesinworkflow: {
        value: boolean,
        name?: string
      };
      public paymenttermscode: {
        value: OptionSets.contact_paymenttermscode,
        name?: string
      };
      public preferredappointmentdaycode: {
        value: OptionSets.contact_preferredappointmentdaycode,
        name?: string
      };
      public preferredappointmenttimecode: {
        value: OptionSets.contact_preferredappointmenttimecode,
        name?: string
      };
      public preferredcontactmethodcode: {
        value: OptionSets.contact_preferredcontactmethodcode,
        name?: string
      };
      public preferredequipmentid: EntityReference;
      public preferredserviceid: EntityReference;
      public preferredsystemuserid: EntityReference;
      public salutation: string;
      public shippingmethodcode: {
        value: OptionSets.contact_shippingmethodcode,
        name?: string
      };
      public slaid: EntityReference;
      public slainvokedid: EntityReference;
      public spousesname: string;
      public statecode: {
        value: OptionSets.contact_statecode,
        name?: string
      };
      public statuscode: {
        value: OptionSets.contact_statuscode,
        name?: string
      };
      public suffix: string;
      public telephone1: string;
      public telephone2: string;
      public telephone3: string;
      public territorycode: {
        value: OptionSets.contact_territorycode,
        name?: string
      };
      public timespentbymeonemailandmeetings: string;
      public timezoneruleversionnumber: {
        value: number,
        name?: string
      };
      public transactioncurrencyid: EntityReference;
      public traversedpath: string;
      public utcconversiontimezonecode: {
        value: number,
        name?: string
      };
      public versionnumber: {
        value: number,
        name?: string
      };
      public websiteurl: string;
      public yomifirstname: string;
      public yomifullname: string;
      public yomilastname: string;
      public yomimiddlename: string;


      /** Retrieves the contact with the supplied id. */
      /** @param id The id of the contact to retrieve. */
      /** @param columns The columns to retrieve. Supply null to retrieve all columns. */
      /** @param successCallback The function to be called on a successful response. */
      /** @param errorCallback The function to be called on an unsuccessful response. */
      static retrieve(id: string, columns: Metadata.AttributeMetadata[] = null, successCallback?: (contact: contact) => any, errorCallback?: (error: Error) => any): JQueryXHR {
        return Messages.retrieve(this, id, columns, successCallback, errorCallback);
      }

      /** Retrieves the contact according to the supplied Web API query. */
      /** @param webAPIQuery The Web API query. */
      /** @param successCallback The function to be called on a successful response. */
      /** @param errorCallback The function to be called on an unsuccessful response. */
      static retrieveWebAPI(webAPIQuery: string, successCallback?: (contact: contact) => any, errorCallback?: (error: Error) => any): JQueryXHR {
        return Messages.retrieveWebAPI(this, webAPIQuery, successCallback, errorCallback);
      }

      /** Retrieves the list of contact records according to the supplied query. */
      /** @param criteria The criteria. */
      /** @param orders The order expressions. */
      /** @param columns The columns to retrieve. Supply null to retrieve all columns. */
      /** @param top The number of records to retrieve. Supply null to retrieve all records. */
      /** @param linkedEntities The linked entities. */
      /** @param successCallback The function to be called on a successful response. */
      /** @param errorCallback The function to be called on an unsuccessful response. */
      static retrieveMultiple(criteria: Query.FilterExpression = new Query.FilterExpression(), orders: Query.OrderExpression[] = [], columns: Metadata.AttributeMetadata[] = null, top: Number = null, linkedEntities: Query.LinkEntity[] = [], successCallback?: (entities: contact[]) => any, errorCallback?: (error: Error) => any): JQueryXHR {
        return Messages.retrieveMultiple(this, criteria, orders, columns, top, linkedEntities, successCallback, errorCallback);
      }

      /** Retrieves the list of contact records according to the supplied query expression. */
      /** @param query The query expression. */
      /** @param successCallback The function to be called on a successful response. */
      /** @param errorCallback The function to be called on an unsuccessful response. */
      static retrieveMultipleQuery(query: Query.QueryExpression, successCallback?: (entities: contact[]) => any, errorCallback?: (error: Error) => any): JQueryXHR {
        return Messages.retrieveMultipleQuery(this, query, successCallback, errorCallback);
      }

      /** Retrieves the list of contact records according to the supplied query expression. */
      /** @param webAPIQuery The Web API query. */
      /** @param successCallback The function to be called on a successful response. */
      /** @param errorCallback The function to be called on an unsuccessful response. */
      static retrieveMultipleWebAPI(webAPIQuery: string, successCallback?: (entities: contact[]) => any, errorCallback?: (error: Error) => any): JQueryXHR {
        return Messages.retrieveMultipleWebAPI(this, webAPIQuery, successCallback, errorCallback);
      }

      /** Starts a new LINQ query. */
      static get linq(): contact.LINQ {
        return new contact.LINQ();
      }
    }

    export module contact {
      export class Attributes {
          public static readonly accountid: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.Lookup,
            logicalName: "accountid",
            schemaName: "AccountId",
            targets: ["account"]
          };
          public static readonly accountrolecode: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.Picklist,
            logicalName: "accountrolecode",
            schemaName: "AccountRoleCode"
          };
          public static readonly address1_addressid: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.Uniqueidentifier,
            logicalName: "address1_addressid",
            schemaName: "Address1_AddressId"
          };
          public static readonly address1_addresstypecode: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.Picklist,
            logicalName: "address1_addresstypecode",
            schemaName: "Address1_AddressTypeCode"
          };
          public static readonly address1_city: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.String,
            logicalName: "address1_city",
            schemaName: "Address1_City"
          };
          public static readonly address1_composite: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.Memo,
            logicalName: "address1_composite",
            schemaName: "Address1_Composite"
          };
          public static readonly address1_country: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.String,
            logicalName: "address1_country",
            schemaName: "Address1_Country"
          };
          public static readonly address1_county: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.String,
            logicalName: "address1_county",
            schemaName: "Address1_County"
          };
          public static readonly address1_fax: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.String,
            logicalName: "address1_fax",
            schemaName: "Address1_Fax"
          };
          public static readonly address1_freighttermscode: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.Picklist,
            logicalName: "address1_freighttermscode",
            schemaName: "Address1_FreightTermsCode"
          };
          public static readonly address1_latitude: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.Double,
            logicalName: "address1_latitude",
            schemaName: "Address1_Latitude"
          };
          public static readonly address1_line1: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.String,
            logicalName: "address1_line1",
            schemaName: "Address1_Line1"
          };
          public static readonly address1_line2: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.String,
            logicalName: "address1_line2",
            schemaName: "Address1_Line2"
          };
          public static readonly address1_line3: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.String,
            logicalName: "address1_line3",
            schemaName: "Address1_Line3"
          };
          public static readonly address1_longitude: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.Double,
            logicalName: "address1_longitude",
            schemaName: "Address1_Longitude"
          };
          public static readonly address1_name: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.String,
            logicalName: "address1_name",
            schemaName: "Address1_Name"
          };
          public static readonly address1_postalcode: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.String,
            logicalName: "address1_postalcode",
            schemaName: "Address1_PostalCode"
          };
          public static readonly address1_postofficebox: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.String,
            logicalName: "address1_postofficebox",
            schemaName: "Address1_PostOfficeBox"
          };
          public static readonly address1_primarycontactname: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.String,
            logicalName: "address1_primarycontactname",
            schemaName: "Address1_PrimaryContactName"
          };
          public static readonly address1_shippingmethodcode: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.Picklist,
            logicalName: "address1_shippingmethodcode",
            schemaName: "Address1_ShippingMethodCode"
          };
          public static readonly address1_stateorprovince: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.String,
            logicalName: "address1_stateorprovince",
            schemaName: "Address1_StateOrProvince"
          };
          public static readonly address1_telephone1: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.String,
            logicalName: "address1_telephone1",
            schemaName: "Address1_Telephone1"
          };
          public static readonly address1_telephone2: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.String,
            logicalName: "address1_telephone2",
            schemaName: "Address1_Telephone2"
          };
          public static readonly address1_telephone3: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.String,
            logicalName: "address1_telephone3",
            schemaName: "Address1_Telephone3"
          };
          public static readonly address1_upszone: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.String,
            logicalName: "address1_upszone",
            schemaName: "Address1_UPSZone"
          };
          public static readonly address1_utcoffset: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.Integer,
            logicalName: "address1_utcoffset",
            schemaName: "Address1_UTCOffset"
          };
          public static readonly address2_addressid: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.Uniqueidentifier,
            logicalName: "address2_addressid",
            schemaName: "Address2_AddressId"
          };
          public static readonly address2_addresstypecode: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.Picklist,
            logicalName: "address2_addresstypecode",
            schemaName: "Address2_AddressTypeCode"
          };
          public static readonly address2_city: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.String,
            logicalName: "address2_city",
            schemaName: "Address2_City"
          };
          public static readonly address2_composite: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.Memo,
            logicalName: "address2_composite",
            schemaName: "Address2_Composite"
          };
          public static readonly address2_country: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.String,
            logicalName: "address2_country",
            schemaName: "Address2_Country"
          };
          public static readonly address2_county: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.String,
            logicalName: "address2_county",
            schemaName: "Address2_County"
          };
          public static readonly address2_fax: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.String,
            logicalName: "address2_fax",
            schemaName: "Address2_Fax"
          };
          public static readonly address2_freighttermscode: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.Picklist,
            logicalName: "address2_freighttermscode",
            schemaName: "Address2_FreightTermsCode"
          };
          public static readonly address2_latitude: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.Double,
            logicalName: "address2_latitude",
            schemaName: "Address2_Latitude"
          };
          public static readonly address2_line1: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.String,
            logicalName: "address2_line1",
            schemaName: "Address2_Line1"
          };
          public static readonly address2_line2: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.String,
            logicalName: "address2_line2",
            schemaName: "Address2_Line2"
          };
          public static readonly address2_line3: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.String,
            logicalName: "address2_line3",
            schemaName: "Address2_Line3"
          };
          public static readonly address2_longitude: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.Double,
            logicalName: "address2_longitude",
            schemaName: "Address2_Longitude"
          };
          public static readonly address2_name: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.String,
            logicalName: "address2_name",
            schemaName: "Address2_Name"
          };
          public static readonly address2_postalcode: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.String,
            logicalName: "address2_postalcode",
            schemaName: "Address2_PostalCode"
          };
          public static readonly address2_postofficebox: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.String,
            logicalName: "address2_postofficebox",
            schemaName: "Address2_PostOfficeBox"
          };
          public static readonly address2_primarycontactname: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.String,
            logicalName: "address2_primarycontactname",
            schemaName: "Address2_PrimaryContactName"
          };
          public static readonly address2_shippingmethodcode: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.Picklist,
            logicalName: "address2_shippingmethodcode",
            schemaName: "Address2_ShippingMethodCode"
          };
          public static readonly address2_stateorprovince: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.String,
            logicalName: "address2_stateorprovince",
            schemaName: "Address2_StateOrProvince"
          };
          public static readonly address2_telephone1: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.String,
            logicalName: "address2_telephone1",
            schemaName: "Address2_Telephone1"
          };
          public static readonly address2_telephone2: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.String,
            logicalName: "address2_telephone2",
            schemaName: "Address2_Telephone2"
          };
          public static readonly address2_telephone3: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.String,
            logicalName: "address2_telephone3",
            schemaName: "Address2_Telephone3"
          };
          public static readonly address2_upszone: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.String,
            logicalName: "address2_upszone",
            schemaName: "Address2_UPSZone"
          };
          public static readonly address2_utcoffset: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.Integer,
            logicalName: "address2_utcoffset",
            schemaName: "Address2_UTCOffset"
          };
          public static readonly address3_addressid: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.Uniqueidentifier,
            logicalName: "address3_addressid",
            schemaName: "Address3_AddressId"
          };
          public static readonly address3_addresstypecode: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.Picklist,
            logicalName: "address3_addresstypecode",
            schemaName: "Address3_AddressTypeCode"
          };
          public static readonly address3_city: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.String,
            logicalName: "address3_city",
            schemaName: "Address3_City"
          };
          public static readonly address3_composite: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.Memo,
            logicalName: "address3_composite",
            schemaName: "Address3_Composite"
          };
          public static readonly address3_country: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.String,
            logicalName: "address3_country",
            schemaName: "Address3_Country"
          };
          public static readonly address3_county: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.String,
            logicalName: "address3_county",
            schemaName: "Address3_County"
          };
          public static readonly address3_fax: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.String,
            logicalName: "address3_fax",
            schemaName: "Address3_Fax"
          };
          public static readonly address3_freighttermscode: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.Picklist,
            logicalName: "address3_freighttermscode",
            schemaName: "Address3_FreightTermsCode"
          };
          public static readonly address3_latitude: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.Double,
            logicalName: "address3_latitude",
            schemaName: "Address3_Latitude"
          };
          public static readonly address3_line1: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.String,
            logicalName: "address3_line1",
            schemaName: "Address3_Line1"
          };
          public static readonly address3_line2: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.String,
            logicalName: "address3_line2",
            schemaName: "Address3_Line2"
          };
          public static readonly address3_line3: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.String,
            logicalName: "address3_line3",
            schemaName: "Address3_Line3"
          };
          public static readonly address3_longitude: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.Double,
            logicalName: "address3_longitude",
            schemaName: "Address3_Longitude"
          };
          public static readonly address3_name: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.String,
            logicalName: "address3_name",
            schemaName: "Address3_Name"
          };
          public static readonly address3_postalcode: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.String,
            logicalName: "address3_postalcode",
            schemaName: "Address3_PostalCode"
          };
          public static readonly address3_postofficebox: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.String,
            logicalName: "address3_postofficebox",
            schemaName: "Address3_PostOfficeBox"
          };
          public static readonly address3_primarycontactname: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.String,
            logicalName: "address3_primarycontactname",
            schemaName: "Address3_PrimaryContactName"
          };
          public static readonly address3_shippingmethodcode: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.Picklist,
            logicalName: "address3_shippingmethodcode",
            schemaName: "Address3_ShippingMethodCode"
          };
          public static readonly address3_stateorprovince: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.String,
            logicalName: "address3_stateorprovince",
            schemaName: "Address3_StateOrProvince"
          };
          public static readonly address3_telephone1: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.String,
            logicalName: "address3_telephone1",
            schemaName: "Address3_Telephone1"
          };
          public static readonly address3_telephone2: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.String,
            logicalName: "address3_telephone2",
            schemaName: "Address3_Telephone2"
          };
          public static readonly address3_telephone3: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.String,
            logicalName: "address3_telephone3",
            schemaName: "Address3_Telephone3"
          };
          public static readonly address3_upszone: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.String,
            logicalName: "address3_upszone",
            schemaName: "Address3_UPSZone"
          };
          public static readonly address3_utcoffset: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.Integer,
            logicalName: "address3_utcoffset",
            schemaName: "Address3_UTCOffset"
          };
          public static readonly aging30: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.Money,
            logicalName: "aging30",
            schemaName: "Aging30"
          };
          public static readonly aging60: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.Money,
            logicalName: "aging60",
            schemaName: "Aging60"
          };
          public static readonly aging90: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.Money,
            logicalName: "aging90",
            schemaName: "Aging90"
          };
          public static readonly anniversary: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.DateTime,
            logicalName: "anniversary",
            schemaName: "Anniversary"
          };
          public static readonly annualincome: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.Money,
            logicalName: "annualincome",
            schemaName: "AnnualIncome"
          };
          public static readonly assistantname: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.String,
            logicalName: "assistantname",
            schemaName: "AssistantName"
          };
          public static readonly assistantphone: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.String,
            logicalName: "assistantphone",
            schemaName: "AssistantPhone"
          };
          public static readonly birthdate: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.DateTime,
            logicalName: "birthdate",
            schemaName: "BirthDate"
          };
          public static readonly business2: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.String,
            logicalName: "business2",
            schemaName: "Business2"
          };
          public static readonly callback: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.String,
            logicalName: "callback",
            schemaName: "Callback"
          };
          public static readonly childrensnames: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.String,
            logicalName: "childrensnames",
            schemaName: "ChildrensNames"
          };
          public static readonly company: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.String,
            logicalName: "company",
            schemaName: "Company"
          };
          public static readonly contactid: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.Uniqueidentifier,
            logicalName: "contactid",
            schemaName: "ContactId"
          };
          public static readonly createdby: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.Lookup,
            logicalName: "createdby",
            schemaName: "CreatedBy",
            targets: ["systemuser"]
          };
          public static readonly createdbyexternalparty: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.Lookup,
            logicalName: "createdbyexternalparty",
            schemaName: "CreatedByExternalParty",
            targets: ["externalparty"]
          };
          public static readonly createdon: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.DateTime,
            logicalName: "createdon",
            schemaName: "CreatedOn"
          };
          public static readonly createdonbehalfby: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.Lookup,
            logicalName: "createdonbehalfby",
            schemaName: "CreatedOnBehalfBy",
            targets: ["systemuser"]
          };
          public static readonly creditlimit: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.Money,
            logicalName: "creditlimit",
            schemaName: "CreditLimit"
          };
          public static readonly creditonhold: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.Boolean,
            logicalName: "creditonhold",
            schemaName: "CreditOnHold"
          };
          public static readonly customersizecode: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.Picklist,
            logicalName: "customersizecode",
            schemaName: "CustomerSizeCode"
          };
          public static readonly customertypecode: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.Picklist,
            logicalName: "customertypecode",
            schemaName: "CustomerTypeCode"
          };
          public static readonly defaultpricelevelid: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.Lookup,
            logicalName: "defaultpricelevelid",
            schemaName: "DefaultPriceLevelId",
            targets: ["pricelevel"]
          };
          public static readonly department: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.String,
            logicalName: "department",
            schemaName: "Department"
          };
          public static readonly description: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.Memo,
            logicalName: "description",
            schemaName: "Description"
          };
          public static readonly di_age: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.Integer,
            logicalName: "di_age",
            schemaName: "di_age"
          };
          public static readonly di_dateofbirth: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.DateTime,
            logicalName: "di_dateofbirth",
            schemaName: "di_dateofBirth"
          };
          public static readonly di_esitimatedreturnfinal: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.Decimal,
            logicalName: "di_esitimatedreturnfinal",
            schemaName: "di_EsitimatedReturnFinal"
          };
          public static readonly di_estimated_return: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.String,
            logicalName: "di_estimated_return",
            schemaName: "di_estimated_Return"
          };
          public static readonly di_interest_rate: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.Decimal,
            logicalName: "di_interest_rate",
            schemaName: "di_interest_rate"
          };
          public static readonly di_intial_investment: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.Money,
            logicalName: "di_intial_investment",
            schemaName: "di_Intial_Investment"
          };
          public static readonly di_intialinvesmentfinal: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.Decimal,
            logicalName: "di_intialinvesmentfinal",
            schemaName: "di_IntialInvesmentFinal"
          };
          public static readonly di_investmentperiod: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.Integer,
            logicalName: "di_investmentperiod",
            schemaName: "di_InvestmentPeriod"
          };
          public static readonly di_joining_date: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.DateTime,
            logicalName: "di_joining_date",
            schemaName: "di_joining_date"
          };
          public static readonly di_maturity_date: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.DateTime,
            logicalName: "di_maturity_date",
            schemaName: "di_maturity_date"
          };
          public static readonly donotbulkemail: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.Boolean,
            logicalName: "donotbulkemail",
            schemaName: "DoNotBulkEMail"
          };
          public static readonly donotbulkpostalmail: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.Boolean,
            logicalName: "donotbulkpostalmail",
            schemaName: "DoNotBulkPostalMail"
          };
          public static readonly donotemail: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.Boolean,
            logicalName: "donotemail",
            schemaName: "DoNotEMail"
          };
          public static readonly donotfax: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.Boolean,
            logicalName: "donotfax",
            schemaName: "DoNotFax"
          };
          public static readonly donotphone: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.Boolean,
            logicalName: "donotphone",
            schemaName: "DoNotPhone"
          };
          public static readonly donotpostalmail: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.Boolean,
            logicalName: "donotpostalmail",
            schemaName: "DoNotPostalMail"
          };
          public static readonly donotsendmm: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.Boolean,
            logicalName: "donotsendmm",
            schemaName: "DoNotSendMM"
          };
          public static readonly educationcode: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.Picklist,
            logicalName: "educationcode",
            schemaName: "EducationCode"
          };
          public static readonly emailaddress1: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.String,
            logicalName: "emailaddress1",
            schemaName: "EMailAddress1"
          };
          public static readonly emailaddress2: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.String,
            logicalName: "emailaddress2",
            schemaName: "EMailAddress2"
          };
          public static readonly emailaddress3: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.String,
            logicalName: "emailaddress3",
            schemaName: "EMailAddress3"
          };
          public static readonly employeeid: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.String,
            logicalName: "employeeid",
            schemaName: "EmployeeId"
          };
          public static readonly entityimageid: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.Uniqueidentifier,
            logicalName: "entityimageid",
            schemaName: "EntityImageId"
          };
          public static readonly exchangerate: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.Decimal,
            logicalName: "exchangerate",
            schemaName: "ExchangeRate"
          };
          public static readonly externaluseridentifier: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.String,
            logicalName: "externaluseridentifier",
            schemaName: "ExternalUserIdentifier"
          };
          public static readonly familystatuscode: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.Picklist,
            logicalName: "familystatuscode",
            schemaName: "FamilyStatusCode"
          };
          public static readonly fax: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.String,
            logicalName: "fax",
            schemaName: "Fax"
          };
          public static readonly firstname: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.String,
            logicalName: "firstname",
            schemaName: "FirstName"
          };
          public static readonly followemail: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.Boolean,
            logicalName: "followemail",
            schemaName: "FollowEmail"
          };
          public static readonly ftpsiteurl: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.String,
            logicalName: "ftpsiteurl",
            schemaName: "FtpSiteUrl"
          };
          public static readonly fullname: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.String,
            logicalName: "fullname",
            schemaName: "FullName"
          };
          public static readonly gendercode: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.Picklist,
            logicalName: "gendercode",
            schemaName: "GenderCode"
          };
          public static readonly governmentid: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.String,
            logicalName: "governmentid",
            schemaName: "GovernmentId"
          };
          public static readonly haschildrencode: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.Picklist,
            logicalName: "haschildrencode",
            schemaName: "HasChildrenCode"
          };
          public static readonly home2: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.String,
            logicalName: "home2",
            schemaName: "Home2"
          };
          public static readonly importsequencenumber: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.Integer,
            logicalName: "importsequencenumber",
            schemaName: "ImportSequenceNumber"
          };
          public static readonly isautocreate: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.Boolean,
            logicalName: "isautocreate",
            schemaName: "IsAutoCreate"
          };
          public static readonly isbackofficecustomer: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.Boolean,
            logicalName: "isbackofficecustomer",
            schemaName: "IsBackofficeCustomer"
          };
          public static readonly isprivate: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.Boolean,
            logicalName: "isprivate",
            schemaName: "IsPrivate"
          };
          public static readonly jobtitle: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.String,
            logicalName: "jobtitle",
            schemaName: "JobTitle"
          };
          public static readonly lastname: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.String,
            logicalName: "lastname",
            schemaName: "LastName"
          };
          public static readonly lastonholdtime: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.DateTime,
            logicalName: "lastonholdtime",
            schemaName: "LastOnHoldTime"
          };
          public static readonly lastusedincampaign: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.DateTime,
            logicalName: "lastusedincampaign",
            schemaName: "LastUsedInCampaign"
          };
          public static readonly leadsourcecode: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.Picklist,
            logicalName: "leadsourcecode",
            schemaName: "LeadSourceCode"
          };
          public static readonly managername: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.String,
            logicalName: "managername",
            schemaName: "ManagerName"
          };
          public static readonly managerphone: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.String,
            logicalName: "managerphone",
            schemaName: "ManagerPhone"
          };
          public static readonly marketingonly: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.Boolean,
            logicalName: "marketingonly",
            schemaName: "MarketingOnly"
          };
          public static readonly masterid: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.Lookup,
            logicalName: "masterid",
            schemaName: "MasterId",
            targets: ["contact"]
          };
          public static readonly merged: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.Boolean,
            logicalName: "merged",
            schemaName: "Merged"
          };
          public static readonly middlename: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.String,
            logicalName: "middlename",
            schemaName: "MiddleName"
          };
          public static readonly mobilephone: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.String,
            logicalName: "mobilephone",
            schemaName: "MobilePhone"
          };
          public static readonly modifiedby: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.Lookup,
            logicalName: "modifiedby",
            schemaName: "ModifiedBy",
            targets: ["systemuser"]
          };
          public static readonly modifiedbyexternalparty: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.Lookup,
            logicalName: "modifiedbyexternalparty",
            schemaName: "ModifiedByExternalParty",
            targets: ["externalparty"]
          };
          public static readonly modifiedon: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.DateTime,
            logicalName: "modifiedon",
            schemaName: "ModifiedOn"
          };
          public static readonly modifiedonbehalfby: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.Lookup,
            logicalName: "modifiedonbehalfby",
            schemaName: "ModifiedOnBehalfBy",
            targets: ["systemuser"]
          };
          public static readonly nickname: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.String,
            logicalName: "nickname",
            schemaName: "NickName"
          };
          public static readonly numberofchildren: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.Integer,
            logicalName: "numberofchildren",
            schemaName: "NumberOfChildren"
          };
          public static readonly onholdtime: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.Integer,
            logicalName: "onholdtime",
            schemaName: "OnHoldTime"
          };
          public static readonly originatingleadid: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.Lookup,
            logicalName: "originatingleadid",
            schemaName: "OriginatingLeadId",
            targets: ["lead"]
          };
          public static readonly overriddencreatedon: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.DateTime,
            logicalName: "overriddencreatedon",
            schemaName: "OverriddenCreatedOn"
          };
          public static readonly ownerid: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.Owner,
            logicalName: "ownerid",
            schemaName: "OwnerId"
          };
          public static readonly owningbusinessunit: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.Lookup,
            logicalName: "owningbusinessunit",
            schemaName: "OwningBusinessUnit",
            targets: ["businessunit"]
          };
          public static readonly owningteam: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.Lookup,
            logicalName: "owningteam",
            schemaName: "OwningTeam",
            targets: ["team"]
          };
          public static readonly owninguser: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.Lookup,
            logicalName: "owninguser",
            schemaName: "OwningUser",
            targets: ["systemuser"]
          };
          public static readonly pager: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.String,
            logicalName: "pager",
            schemaName: "Pager"
          };
          public static readonly parentcontactid: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.Lookup,
            logicalName: "parentcontactid",
            schemaName: "ParentContactId",
            targets: ["contact"]
          };
          public static readonly parentcustomerid: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.Customer,
            logicalName: "parentcustomerid",
            schemaName: "ParentCustomerId"
          };
          public static readonly participatesinworkflow: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.Boolean,
            logicalName: "participatesinworkflow",
            schemaName: "ParticipatesInWorkflow"
          };
          public static readonly paymenttermscode: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.Picklist,
            logicalName: "paymenttermscode",
            schemaName: "PaymentTermsCode"
          };
          public static readonly preferredappointmentdaycode: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.Picklist,
            logicalName: "preferredappointmentdaycode",
            schemaName: "PreferredAppointmentDayCode"
          };
          public static readonly preferredappointmenttimecode: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.Picklist,
            logicalName: "preferredappointmenttimecode",
            schemaName: "PreferredAppointmentTimeCode"
          };
          public static readonly preferredcontactmethodcode: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.Picklist,
            logicalName: "preferredcontactmethodcode",
            schemaName: "PreferredContactMethodCode"
          };
          public static readonly preferredequipmentid: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.Lookup,
            logicalName: "preferredequipmentid",
            schemaName: "PreferredEquipmentId",
            targets: ["equipment"]
          };
          public static readonly preferredserviceid: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.Lookup,
            logicalName: "preferredserviceid",
            schemaName: "PreferredServiceId",
            targets: ["service"]
          };
          public static readonly preferredsystemuserid: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.Lookup,
            logicalName: "preferredsystemuserid",
            schemaName: "PreferredSystemUserId",
            targets: ["systemuser"]
          };
          public static readonly processid: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.Uniqueidentifier,
            logicalName: "processid",
            schemaName: "ProcessId"
          };
          public static readonly salutation: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.String,
            logicalName: "salutation",
            schemaName: "Salutation"
          };
          public static readonly shippingmethodcode: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.Picklist,
            logicalName: "shippingmethodcode",
            schemaName: "ShippingMethodCode"
          };
          public static readonly slaid: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.Lookup,
            logicalName: "slaid",
            schemaName: "SLAId",
            targets: ["sla"]
          };
          public static readonly slainvokedid: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.Lookup,
            logicalName: "slainvokedid",
            schemaName: "SLAInvokedId",
            targets: ["sla"]
          };
          public static readonly spousesname: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.String,
            logicalName: "spousesname",
            schemaName: "SpousesName"
          };
          public static readonly stageid: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.Uniqueidentifier,
            logicalName: "stageid",
            schemaName: "StageId"
          };
          public static readonly statecode: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.State,
            logicalName: "statecode",
            schemaName: "StateCode"
          };
          public static readonly statuscode: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.Status,
            logicalName: "statuscode",
            schemaName: "StatusCode"
          };
          public static readonly subscriptionid: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.Uniqueidentifier,
            logicalName: "subscriptionid",
            schemaName: "SubscriptionId"
          };
          public static readonly suffix: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.String,
            logicalName: "suffix",
            schemaName: "Suffix"
          };
          public static readonly telephone1: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.String,
            logicalName: "telephone1",
            schemaName: "Telephone1"
          };
          public static readonly telephone2: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.String,
            logicalName: "telephone2",
            schemaName: "Telephone2"
          };
          public static readonly telephone3: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.String,
            logicalName: "telephone3",
            schemaName: "Telephone3"
          };
          public static readonly territorycode: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.Picklist,
            logicalName: "territorycode",
            schemaName: "TerritoryCode"
          };
          public static readonly timespentbymeonemailandmeetings: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.String,
            logicalName: "timespentbymeonemailandmeetings",
            schemaName: "TimeSpentByMeOnEmailAndMeetings"
          };
          public static readonly timezoneruleversionnumber: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.Integer,
            logicalName: "timezoneruleversionnumber",
            schemaName: "TimeZoneRuleVersionNumber"
          };
          public static readonly transactioncurrencyid: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.Lookup,
            logicalName: "transactioncurrencyid",
            schemaName: "TransactionCurrencyId",
            targets: ["transactioncurrency"]
          };
          public static readonly traversedpath: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.String,
            logicalName: "traversedpath",
            schemaName: "TraversedPath"
          };
          public static readonly utcconversiontimezonecode: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.Integer,
            logicalName: "utcconversiontimezonecode",
            schemaName: "UTCConversionTimeZoneCode"
          };
          public static readonly versionnumber: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.BigInt,
            logicalName: "versionnumber",
            schemaName: "VersionNumber"
          };
          public static readonly websiteurl: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.String,
            logicalName: "websiteurl",
            schemaName: "WebSiteUrl"
          };
          public static readonly yomifirstname: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.String,
            logicalName: "yomifirstname",
            schemaName: "YomiFirstName"
          };
          public static readonly yomifullname: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.String,
            logicalName: "yomifullname",
            schemaName: "YomiFullName"
          };
          public static readonly yomilastname: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.String,
            logicalName: "yomilastname",
            schemaName: "YomiLastName"
          };
          public static readonly yomimiddlename: Metadata.AttributeMetadata = {
            attributeType: Metadata.AttributeTypeCode.String,
            logicalName: "yomimiddlename",
            schemaName: "YomiMiddleName"
          };

      }

      export class LINQ {
        private query: Query.QueryExpression;

        /** Initializes a new instance of the Entities.contact.LINQ class. */
        public constructor() {
          this.query = new Query.QueryExpression(contact);
        }

        /** Appends a condition expression to the query's criteria conditions. */
        /** @param attribute The attribute. */
        /** @param conditionOperator The condition operator. */
        /** @param values The value(s). */
        public addCondition(attribute: Metadata.AttributeMetadata, conditionOperator: Query.ConditionOperator, values: Object | Object[] = []): contact.LINQ {
          this.query.criteria.conditions.push(new Query.ConditionExpression(attribute, conditionOperator, values));
          return this;
        }

        /** Appends an order expression to the query's orders. */
        /** @param attribute The attribute. */
        /** @param orderType The order type. Defaults to OneXrm.Query.OrderType.Ascending. */
        public addOrder(attribute: Metadata.AttributeMetadata, orderType: Query.OrderType = Query.OrderType.Ascending): contact.LINQ {
          this.query.orders.push(new Query.OrderExpression(attribute, orderType));
          return this;
        }

        /** Applies ordering to the LINQ retrieval. */
        /** @param linkedEntities The linked entities. */
        public join(linkedEntities: Query.LinkEntity[] = []): contact.LINQ {
          this.query.linkedEntities = linkedEntities;
          return this;
        }

        /** Applies ordering to the LINQ retrieval. */
        /** @param orders The order expressions. */
        public orderBy(orders: Query.OrderExpression[] = []): contact.LINQ {
          this.query.orders = orders;
          return this;
        }

        /** Applies a top clause to the LINQ retrieval. */
        /** @param top The count. */
        public top(top: number): contact.LINQ {
          this.query.top = top;
          return this;
        }

        /** Selects the supplied columns and executes the LINQ query. */
        /** @param successCallback The function to be called on a successful response. */
        /** @param errorCallback The function to be called on an unsuccessful response. */
        public select(columns: Metadata.AttributeMetadata[] = null, successCallback: (entities: contact[]) => any, errorCallback: (error: Error) => any): JQueryXHR {
          this.query.columnSet = new Query.ColumnSet(columns);
          return Messages.retrieveMultipleQuery(contact, this.query, successCallback, errorCallback);
        }

        /** Applies criteria to the LINQ retrieval. */
        /** @param filterOperator The filter operator. */
        /** @param filters The list of filters. */
        /** @param conditions The list of conditions. */
        public where(filterOperator: Query.LogicalOperator = Query.LogicalOperator.And, filters: Query.FilterExpression[] = [], conditions: Query.ConditionExpression[] = []): contact.LINQ {
          this.query.criteria.filterOperator = filterOperator;
          this.query.criteria.filters = filters;
          this.query.criteria.conditions = conditions;
          return this;
        }
      }
    }
  }

  export module OptionSets {
    export enum contact_accountrolecode {
      DecisionMaker = 1,
      Employee = 2,
      Influencer = 3
    }
    export enum contact_address1_addresstypecode {
      BillTo = 1,
      ShipTo = 2,
      Primary = 3,
      Other = 4
    }
    export enum contact_address1_freighttermscode {
      FOB = 1,
      NoCharge = 2
    }
    export enum contact_address1_shippingmethodcode {
      Airborne = 1,
      DHL = 2,
      FedEx = 3,
      UPS = 4,
      PostalMail = 5,
      FullLoad = 6,
      WillCall = 7
    }
    export enum contact_address2_addresstypecode {
      DefaultValue = 1
    }
    export enum contact_address2_freighttermscode {
      DefaultValue = 1
    }
    export enum contact_address2_shippingmethodcode {
      DefaultValue = 1
    }
    export enum contact_address3_addresstypecode {
      DefaultValue = 1
    }
    export enum contact_address3_freighttermscode {
      DefaultValue = 1
    }
    export enum contact_address3_shippingmethodcode {
      DefaultValue = 1
    }
    export enum contact_creditonhold {
      Yes = 1,
      No = 0
    }
    export enum contact_customersizecode {
      DefaultValue = 1
    }
    export enum contact_customertypecode {
      DefaultValue = 1
    }
    export enum contact_donotbulkemail {
      DoNotAllow = 1,
      Allow = 0
    }
    export enum contact_donotbulkpostalmail {
      Yes = 1,
      No = 0
    }
    export enum contact_donotemail {
      DoNotAllow = 1,
      Allow = 0
    }
    export enum contact_donotfax {
      DoNotAllow = 1,
      Allow = 0
    }
    export enum contact_donotphone {
      DoNotAllow = 1,
      Allow = 0
    }
    export enum contact_donotpostalmail {
      DoNotAllow = 1,
      Allow = 0
    }
    export enum contact_donotsendmm {
      DoNotSend = 1,
      Send = 0
    }
    export enum contact_educationcode {
      DefaultValue = 1
    }
    export enum contact_familystatuscode {
      Single = 1,
      Married = 2,
      Divorced = 3,
      Widowed = 4
    }
    export enum contact_followemail {
      Allow = 1,
      DoNotAllow = 0
    }
    export enum contact_gendercode {
      Male = 1,
      Female = 2
    }
    export enum contact_haschildrencode {
      DefaultValue = 1
    }
    export enum contact_isautocreate {
      Yes = 1,
      No = 0
    }
    export enum contact_isbackofficecustomer {
      Yes = 1,
      No = 0
    }
    export enum contact_isprivate {
      Yes = 1,
      No = 0
    }
    export enum contact_leadsourcecode {
      DefaultValue = 1
    }
    export enum contact_marketingonly {
      Yes = 1,
      No = 0
    }
    export enum contact_merged {
      Yes = 1,
      No = 0
    }
    export enum contact_participatesinworkflow {
      Yes = 1,
      No = 0
    }
    export enum contact_paymenttermscode {
      Net30 = 1,
      _210Net30 = 2,
      Net45 = 3,
      Net60 = 4
    }
    export enum contact_preferredappointmentdaycode {
      Sunday = 0,
      Monday = 1,
      Tuesday = 2,
      Wednesday = 3,
      Thursday = 4,
      Friday = 5,
      Saturday = 6
    }
    export enum contact_preferredappointmenttimecode {
      Morning = 1,
      Afternoon = 2,
      Evening = 3
    }
    export enum contact_preferredcontactmethodcode {
      Any = 1,
      Email = 2,
      Phone = 3,
      Fax = 4,
      Mail = 5
    }
    export enum contact_shippingmethodcode {
      DefaultValue = 1
    }
    export enum contact_statecode {
      Active = 0,
      Inactive = 1
    }
    export enum contact_statuscode {
      Active = 1,
      InForce = 100000002,
      Inactive = 2,
      Matured = 100000000,
      Cancelled = 100000001
    }
    export enum contact_territorycode {
      DefaultValue = 1
    }

  }
}