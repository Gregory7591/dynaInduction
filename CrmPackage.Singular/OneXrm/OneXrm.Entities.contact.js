/// <reference path="OneXrm.ts" />
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var OneXrm;
(function (OneXrm) {
    var Entities;
    (function (Entities) {
        var contact = /** @class */ (function (_super) {
            __extends(contact, _super);
            /** Initializes a new instance of the OneXrm.Entities.contact class. */
            function contact() {
                var _this = _super.call(this, contact.metadata.logicalName) || this;
                _this.entityType = contact;
                return _this;
            }
            Object.defineProperty(contact.prototype, "contactid", {
                get: function () {
                    return this.id;
                },
                set: function (value) {
                    this.id = value;
                },
                enumerable: true,
                configurable: true
            });
            /** Retrieves the contact with the supplied id. */
            /** @param id The id of the contact to retrieve. */
            /** @param columns The columns to retrieve. Supply null to retrieve all columns. */
            /** @param successCallback The function to be called on a successful response. */
            /** @param errorCallback The function to be called on an unsuccessful response. */
            contact.retrieve = function (id, columns, successCallback, errorCallback) {
                if (columns === void 0) { columns = null; }
                return OneXrm.Messages.retrieve(this, id, columns, successCallback, errorCallback);
            };
            /** Retrieves the contact according to the supplied Web API query. */
            /** @param webAPIQuery The Web API query. */
            /** @param successCallback The function to be called on a successful response. */
            /** @param errorCallback The function to be called on an unsuccessful response. */
            contact.retrieveWebAPI = function (webAPIQuery, successCallback, errorCallback) {
                return OneXrm.Messages.retrieveWebAPI(this, webAPIQuery, successCallback, errorCallback);
            };
            /** Retrieves the list of contact records according to the supplied query. */
            /** @param criteria The criteria. */
            /** @param orders The order expressions. */
            /** @param columns The columns to retrieve. Supply null to retrieve all columns. */
            /** @param top The number of records to retrieve. Supply null to retrieve all records. */
            /** @param linkedEntities The linked entities. */
            /** @param successCallback The function to be called on a successful response. */
            /** @param errorCallback The function to be called on an unsuccessful response. */
            contact.retrieveMultiple = function (criteria, orders, columns, top, linkedEntities, successCallback, errorCallback) {
                if (criteria === void 0) { criteria = new OneXrm.Query.FilterExpression(); }
                if (orders === void 0) { orders = []; }
                if (columns === void 0) { columns = null; }
                if (top === void 0) { top = null; }
                if (linkedEntities === void 0) { linkedEntities = []; }
                return OneXrm.Messages.retrieveMultiple(this, criteria, orders, columns, top, linkedEntities, successCallback, errorCallback);
            };
            /** Retrieves the list of contact records according to the supplied query expression. */
            /** @param query The query expression. */
            /** @param successCallback The function to be called on a successful response. */
            /** @param errorCallback The function to be called on an unsuccessful response. */
            contact.retrieveMultipleQuery = function (query, successCallback, errorCallback) {
                return OneXrm.Messages.retrieveMultipleQuery(this, query, successCallback, errorCallback);
            };
            /** Retrieves the list of contact records according to the supplied query expression. */
            /** @param webAPIQuery The Web API query. */
            /** @param successCallback The function to be called on a successful response. */
            /** @param errorCallback The function to be called on an unsuccessful response. */
            contact.retrieveMultipleWebAPI = function (webAPIQuery, successCallback, errorCallback) {
                return OneXrm.Messages.retrieveMultipleWebAPI(this, webAPIQuery, successCallback, errorCallback);
            };
            Object.defineProperty(contact, "linq", {
                /** Starts a new LINQ query. */
                get: function () {
                    return new contact.LINQ();
                },
                enumerable: true,
                configurable: true
            });
            contact.metadata = {
                isCustomEntity: false,
                logicalCollectionName: "contacts",
                logicalName: "contact",
                objectTypeCode: 2,
                primaryIdAttribute: "contactid",
                schemaName: "Contact"
            };
            return contact;
        }(OneXrm.Entity));
        Entities.contact = contact;
        (function (contact) {
            var Attributes = /** @class */ (function () {
                function Attributes() {
                }
                Attributes.accountid = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.Lookup,
                    logicalName: "accountid",
                    schemaName: "AccountId",
                    targets: ["account"]
                };
                Attributes.accountrolecode = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.Picklist,
                    logicalName: "accountrolecode",
                    schemaName: "AccountRoleCode"
                };
                Attributes.address1_addressid = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.Uniqueidentifier,
                    logicalName: "address1_addressid",
                    schemaName: "Address1_AddressId"
                };
                Attributes.address1_addresstypecode = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.Picklist,
                    logicalName: "address1_addresstypecode",
                    schemaName: "Address1_AddressTypeCode"
                };
                Attributes.address1_city = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.String,
                    logicalName: "address1_city",
                    schemaName: "Address1_City"
                };
                Attributes.address1_composite = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.Memo,
                    logicalName: "address1_composite",
                    schemaName: "Address1_Composite"
                };
                Attributes.address1_country = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.String,
                    logicalName: "address1_country",
                    schemaName: "Address1_Country"
                };
                Attributes.address1_county = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.String,
                    logicalName: "address1_county",
                    schemaName: "Address1_County"
                };
                Attributes.address1_fax = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.String,
                    logicalName: "address1_fax",
                    schemaName: "Address1_Fax"
                };
                Attributes.address1_freighttermscode = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.Picklist,
                    logicalName: "address1_freighttermscode",
                    schemaName: "Address1_FreightTermsCode"
                };
                Attributes.address1_latitude = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.Double,
                    logicalName: "address1_latitude",
                    schemaName: "Address1_Latitude"
                };
                Attributes.address1_line1 = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.String,
                    logicalName: "address1_line1",
                    schemaName: "Address1_Line1"
                };
                Attributes.address1_line2 = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.String,
                    logicalName: "address1_line2",
                    schemaName: "Address1_Line2"
                };
                Attributes.address1_line3 = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.String,
                    logicalName: "address1_line3",
                    schemaName: "Address1_Line3"
                };
                Attributes.address1_longitude = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.Double,
                    logicalName: "address1_longitude",
                    schemaName: "Address1_Longitude"
                };
                Attributes.address1_name = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.String,
                    logicalName: "address1_name",
                    schemaName: "Address1_Name"
                };
                Attributes.address1_postalcode = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.String,
                    logicalName: "address1_postalcode",
                    schemaName: "Address1_PostalCode"
                };
                Attributes.address1_postofficebox = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.String,
                    logicalName: "address1_postofficebox",
                    schemaName: "Address1_PostOfficeBox"
                };
                Attributes.address1_primarycontactname = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.String,
                    logicalName: "address1_primarycontactname",
                    schemaName: "Address1_PrimaryContactName"
                };
                Attributes.address1_shippingmethodcode = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.Picklist,
                    logicalName: "address1_shippingmethodcode",
                    schemaName: "Address1_ShippingMethodCode"
                };
                Attributes.address1_stateorprovince = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.String,
                    logicalName: "address1_stateorprovince",
                    schemaName: "Address1_StateOrProvince"
                };
                Attributes.address1_telephone1 = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.String,
                    logicalName: "address1_telephone1",
                    schemaName: "Address1_Telephone1"
                };
                Attributes.address1_telephone2 = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.String,
                    logicalName: "address1_telephone2",
                    schemaName: "Address1_Telephone2"
                };
                Attributes.address1_telephone3 = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.String,
                    logicalName: "address1_telephone3",
                    schemaName: "Address1_Telephone3"
                };
                Attributes.address1_upszone = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.String,
                    logicalName: "address1_upszone",
                    schemaName: "Address1_UPSZone"
                };
                Attributes.address1_utcoffset = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.Integer,
                    logicalName: "address1_utcoffset",
                    schemaName: "Address1_UTCOffset"
                };
                Attributes.address2_addressid = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.Uniqueidentifier,
                    logicalName: "address2_addressid",
                    schemaName: "Address2_AddressId"
                };
                Attributes.address2_addresstypecode = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.Picklist,
                    logicalName: "address2_addresstypecode",
                    schemaName: "Address2_AddressTypeCode"
                };
                Attributes.address2_city = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.String,
                    logicalName: "address2_city",
                    schemaName: "Address2_City"
                };
                Attributes.address2_composite = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.Memo,
                    logicalName: "address2_composite",
                    schemaName: "Address2_Composite"
                };
                Attributes.address2_country = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.String,
                    logicalName: "address2_country",
                    schemaName: "Address2_Country"
                };
                Attributes.address2_county = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.String,
                    logicalName: "address2_county",
                    schemaName: "Address2_County"
                };
                Attributes.address2_fax = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.String,
                    logicalName: "address2_fax",
                    schemaName: "Address2_Fax"
                };
                Attributes.address2_freighttermscode = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.Picklist,
                    logicalName: "address2_freighttermscode",
                    schemaName: "Address2_FreightTermsCode"
                };
                Attributes.address2_latitude = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.Double,
                    logicalName: "address2_latitude",
                    schemaName: "Address2_Latitude"
                };
                Attributes.address2_line1 = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.String,
                    logicalName: "address2_line1",
                    schemaName: "Address2_Line1"
                };
                Attributes.address2_line2 = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.String,
                    logicalName: "address2_line2",
                    schemaName: "Address2_Line2"
                };
                Attributes.address2_line3 = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.String,
                    logicalName: "address2_line3",
                    schemaName: "Address2_Line3"
                };
                Attributes.address2_longitude = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.Double,
                    logicalName: "address2_longitude",
                    schemaName: "Address2_Longitude"
                };
                Attributes.address2_name = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.String,
                    logicalName: "address2_name",
                    schemaName: "Address2_Name"
                };
                Attributes.address2_postalcode = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.String,
                    logicalName: "address2_postalcode",
                    schemaName: "Address2_PostalCode"
                };
                Attributes.address2_postofficebox = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.String,
                    logicalName: "address2_postofficebox",
                    schemaName: "Address2_PostOfficeBox"
                };
                Attributes.address2_primarycontactname = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.String,
                    logicalName: "address2_primarycontactname",
                    schemaName: "Address2_PrimaryContactName"
                };
                Attributes.address2_shippingmethodcode = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.Picklist,
                    logicalName: "address2_shippingmethodcode",
                    schemaName: "Address2_ShippingMethodCode"
                };
                Attributes.address2_stateorprovince = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.String,
                    logicalName: "address2_stateorprovince",
                    schemaName: "Address2_StateOrProvince"
                };
                Attributes.address2_telephone1 = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.String,
                    logicalName: "address2_telephone1",
                    schemaName: "Address2_Telephone1"
                };
                Attributes.address2_telephone2 = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.String,
                    logicalName: "address2_telephone2",
                    schemaName: "Address2_Telephone2"
                };
                Attributes.address2_telephone3 = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.String,
                    logicalName: "address2_telephone3",
                    schemaName: "Address2_Telephone3"
                };
                Attributes.address2_upszone = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.String,
                    logicalName: "address2_upszone",
                    schemaName: "Address2_UPSZone"
                };
                Attributes.address2_utcoffset = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.Integer,
                    logicalName: "address2_utcoffset",
                    schemaName: "Address2_UTCOffset"
                };
                Attributes.address3_addressid = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.Uniqueidentifier,
                    logicalName: "address3_addressid",
                    schemaName: "Address3_AddressId"
                };
                Attributes.address3_addresstypecode = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.Picklist,
                    logicalName: "address3_addresstypecode",
                    schemaName: "Address3_AddressTypeCode"
                };
                Attributes.address3_city = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.String,
                    logicalName: "address3_city",
                    schemaName: "Address3_City"
                };
                Attributes.address3_composite = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.Memo,
                    logicalName: "address3_composite",
                    schemaName: "Address3_Composite"
                };
                Attributes.address3_country = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.String,
                    logicalName: "address3_country",
                    schemaName: "Address3_Country"
                };
                Attributes.address3_county = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.String,
                    logicalName: "address3_county",
                    schemaName: "Address3_County"
                };
                Attributes.address3_fax = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.String,
                    logicalName: "address3_fax",
                    schemaName: "Address3_Fax"
                };
                Attributes.address3_freighttermscode = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.Picklist,
                    logicalName: "address3_freighttermscode",
                    schemaName: "Address3_FreightTermsCode"
                };
                Attributes.address3_latitude = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.Double,
                    logicalName: "address3_latitude",
                    schemaName: "Address3_Latitude"
                };
                Attributes.address3_line1 = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.String,
                    logicalName: "address3_line1",
                    schemaName: "Address3_Line1"
                };
                Attributes.address3_line2 = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.String,
                    logicalName: "address3_line2",
                    schemaName: "Address3_Line2"
                };
                Attributes.address3_line3 = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.String,
                    logicalName: "address3_line3",
                    schemaName: "Address3_Line3"
                };
                Attributes.address3_longitude = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.Double,
                    logicalName: "address3_longitude",
                    schemaName: "Address3_Longitude"
                };
                Attributes.address3_name = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.String,
                    logicalName: "address3_name",
                    schemaName: "Address3_Name"
                };
                Attributes.address3_postalcode = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.String,
                    logicalName: "address3_postalcode",
                    schemaName: "Address3_PostalCode"
                };
                Attributes.address3_postofficebox = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.String,
                    logicalName: "address3_postofficebox",
                    schemaName: "Address3_PostOfficeBox"
                };
                Attributes.address3_primarycontactname = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.String,
                    logicalName: "address3_primarycontactname",
                    schemaName: "Address3_PrimaryContactName"
                };
                Attributes.address3_shippingmethodcode = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.Picklist,
                    logicalName: "address3_shippingmethodcode",
                    schemaName: "Address3_ShippingMethodCode"
                };
                Attributes.address3_stateorprovince = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.String,
                    logicalName: "address3_stateorprovince",
                    schemaName: "Address3_StateOrProvince"
                };
                Attributes.address3_telephone1 = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.String,
                    logicalName: "address3_telephone1",
                    schemaName: "Address3_Telephone1"
                };
                Attributes.address3_telephone2 = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.String,
                    logicalName: "address3_telephone2",
                    schemaName: "Address3_Telephone2"
                };
                Attributes.address3_telephone3 = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.String,
                    logicalName: "address3_telephone3",
                    schemaName: "Address3_Telephone3"
                };
                Attributes.address3_upszone = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.String,
                    logicalName: "address3_upszone",
                    schemaName: "Address3_UPSZone"
                };
                Attributes.address3_utcoffset = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.Integer,
                    logicalName: "address3_utcoffset",
                    schemaName: "Address3_UTCOffset"
                };
                Attributes.aging30 = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.Money,
                    logicalName: "aging30",
                    schemaName: "Aging30"
                };
                Attributes.aging60 = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.Money,
                    logicalName: "aging60",
                    schemaName: "Aging60"
                };
                Attributes.aging90 = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.Money,
                    logicalName: "aging90",
                    schemaName: "Aging90"
                };
                Attributes.anniversary = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.DateTime,
                    logicalName: "anniversary",
                    schemaName: "Anniversary"
                };
                Attributes.annualincome = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.Money,
                    logicalName: "annualincome",
                    schemaName: "AnnualIncome"
                };
                Attributes.assistantname = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.String,
                    logicalName: "assistantname",
                    schemaName: "AssistantName"
                };
                Attributes.assistantphone = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.String,
                    logicalName: "assistantphone",
                    schemaName: "AssistantPhone"
                };
                Attributes.birthdate = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.DateTime,
                    logicalName: "birthdate",
                    schemaName: "BirthDate"
                };
                Attributes.business2 = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.String,
                    logicalName: "business2",
                    schemaName: "Business2"
                };
                Attributes.callback = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.String,
                    logicalName: "callback",
                    schemaName: "Callback"
                };
                Attributes.childrensnames = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.String,
                    logicalName: "childrensnames",
                    schemaName: "ChildrensNames"
                };
                Attributes.company = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.String,
                    logicalName: "company",
                    schemaName: "Company"
                };
                Attributes.contactid = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.Uniqueidentifier,
                    logicalName: "contactid",
                    schemaName: "ContactId"
                };
                Attributes.createdby = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.Lookup,
                    logicalName: "createdby",
                    schemaName: "CreatedBy",
                    targets: ["systemuser"]
                };
                Attributes.createdbyexternalparty = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.Lookup,
                    logicalName: "createdbyexternalparty",
                    schemaName: "CreatedByExternalParty",
                    targets: ["externalparty"]
                };
                Attributes.createdon = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.DateTime,
                    logicalName: "createdon",
                    schemaName: "CreatedOn"
                };
                Attributes.createdonbehalfby = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.Lookup,
                    logicalName: "createdonbehalfby",
                    schemaName: "CreatedOnBehalfBy",
                    targets: ["systemuser"]
                };
                Attributes.creditlimit = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.Money,
                    logicalName: "creditlimit",
                    schemaName: "CreditLimit"
                };
                Attributes.creditonhold = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.Boolean,
                    logicalName: "creditonhold",
                    schemaName: "CreditOnHold"
                };
                Attributes.customersizecode = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.Picklist,
                    logicalName: "customersizecode",
                    schemaName: "CustomerSizeCode"
                };
                Attributes.customertypecode = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.Picklist,
                    logicalName: "customertypecode",
                    schemaName: "CustomerTypeCode"
                };
                Attributes.defaultpricelevelid = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.Lookup,
                    logicalName: "defaultpricelevelid",
                    schemaName: "DefaultPriceLevelId",
                    targets: ["pricelevel"]
                };
                Attributes.department = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.String,
                    logicalName: "department",
                    schemaName: "Department"
                };
                Attributes.description = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.Memo,
                    logicalName: "description",
                    schemaName: "Description"
                };
                Attributes.di_age = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.Integer,
                    logicalName: "di_age",
                    schemaName: "di_age"
                };
                Attributes.di_dateofbirth = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.DateTime,
                    logicalName: "di_dateofbirth",
                    schemaName: "di_dateofBirth"
                };
                Attributes.di_esitimatedreturnfinal = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.Decimal,
                    logicalName: "di_esitimatedreturnfinal",
                    schemaName: "di_EsitimatedReturnFinal"
                };
                Attributes.di_estimated_return = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.String,
                    logicalName: "di_estimated_return",
                    schemaName: "di_estimated_Return"
                };
                Attributes.di_interest_rate = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.Decimal,
                    logicalName: "di_interest_rate",
                    schemaName: "di_interest_rate"
                };
                Attributes.di_intial_investment = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.Money,
                    logicalName: "di_intial_investment",
                    schemaName: "di_Intial_Investment"
                };
                Attributes.di_intialinvesmentfinal = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.Decimal,
                    logicalName: "di_intialinvesmentfinal",
                    schemaName: "di_IntialInvesmentFinal"
                };
                Attributes.di_investmentperiod = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.Integer,
                    logicalName: "di_investmentperiod",
                    schemaName: "di_InvestmentPeriod"
                };
                Attributes.di_joining_date = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.DateTime,
                    logicalName: "di_joining_date",
                    schemaName: "di_joining_date"
                };
                Attributes.di_maturity_date = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.DateTime,
                    logicalName: "di_maturity_date",
                    schemaName: "di_maturity_date"
                };
                Attributes.donotbulkemail = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.Boolean,
                    logicalName: "donotbulkemail",
                    schemaName: "DoNotBulkEMail"
                };
                Attributes.donotbulkpostalmail = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.Boolean,
                    logicalName: "donotbulkpostalmail",
                    schemaName: "DoNotBulkPostalMail"
                };
                Attributes.donotemail = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.Boolean,
                    logicalName: "donotemail",
                    schemaName: "DoNotEMail"
                };
                Attributes.donotfax = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.Boolean,
                    logicalName: "donotfax",
                    schemaName: "DoNotFax"
                };
                Attributes.donotphone = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.Boolean,
                    logicalName: "donotphone",
                    schemaName: "DoNotPhone"
                };
                Attributes.donotpostalmail = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.Boolean,
                    logicalName: "donotpostalmail",
                    schemaName: "DoNotPostalMail"
                };
                Attributes.donotsendmm = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.Boolean,
                    logicalName: "donotsendmm",
                    schemaName: "DoNotSendMM"
                };
                Attributes.educationcode = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.Picklist,
                    logicalName: "educationcode",
                    schemaName: "EducationCode"
                };
                Attributes.emailaddress1 = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.String,
                    logicalName: "emailaddress1",
                    schemaName: "EMailAddress1"
                };
                Attributes.emailaddress2 = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.String,
                    logicalName: "emailaddress2",
                    schemaName: "EMailAddress2"
                };
                Attributes.emailaddress3 = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.String,
                    logicalName: "emailaddress3",
                    schemaName: "EMailAddress3"
                };
                Attributes.employeeid = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.String,
                    logicalName: "employeeid",
                    schemaName: "EmployeeId"
                };
                Attributes.entityimageid = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.Uniqueidentifier,
                    logicalName: "entityimageid",
                    schemaName: "EntityImageId"
                };
                Attributes.exchangerate = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.Decimal,
                    logicalName: "exchangerate",
                    schemaName: "ExchangeRate"
                };
                Attributes.externaluseridentifier = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.String,
                    logicalName: "externaluseridentifier",
                    schemaName: "ExternalUserIdentifier"
                };
                Attributes.familystatuscode = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.Picklist,
                    logicalName: "familystatuscode",
                    schemaName: "FamilyStatusCode"
                };
                Attributes.fax = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.String,
                    logicalName: "fax",
                    schemaName: "Fax"
                };
                Attributes.firstname = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.String,
                    logicalName: "firstname",
                    schemaName: "FirstName"
                };
                Attributes.followemail = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.Boolean,
                    logicalName: "followemail",
                    schemaName: "FollowEmail"
                };
                Attributes.ftpsiteurl = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.String,
                    logicalName: "ftpsiteurl",
                    schemaName: "FtpSiteUrl"
                };
                Attributes.fullname = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.String,
                    logicalName: "fullname",
                    schemaName: "FullName"
                };
                Attributes.gendercode = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.Picklist,
                    logicalName: "gendercode",
                    schemaName: "GenderCode"
                };
                Attributes.governmentid = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.String,
                    logicalName: "governmentid",
                    schemaName: "GovernmentId"
                };
                Attributes.haschildrencode = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.Picklist,
                    logicalName: "haschildrencode",
                    schemaName: "HasChildrenCode"
                };
                Attributes.home2 = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.String,
                    logicalName: "home2",
                    schemaName: "Home2"
                };
                Attributes.importsequencenumber = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.Integer,
                    logicalName: "importsequencenumber",
                    schemaName: "ImportSequenceNumber"
                };
                Attributes.isautocreate = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.Boolean,
                    logicalName: "isautocreate",
                    schemaName: "IsAutoCreate"
                };
                Attributes.isbackofficecustomer = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.Boolean,
                    logicalName: "isbackofficecustomer",
                    schemaName: "IsBackofficeCustomer"
                };
                Attributes.isprivate = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.Boolean,
                    logicalName: "isprivate",
                    schemaName: "IsPrivate"
                };
                Attributes.jobtitle = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.String,
                    logicalName: "jobtitle",
                    schemaName: "JobTitle"
                };
                Attributes.lastname = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.String,
                    logicalName: "lastname",
                    schemaName: "LastName"
                };
                Attributes.lastonholdtime = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.DateTime,
                    logicalName: "lastonholdtime",
                    schemaName: "LastOnHoldTime"
                };
                Attributes.lastusedincampaign = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.DateTime,
                    logicalName: "lastusedincampaign",
                    schemaName: "LastUsedInCampaign"
                };
                Attributes.leadsourcecode = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.Picklist,
                    logicalName: "leadsourcecode",
                    schemaName: "LeadSourceCode"
                };
                Attributes.managername = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.String,
                    logicalName: "managername",
                    schemaName: "ManagerName"
                };
                Attributes.managerphone = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.String,
                    logicalName: "managerphone",
                    schemaName: "ManagerPhone"
                };
                Attributes.marketingonly = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.Boolean,
                    logicalName: "marketingonly",
                    schemaName: "MarketingOnly"
                };
                Attributes.masterid = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.Lookup,
                    logicalName: "masterid",
                    schemaName: "MasterId",
                    targets: ["contact"]
                };
                Attributes.merged = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.Boolean,
                    logicalName: "merged",
                    schemaName: "Merged"
                };
                Attributes.middlename = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.String,
                    logicalName: "middlename",
                    schemaName: "MiddleName"
                };
                Attributes.mobilephone = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.String,
                    logicalName: "mobilephone",
                    schemaName: "MobilePhone"
                };
                Attributes.modifiedby = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.Lookup,
                    logicalName: "modifiedby",
                    schemaName: "ModifiedBy",
                    targets: ["systemuser"]
                };
                Attributes.modifiedbyexternalparty = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.Lookup,
                    logicalName: "modifiedbyexternalparty",
                    schemaName: "ModifiedByExternalParty",
                    targets: ["externalparty"]
                };
                Attributes.modifiedon = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.DateTime,
                    logicalName: "modifiedon",
                    schemaName: "ModifiedOn"
                };
                Attributes.modifiedonbehalfby = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.Lookup,
                    logicalName: "modifiedonbehalfby",
                    schemaName: "ModifiedOnBehalfBy",
                    targets: ["systemuser"]
                };
                Attributes.nickname = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.String,
                    logicalName: "nickname",
                    schemaName: "NickName"
                };
                Attributes.numberofchildren = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.Integer,
                    logicalName: "numberofchildren",
                    schemaName: "NumberOfChildren"
                };
                Attributes.onholdtime = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.Integer,
                    logicalName: "onholdtime",
                    schemaName: "OnHoldTime"
                };
                Attributes.originatingleadid = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.Lookup,
                    logicalName: "originatingleadid",
                    schemaName: "OriginatingLeadId",
                    targets: ["lead"]
                };
                Attributes.overriddencreatedon = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.DateTime,
                    logicalName: "overriddencreatedon",
                    schemaName: "OverriddenCreatedOn"
                };
                Attributes.ownerid = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.Owner,
                    logicalName: "ownerid",
                    schemaName: "OwnerId"
                };
                Attributes.owningbusinessunit = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.Lookup,
                    logicalName: "owningbusinessunit",
                    schemaName: "OwningBusinessUnit",
                    targets: ["businessunit"]
                };
                Attributes.owningteam = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.Lookup,
                    logicalName: "owningteam",
                    schemaName: "OwningTeam",
                    targets: ["team"]
                };
                Attributes.owninguser = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.Lookup,
                    logicalName: "owninguser",
                    schemaName: "OwningUser",
                    targets: ["systemuser"]
                };
                Attributes.pager = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.String,
                    logicalName: "pager",
                    schemaName: "Pager"
                };
                Attributes.parentcontactid = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.Lookup,
                    logicalName: "parentcontactid",
                    schemaName: "ParentContactId",
                    targets: ["contact"]
                };
                Attributes.parentcustomerid = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.Customer,
                    logicalName: "parentcustomerid",
                    schemaName: "ParentCustomerId"
                };
                Attributes.participatesinworkflow = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.Boolean,
                    logicalName: "participatesinworkflow",
                    schemaName: "ParticipatesInWorkflow"
                };
                Attributes.paymenttermscode = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.Picklist,
                    logicalName: "paymenttermscode",
                    schemaName: "PaymentTermsCode"
                };
                Attributes.preferredappointmentdaycode = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.Picklist,
                    logicalName: "preferredappointmentdaycode",
                    schemaName: "PreferredAppointmentDayCode"
                };
                Attributes.preferredappointmenttimecode = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.Picklist,
                    logicalName: "preferredappointmenttimecode",
                    schemaName: "PreferredAppointmentTimeCode"
                };
                Attributes.preferredcontactmethodcode = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.Picklist,
                    logicalName: "preferredcontactmethodcode",
                    schemaName: "PreferredContactMethodCode"
                };
                Attributes.preferredequipmentid = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.Lookup,
                    logicalName: "preferredequipmentid",
                    schemaName: "PreferredEquipmentId",
                    targets: ["equipment"]
                };
                Attributes.preferredserviceid = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.Lookup,
                    logicalName: "preferredserviceid",
                    schemaName: "PreferredServiceId",
                    targets: ["service"]
                };
                Attributes.preferredsystemuserid = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.Lookup,
                    logicalName: "preferredsystemuserid",
                    schemaName: "PreferredSystemUserId",
                    targets: ["systemuser"]
                };
                Attributes.processid = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.Uniqueidentifier,
                    logicalName: "processid",
                    schemaName: "ProcessId"
                };
                Attributes.salutation = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.String,
                    logicalName: "salutation",
                    schemaName: "Salutation"
                };
                Attributes.shippingmethodcode = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.Picklist,
                    logicalName: "shippingmethodcode",
                    schemaName: "ShippingMethodCode"
                };
                Attributes.slaid = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.Lookup,
                    logicalName: "slaid",
                    schemaName: "SLAId",
                    targets: ["sla"]
                };
                Attributes.slainvokedid = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.Lookup,
                    logicalName: "slainvokedid",
                    schemaName: "SLAInvokedId",
                    targets: ["sla"]
                };
                Attributes.spousesname = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.String,
                    logicalName: "spousesname",
                    schemaName: "SpousesName"
                };
                Attributes.stageid = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.Uniqueidentifier,
                    logicalName: "stageid",
                    schemaName: "StageId"
                };
                Attributes.statecode = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.State,
                    logicalName: "statecode",
                    schemaName: "StateCode"
                };
                Attributes.statuscode = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.Status,
                    logicalName: "statuscode",
                    schemaName: "StatusCode"
                };
                Attributes.subscriptionid = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.Uniqueidentifier,
                    logicalName: "subscriptionid",
                    schemaName: "SubscriptionId"
                };
                Attributes.suffix = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.String,
                    logicalName: "suffix",
                    schemaName: "Suffix"
                };
                Attributes.telephone1 = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.String,
                    logicalName: "telephone1",
                    schemaName: "Telephone1"
                };
                Attributes.telephone2 = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.String,
                    logicalName: "telephone2",
                    schemaName: "Telephone2"
                };
                Attributes.telephone3 = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.String,
                    logicalName: "telephone3",
                    schemaName: "Telephone3"
                };
                Attributes.territorycode = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.Picklist,
                    logicalName: "territorycode",
                    schemaName: "TerritoryCode"
                };
                Attributes.timespentbymeonemailandmeetings = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.String,
                    logicalName: "timespentbymeonemailandmeetings",
                    schemaName: "TimeSpentByMeOnEmailAndMeetings"
                };
                Attributes.timezoneruleversionnumber = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.Integer,
                    logicalName: "timezoneruleversionnumber",
                    schemaName: "TimeZoneRuleVersionNumber"
                };
                Attributes.transactioncurrencyid = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.Lookup,
                    logicalName: "transactioncurrencyid",
                    schemaName: "TransactionCurrencyId",
                    targets: ["transactioncurrency"]
                };
                Attributes.traversedpath = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.String,
                    logicalName: "traversedpath",
                    schemaName: "TraversedPath"
                };
                Attributes.utcconversiontimezonecode = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.Integer,
                    logicalName: "utcconversiontimezonecode",
                    schemaName: "UTCConversionTimeZoneCode"
                };
                Attributes.versionnumber = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.BigInt,
                    logicalName: "versionnumber",
                    schemaName: "VersionNumber"
                };
                Attributes.websiteurl = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.String,
                    logicalName: "websiteurl",
                    schemaName: "WebSiteUrl"
                };
                Attributes.yomifirstname = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.String,
                    logicalName: "yomifirstname",
                    schemaName: "YomiFirstName"
                };
                Attributes.yomifullname = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.String,
                    logicalName: "yomifullname",
                    schemaName: "YomiFullName"
                };
                Attributes.yomilastname = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.String,
                    logicalName: "yomilastname",
                    schemaName: "YomiLastName"
                };
                Attributes.yomimiddlename = {
                    attributeType: OneXrm.Metadata.AttributeTypeCode.String,
                    logicalName: "yomimiddlename",
                    schemaName: "YomiMiddleName"
                };
                return Attributes;
            }());
            contact.Attributes = Attributes;
            var LINQ = /** @class */ (function () {
                /** Initializes a new instance of the Entities.contact.LINQ class. */
                function LINQ() {
                    this.query = new OneXrm.Query.QueryExpression(contact);
                }
                /** Appends a condition expression to the query's criteria conditions. */
                /** @param attribute The attribute. */
                /** @param conditionOperator The condition operator. */
                /** @param values The value(s). */
                LINQ.prototype.addCondition = function (attribute, conditionOperator, values) {
                    if (values === void 0) { values = []; }
                    this.query.criteria.conditions.push(new OneXrm.Query.ConditionExpression(attribute, conditionOperator, values));
                    return this;
                };
                /** Appends an order expression to the query's orders. */
                /** @param attribute The attribute. */
                /** @param orderType The order type. Defaults to OneXrm.Query.OrderType.Ascending. */
                LINQ.prototype.addOrder = function (attribute, orderType) {
                    if (orderType === void 0) { orderType = OneXrm.Query.OrderType.Ascending; }
                    this.query.orders.push(new OneXrm.Query.OrderExpression(attribute, orderType));
                    return this;
                };
                /** Applies ordering to the LINQ retrieval. */
                /** @param linkedEntities The linked entities. */
                LINQ.prototype.join = function (linkedEntities) {
                    if (linkedEntities === void 0) { linkedEntities = []; }
                    this.query.linkedEntities = linkedEntities;
                    return this;
                };
                /** Applies ordering to the LINQ retrieval. */
                /** @param orders The order expressions. */
                LINQ.prototype.orderBy = function (orders) {
                    if (orders === void 0) { orders = []; }
                    this.query.orders = orders;
                    return this;
                };
                /** Applies a top clause to the LINQ retrieval. */
                /** @param top The count. */
                LINQ.prototype.top = function (top) {
                    this.query.top = top;
                    return this;
                };
                /** Selects the supplied columns and executes the LINQ query. */
                /** @param successCallback The function to be called on a successful response. */
                /** @param errorCallback The function to be called on an unsuccessful response. */
                LINQ.prototype.select = function (columns, successCallback, errorCallback) {
                    if (columns === void 0) { columns = null; }
                    this.query.columnSet = new OneXrm.Query.ColumnSet(columns);
                    return OneXrm.Messages.retrieveMultipleQuery(contact, this.query, successCallback, errorCallback);
                };
                /** Applies criteria to the LINQ retrieval. */
                /** @param filterOperator The filter operator. */
                /** @param filters The list of filters. */
                /** @param conditions The list of conditions. */
                LINQ.prototype.where = function (filterOperator, filters, conditions) {
                    if (filterOperator === void 0) { filterOperator = OneXrm.Query.LogicalOperator.And; }
                    if (filters === void 0) { filters = []; }
                    if (conditions === void 0) { conditions = []; }
                    this.query.criteria.filterOperator = filterOperator;
                    this.query.criteria.filters = filters;
                    this.query.criteria.conditions = conditions;
                    return this;
                };
                return LINQ;
            }());
            contact.LINQ = LINQ;
        })(contact = Entities.contact || (Entities.contact = {}));
    })(Entities = OneXrm.Entities || (OneXrm.Entities = {}));
    var OptionSets;
    (function (OptionSets) {
        var contact_accountrolecode;
        (function (contact_accountrolecode) {
            contact_accountrolecode[contact_accountrolecode["DecisionMaker"] = 1] = "DecisionMaker";
            contact_accountrolecode[contact_accountrolecode["Employee"] = 2] = "Employee";
            contact_accountrolecode[contact_accountrolecode["Influencer"] = 3] = "Influencer";
        })(contact_accountrolecode = OptionSets.contact_accountrolecode || (OptionSets.contact_accountrolecode = {}));
        var contact_address1_addresstypecode;
        (function (contact_address1_addresstypecode) {
            contact_address1_addresstypecode[contact_address1_addresstypecode["BillTo"] = 1] = "BillTo";
            contact_address1_addresstypecode[contact_address1_addresstypecode["ShipTo"] = 2] = "ShipTo";
            contact_address1_addresstypecode[contact_address1_addresstypecode["Primary"] = 3] = "Primary";
            contact_address1_addresstypecode[contact_address1_addresstypecode["Other"] = 4] = "Other";
        })(contact_address1_addresstypecode = OptionSets.contact_address1_addresstypecode || (OptionSets.contact_address1_addresstypecode = {}));
        var contact_address1_freighttermscode;
        (function (contact_address1_freighttermscode) {
            contact_address1_freighttermscode[contact_address1_freighttermscode["FOB"] = 1] = "FOB";
            contact_address1_freighttermscode[contact_address1_freighttermscode["NoCharge"] = 2] = "NoCharge";
        })(contact_address1_freighttermscode = OptionSets.contact_address1_freighttermscode || (OptionSets.contact_address1_freighttermscode = {}));
        var contact_address1_shippingmethodcode;
        (function (contact_address1_shippingmethodcode) {
            contact_address1_shippingmethodcode[contact_address1_shippingmethodcode["Airborne"] = 1] = "Airborne";
            contact_address1_shippingmethodcode[contact_address1_shippingmethodcode["DHL"] = 2] = "DHL";
            contact_address1_shippingmethodcode[contact_address1_shippingmethodcode["FedEx"] = 3] = "FedEx";
            contact_address1_shippingmethodcode[contact_address1_shippingmethodcode["UPS"] = 4] = "UPS";
            contact_address1_shippingmethodcode[contact_address1_shippingmethodcode["PostalMail"] = 5] = "PostalMail";
            contact_address1_shippingmethodcode[contact_address1_shippingmethodcode["FullLoad"] = 6] = "FullLoad";
            contact_address1_shippingmethodcode[contact_address1_shippingmethodcode["WillCall"] = 7] = "WillCall";
        })(contact_address1_shippingmethodcode = OptionSets.contact_address1_shippingmethodcode || (OptionSets.contact_address1_shippingmethodcode = {}));
        var contact_address2_addresstypecode;
        (function (contact_address2_addresstypecode) {
            contact_address2_addresstypecode[contact_address2_addresstypecode["DefaultValue"] = 1] = "DefaultValue";
        })(contact_address2_addresstypecode = OptionSets.contact_address2_addresstypecode || (OptionSets.contact_address2_addresstypecode = {}));
        var contact_address2_freighttermscode;
        (function (contact_address2_freighttermscode) {
            contact_address2_freighttermscode[contact_address2_freighttermscode["DefaultValue"] = 1] = "DefaultValue";
        })(contact_address2_freighttermscode = OptionSets.contact_address2_freighttermscode || (OptionSets.contact_address2_freighttermscode = {}));
        var contact_address2_shippingmethodcode;
        (function (contact_address2_shippingmethodcode) {
            contact_address2_shippingmethodcode[contact_address2_shippingmethodcode["DefaultValue"] = 1] = "DefaultValue";
        })(contact_address2_shippingmethodcode = OptionSets.contact_address2_shippingmethodcode || (OptionSets.contact_address2_shippingmethodcode = {}));
        var contact_address3_addresstypecode;
        (function (contact_address3_addresstypecode) {
            contact_address3_addresstypecode[contact_address3_addresstypecode["DefaultValue"] = 1] = "DefaultValue";
        })(contact_address3_addresstypecode = OptionSets.contact_address3_addresstypecode || (OptionSets.contact_address3_addresstypecode = {}));
        var contact_address3_freighttermscode;
        (function (contact_address3_freighttermscode) {
            contact_address3_freighttermscode[contact_address3_freighttermscode["DefaultValue"] = 1] = "DefaultValue";
        })(contact_address3_freighttermscode = OptionSets.contact_address3_freighttermscode || (OptionSets.contact_address3_freighttermscode = {}));
        var contact_address3_shippingmethodcode;
        (function (contact_address3_shippingmethodcode) {
            contact_address3_shippingmethodcode[contact_address3_shippingmethodcode["DefaultValue"] = 1] = "DefaultValue";
        })(contact_address3_shippingmethodcode = OptionSets.contact_address3_shippingmethodcode || (OptionSets.contact_address3_shippingmethodcode = {}));
        var contact_creditonhold;
        (function (contact_creditonhold) {
            contact_creditonhold[contact_creditonhold["Yes"] = 1] = "Yes";
            contact_creditonhold[contact_creditonhold["No"] = 0] = "No";
        })(contact_creditonhold = OptionSets.contact_creditonhold || (OptionSets.contact_creditonhold = {}));
        var contact_customersizecode;
        (function (contact_customersizecode) {
            contact_customersizecode[contact_customersizecode["DefaultValue"] = 1] = "DefaultValue";
        })(contact_customersizecode = OptionSets.contact_customersizecode || (OptionSets.contact_customersizecode = {}));
        var contact_customertypecode;
        (function (contact_customertypecode) {
            contact_customertypecode[contact_customertypecode["DefaultValue"] = 1] = "DefaultValue";
        })(contact_customertypecode = OptionSets.contact_customertypecode || (OptionSets.contact_customertypecode = {}));
        var contact_donotbulkemail;
        (function (contact_donotbulkemail) {
            contact_donotbulkemail[contact_donotbulkemail["DoNotAllow"] = 1] = "DoNotAllow";
            contact_donotbulkemail[contact_donotbulkemail["Allow"] = 0] = "Allow";
        })(contact_donotbulkemail = OptionSets.contact_donotbulkemail || (OptionSets.contact_donotbulkemail = {}));
        var contact_donotbulkpostalmail;
        (function (contact_donotbulkpostalmail) {
            contact_donotbulkpostalmail[contact_donotbulkpostalmail["Yes"] = 1] = "Yes";
            contact_donotbulkpostalmail[contact_donotbulkpostalmail["No"] = 0] = "No";
        })(contact_donotbulkpostalmail = OptionSets.contact_donotbulkpostalmail || (OptionSets.contact_donotbulkpostalmail = {}));
        var contact_donotemail;
        (function (contact_donotemail) {
            contact_donotemail[contact_donotemail["DoNotAllow"] = 1] = "DoNotAllow";
            contact_donotemail[contact_donotemail["Allow"] = 0] = "Allow";
        })(contact_donotemail = OptionSets.contact_donotemail || (OptionSets.contact_donotemail = {}));
        var contact_donotfax;
        (function (contact_donotfax) {
            contact_donotfax[contact_donotfax["DoNotAllow"] = 1] = "DoNotAllow";
            contact_donotfax[contact_donotfax["Allow"] = 0] = "Allow";
        })(contact_donotfax = OptionSets.contact_donotfax || (OptionSets.contact_donotfax = {}));
        var contact_donotphone;
        (function (contact_donotphone) {
            contact_donotphone[contact_donotphone["DoNotAllow"] = 1] = "DoNotAllow";
            contact_donotphone[contact_donotphone["Allow"] = 0] = "Allow";
        })(contact_donotphone = OptionSets.contact_donotphone || (OptionSets.contact_donotphone = {}));
        var contact_donotpostalmail;
        (function (contact_donotpostalmail) {
            contact_donotpostalmail[contact_donotpostalmail["DoNotAllow"] = 1] = "DoNotAllow";
            contact_donotpostalmail[contact_donotpostalmail["Allow"] = 0] = "Allow";
        })(contact_donotpostalmail = OptionSets.contact_donotpostalmail || (OptionSets.contact_donotpostalmail = {}));
        var contact_donotsendmm;
        (function (contact_donotsendmm) {
            contact_donotsendmm[contact_donotsendmm["DoNotSend"] = 1] = "DoNotSend";
            contact_donotsendmm[contact_donotsendmm["Send"] = 0] = "Send";
        })(contact_donotsendmm = OptionSets.contact_donotsendmm || (OptionSets.contact_donotsendmm = {}));
        var contact_educationcode;
        (function (contact_educationcode) {
            contact_educationcode[contact_educationcode["DefaultValue"] = 1] = "DefaultValue";
        })(contact_educationcode = OptionSets.contact_educationcode || (OptionSets.contact_educationcode = {}));
        var contact_familystatuscode;
        (function (contact_familystatuscode) {
            contact_familystatuscode[contact_familystatuscode["Single"] = 1] = "Single";
            contact_familystatuscode[contact_familystatuscode["Married"] = 2] = "Married";
            contact_familystatuscode[contact_familystatuscode["Divorced"] = 3] = "Divorced";
            contact_familystatuscode[contact_familystatuscode["Widowed"] = 4] = "Widowed";
        })(contact_familystatuscode = OptionSets.contact_familystatuscode || (OptionSets.contact_familystatuscode = {}));
        var contact_followemail;
        (function (contact_followemail) {
            contact_followemail[contact_followemail["Allow"] = 1] = "Allow";
            contact_followemail[contact_followemail["DoNotAllow"] = 0] = "DoNotAllow";
        })(contact_followemail = OptionSets.contact_followemail || (OptionSets.contact_followemail = {}));
        var contact_gendercode;
        (function (contact_gendercode) {
            contact_gendercode[contact_gendercode["Male"] = 1] = "Male";
            contact_gendercode[contact_gendercode["Female"] = 2] = "Female";
        })(contact_gendercode = OptionSets.contact_gendercode || (OptionSets.contact_gendercode = {}));
        var contact_haschildrencode;
        (function (contact_haschildrencode) {
            contact_haschildrencode[contact_haschildrencode["DefaultValue"] = 1] = "DefaultValue";
        })(contact_haschildrencode = OptionSets.contact_haschildrencode || (OptionSets.contact_haschildrencode = {}));
        var contact_isautocreate;
        (function (contact_isautocreate) {
            contact_isautocreate[contact_isautocreate["Yes"] = 1] = "Yes";
            contact_isautocreate[contact_isautocreate["No"] = 0] = "No";
        })(contact_isautocreate = OptionSets.contact_isautocreate || (OptionSets.contact_isautocreate = {}));
        var contact_isbackofficecustomer;
        (function (contact_isbackofficecustomer) {
            contact_isbackofficecustomer[contact_isbackofficecustomer["Yes"] = 1] = "Yes";
            contact_isbackofficecustomer[contact_isbackofficecustomer["No"] = 0] = "No";
        })(contact_isbackofficecustomer = OptionSets.contact_isbackofficecustomer || (OptionSets.contact_isbackofficecustomer = {}));
        var contact_isprivate;
        (function (contact_isprivate) {
            contact_isprivate[contact_isprivate["Yes"] = 1] = "Yes";
            contact_isprivate[contact_isprivate["No"] = 0] = "No";
        })(contact_isprivate = OptionSets.contact_isprivate || (OptionSets.contact_isprivate = {}));
        var contact_leadsourcecode;
        (function (contact_leadsourcecode) {
            contact_leadsourcecode[contact_leadsourcecode["DefaultValue"] = 1] = "DefaultValue";
        })(contact_leadsourcecode = OptionSets.contact_leadsourcecode || (OptionSets.contact_leadsourcecode = {}));
        var contact_marketingonly;
        (function (contact_marketingonly) {
            contact_marketingonly[contact_marketingonly["Yes"] = 1] = "Yes";
            contact_marketingonly[contact_marketingonly["No"] = 0] = "No";
        })(contact_marketingonly = OptionSets.contact_marketingonly || (OptionSets.contact_marketingonly = {}));
        var contact_merged;
        (function (contact_merged) {
            contact_merged[contact_merged["Yes"] = 1] = "Yes";
            contact_merged[contact_merged["No"] = 0] = "No";
        })(contact_merged = OptionSets.contact_merged || (OptionSets.contact_merged = {}));
        var contact_participatesinworkflow;
        (function (contact_participatesinworkflow) {
            contact_participatesinworkflow[contact_participatesinworkflow["Yes"] = 1] = "Yes";
            contact_participatesinworkflow[contact_participatesinworkflow["No"] = 0] = "No";
        })(contact_participatesinworkflow = OptionSets.contact_participatesinworkflow || (OptionSets.contact_participatesinworkflow = {}));
        var contact_paymenttermscode;
        (function (contact_paymenttermscode) {
            contact_paymenttermscode[contact_paymenttermscode["Net30"] = 1] = "Net30";
            contact_paymenttermscode[contact_paymenttermscode["_210Net30"] = 2] = "_210Net30";
            contact_paymenttermscode[contact_paymenttermscode["Net45"] = 3] = "Net45";
            contact_paymenttermscode[contact_paymenttermscode["Net60"] = 4] = "Net60";
        })(contact_paymenttermscode = OptionSets.contact_paymenttermscode || (OptionSets.contact_paymenttermscode = {}));
        var contact_preferredappointmentdaycode;
        (function (contact_preferredappointmentdaycode) {
            contact_preferredappointmentdaycode[contact_preferredappointmentdaycode["Sunday"] = 0] = "Sunday";
            contact_preferredappointmentdaycode[contact_preferredappointmentdaycode["Monday"] = 1] = "Monday";
            contact_preferredappointmentdaycode[contact_preferredappointmentdaycode["Tuesday"] = 2] = "Tuesday";
            contact_preferredappointmentdaycode[contact_preferredappointmentdaycode["Wednesday"] = 3] = "Wednesday";
            contact_preferredappointmentdaycode[contact_preferredappointmentdaycode["Thursday"] = 4] = "Thursday";
            contact_preferredappointmentdaycode[contact_preferredappointmentdaycode["Friday"] = 5] = "Friday";
            contact_preferredappointmentdaycode[contact_preferredappointmentdaycode["Saturday"] = 6] = "Saturday";
        })(contact_preferredappointmentdaycode = OptionSets.contact_preferredappointmentdaycode || (OptionSets.contact_preferredappointmentdaycode = {}));
        var contact_preferredappointmenttimecode;
        (function (contact_preferredappointmenttimecode) {
            contact_preferredappointmenttimecode[contact_preferredappointmenttimecode["Morning"] = 1] = "Morning";
            contact_preferredappointmenttimecode[contact_preferredappointmenttimecode["Afternoon"] = 2] = "Afternoon";
            contact_preferredappointmenttimecode[contact_preferredappointmenttimecode["Evening"] = 3] = "Evening";
        })(contact_preferredappointmenttimecode = OptionSets.contact_preferredappointmenttimecode || (OptionSets.contact_preferredappointmenttimecode = {}));
        var contact_preferredcontactmethodcode;
        (function (contact_preferredcontactmethodcode) {
            contact_preferredcontactmethodcode[contact_preferredcontactmethodcode["Any"] = 1] = "Any";
            contact_preferredcontactmethodcode[contact_preferredcontactmethodcode["Email"] = 2] = "Email";
            contact_preferredcontactmethodcode[contact_preferredcontactmethodcode["Phone"] = 3] = "Phone";
            contact_preferredcontactmethodcode[contact_preferredcontactmethodcode["Fax"] = 4] = "Fax";
            contact_preferredcontactmethodcode[contact_preferredcontactmethodcode["Mail"] = 5] = "Mail";
        })(contact_preferredcontactmethodcode = OptionSets.contact_preferredcontactmethodcode || (OptionSets.contact_preferredcontactmethodcode = {}));
        var contact_shippingmethodcode;
        (function (contact_shippingmethodcode) {
            contact_shippingmethodcode[contact_shippingmethodcode["DefaultValue"] = 1] = "DefaultValue";
        })(contact_shippingmethodcode = OptionSets.contact_shippingmethodcode || (OptionSets.contact_shippingmethodcode = {}));
        var contact_statecode;
        (function (contact_statecode) {
            contact_statecode[contact_statecode["Active"] = 0] = "Active";
            contact_statecode[contact_statecode["Inactive"] = 1] = "Inactive";
        })(contact_statecode = OptionSets.contact_statecode || (OptionSets.contact_statecode = {}));
        var contact_statuscode;
        (function (contact_statuscode) {
            contact_statuscode[contact_statuscode["Active"] = 1] = "Active";
            contact_statuscode[contact_statuscode["InForce"] = 100000002] = "InForce";
            contact_statuscode[contact_statuscode["Inactive"] = 2] = "Inactive";
            contact_statuscode[contact_statuscode["Matured"] = 100000000] = "Matured";
            contact_statuscode[contact_statuscode["Cancelled"] = 100000001] = "Cancelled";
        })(contact_statuscode = OptionSets.contact_statuscode || (OptionSets.contact_statuscode = {}));
        var contact_territorycode;
        (function (contact_territorycode) {
            contact_territorycode[contact_territorycode["DefaultValue"] = 1] = "DefaultValue";
        })(contact_territorycode = OptionSets.contact_territorycode || (OptionSets.contact_territorycode = {}));
    })(OptionSets = OneXrm.OptionSets || (OneXrm.OptionSets = {}));
})(OneXrm || (OneXrm = {}));
