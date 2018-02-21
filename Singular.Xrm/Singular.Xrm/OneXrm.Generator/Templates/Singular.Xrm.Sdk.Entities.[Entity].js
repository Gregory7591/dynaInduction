/// <reference path="Singular.Xrm.ts" />
var Singular;
(function (Singular) {
    var Xrm;
    (function (Xrm_1) {
        // Prevent override of the Microsoft Dynamics xRM API Xrm namespace
        var Xrm = window.Xrm;
        var Sdk;
        (function (Sdk) {
            var Entities;
            (function (Entities) {
                var default_1 = (function () {
                    function default_1() {
                    }
                    return default_1;
                }());
                Entities. = default_1;
                Singular.Xrm.Sdk.Entity;
                {
                    entityLogicalName: string = "{LogicalName}";
                    entityTypeCode: number = 1;
                    type = Singular.Xrm.Sdk.Entities.;
                    {
                        SchemaName;
                    }
                    ;
                    /** Initializes a new instance of the Singular.Xrm.Sdk.Entities.{SchemaName} class. */
                    constructor();
                    {
                        _super.call(this, Singular.Xrm.Sdk.Entities., { SchemaName: SchemaName }.entityLogicalName);
                    }
                    get;
                    accountid();
                    {
                        return this.id;
                    }
                    set;
                    accountid(value, string);
                    {
                        this.id = value;
                    }
                    name: string;
                    accountcategorycode: {
                        value: Singular.Xrm.Sdk.Entities.Account.OptionSets.accountcategorycode,
                            name ?  : string;
                    }
                    ;
                    industrycode: {
                        value: Singular.Xrm.Sdk.Entities.Account.OptionSets.industrycode,
                            name ?  : string;
                    }
                    ;
                    primarycontactid: Singular.Xrm.Sdk.EntityReference;
                    marketcap: {
                        value: number,
                            name ?  : string;
                    }
                    ;
                    merged: {
                        value: boolean,
                            name ?  : string;
                    }
                    ;
                    createdon: {
                        value: Date,
                            name ?  : string;
                    }
                    ;
                    transactioncurrencyid: Singular.Xrm.Sdk.EntityReference;
                    ownerid: Singular.Xrm.Sdk.EntityReference;
                    new_testdate: {
                        value: Date,
                            name ?  : string;
                    }
                    ;
                    statecode: {
                        value: Singular.Xrm.Sdk.Entities.Account.OptionSets.statecode,
                            name ?  : string;
                    }
                    ;
                    statuscode: {
                        value: Singular.Xrm.Sdk.Entities.Account.OptionSets.statuscode,
                            name ?  : string;
                    }
                    ;
                    retrieve(id, string, columnSet, Singular.Xrm.Sdk.Query.ColumnSet, successCallback, function (account) { return any; }, errorCallback, function (error) { return any; });
                    {
                        Singular.Xrm.Sdk.Messages.retrieve(this, id, columnSet, successCallback, errorCallback);
                    }
                    retrieveWebAPI(webAPIQuery, string, successCallback, function (account) { return any; }, errorCallback, function (error) { return any; });
                    {
                        Singular.Xrm.Sdk.Messages.retrieveWebAPI(this, webAPIQuery, successCallback, errorCallback);
                    }
                    retrieveMultiple(logicalOperator, Singular.Xrm.Sdk.Query.LogicalOperator, conditions, Singular.Xrm.Sdk.Query.ConditionExpression[], orders, Singular.Xrm.Sdk.Query.OrderExpression[], columnSet, Singular.Xrm.Sdk.Query.ColumnSet, pageInfo, Singular.Xrm.Sdk.Query.PagingInfo, successCallback, function (accounts) { return any; }, errorCallback, function (error) { return any; });
                    {
                        Singular.Xrm.Sdk.Messages.retrieveMultiple(this, logicalOperator, conditions, orders, columnSet, pageInfo, successCallback, errorCallback);
                    }
                    retrieveMultipleQuery(query, Singular.Xrm.Sdk.Query.QueryExpression, successCallback, function (accounts) { return any; }, errorCallback, function (error) { return any; });
                    {
                        Singular.Xrm.Sdk.Messages.retrieveMultipleQuery(this, query, successCallback, errorCallback);
                    }
                    retrieveMultipleWebAPI(webAPIQuery, string, successCallback, function (accounts) { return any; }, errorCallback, function (error) { return any; });
                    {
                        Singular.Xrm.Sdk.Messages.retrieveMultipleWebAPI(this, webAPIQuery, successCallback, errorCallback);
                    }
                }
            })(Entities = Sdk.Entities || (Sdk.Entities = {}));
        })(Sdk = Xrm_1.Sdk || (Xrm_1.Sdk = {}));
    })(Xrm = Singular.Xrm || (Singular.Xrm = {}));
})(Singular || (Singular = {}));
var Singular;
(function (Singular) {
    var Xrm;
    (function (Xrm_2) {
        // Prevent override of the Microsoft Dynamics xRM API Xrm namespace
        var Xrm = window.Xrm;
        var Sdk;
        (function (Sdk) {
            var Entities;
            (function (Entities) {
                var Account;
                (function (Account) {
                    var OptionSets;
                    (function (OptionSets) {
                        (function (accountcategorycode) {
                            accountcategorycode[accountcategorycode["PreferredCustomer"] = 1] = "PreferredCustomer";
                            accountcategorycode[accountcategorycode["Standard"] = 2] = "Standard";
                        })(OptionSets.accountcategorycode || (OptionSets.accountcategorycode = {}));
                        var accountcategorycode = OptionSets.accountcategorycode;
                        (function (industrycode) {
                            industrycode[industrycode["Accounting"] = 1] = "Accounting";
                            industrycode[industrycode["Agriculture"] = 2] = "Agriculture";
                        })(OptionSets.industrycode || (OptionSets.industrycode = {}));
                        var industrycode = OptionSets.industrycode;
                        (function (statecode) {
                            statecode[statecode["Active"] = 0] = "Active";
                            statecode[statecode["Inactive"] = 1] = "Inactive";
                        })(OptionSets.statecode || (OptionSets.statecode = {}));
                        var statecode = OptionSets.statecode;
                        (function (statuscode) {
                            statuscode[statuscode["Active"] = 1] = "Active";
                            statuscode[statuscode["Inactive"] = 2] = "Inactive";
                        })(OptionSets.statuscode || (OptionSets.statuscode = {}));
                        var statuscode = OptionSets.statuscode;
                    })(OptionSets = Account.OptionSets || (Account.OptionSets = {}));
                    var Metadata;
                    (function (Metadata) {
                        var Attributes;
                        (function (Attributes) {
                            Attributes.accountid = {
                                attributeType: Singular.Xrm.Sdk.Metadata.AttributeTypeCode.Uniqueidentifier,
                                logicalName: "accountid"
                            };
                            Attributes.name = {
                                attributeType: Singular.Xrm.Sdk.Metadata.AttributeTypeCode.String,
                                logicalName: "name"
                            };
                            Attributes.accountcategorycode = {
                                attributeType: Singular.Xrm.Sdk.Metadata.AttributeTypeCode.Picklist,
                                logicalName: "accountcategorycode",
                            };
                            Attributes.industrycode = {
                                attributeType: Singular.Xrm.Sdk.Metadata.AttributeTypeCode.Picklist,
                                logicalName: "industrycode"
                            };
                            Attributes.primarycontactid = {
                                attributeType: Singular.Xrm.Sdk.Metadata.AttributeTypeCode.Lookup,
                                logicalName: "primarycontactid"
                            };
                            Attributes.marketcap = {
                                attributeType: Singular.Xrm.Sdk.Metadata.AttributeTypeCode.Money,
                                logicalName: "marketcap"
                            };
                            Attributes.merged = {
                                attributeType: Singular.Xrm.Sdk.Metadata.AttributeTypeCode.Boolean,
                                logicalName: "merged"
                            };
                            Attributes.createdon = {
                                attributeType: Singular.Xrm.Sdk.Metadata.AttributeTypeCode.DateTime,
                                logicalName: "createdon"
                            };
                            Attributes.transactioncurrencyid = {
                                attributeType: Singular.Xrm.Sdk.Metadata.AttributeTypeCode.Lookup,
                                logicalName: "transactioncurrencyid"
                            };
                            Attributes.ownerid = {
                                attributeType: Singular.Xrm.Sdk.Metadata.AttributeTypeCode.Owner,
                                logicalName: "ownerid"
                            };
                            Attributes.new_testdate = {
                                attributeType: Singular.Xrm.Sdk.Metadata.AttributeTypeCode.DateTime,
                                logicalName: "new_testdate"
                            };
                            Attributes.statecode = {
                                attributeType: Singular.Xrm.Sdk.Metadata.AttributeTypeCode.State,
                                logicalName: "statecode"
                            };
                            Attributes.statuscode = {
                                attributeType: Singular.Xrm.Sdk.Metadata.AttributeTypeCode.Status,
                                logicalName: "statuscode"
                            };
                        })(Attributes = Metadata.Attributes || (Metadata.Attributes = {}));
                    })(Metadata = Account.Metadata || (Account.Metadata = {}));
                })(Account = Entities.Account || (Entities.Account = {}));
            })(Entities = Sdk.Entities || (Sdk.Entities = {}));
        })(Sdk = Xrm_2.Sdk || (Xrm_2.Sdk = {}));
    })(Xrm = Singular.Xrm || (Singular.Xrm = {}));
})(Singular || (Singular = {}));
