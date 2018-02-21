/// <reference path="../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../Scripts/typings/linq/linq.d.ts" />
/// <reference path="../Scripts/typings/xrm/xrm.d.ts" />
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
/** Singular Dynamics 365 JavaScript Library Version 8.2 */
var OneXrm;
(function (OneXrm) {
    var MessagesBase = /** @class */ (function () {
        function MessagesBase() {
        }
        /** Converts matching returned JSON objects to correct data types. */
        /** @param key The key. */
        /** @param value The value. */
        MessagesBase.jsonReviver = function (key, value) {
            // Convert dates from strings to Date objects
            switch (typeof value) {
                case "string":
                    var a = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
                    if (a) {
                        return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4], +a[5], +a[6]));
                    }
            }
            return value;
        };
        /** Process a list of retrieved entities to convert to expected format. */
        /** @param type The type of entity. */
        /** @param entities The entities to process. */
        MessagesBase.processRetrievedEntities = function (type, entities) {
            for (var i = 0; i < entities.length; i++) {
                var entity = entities[i];
                var entityNew = new type(type.metadata.logicalName);
                for (var attributeName in type.Attributes) {
                    var attributeMetadata = type.Attributes[attributeName];
                    var value = void 0;
                    switch (attributeMetadata.attributeType) {
                        case Metadata.AttributeTypeCode.Lookup:
                        case Metadata.AttributeTypeCode.Owner:
                            value = entity[["_", attributeMetadata.logicalName, "_value"].join("")];
                            break;
                        default:
                            value = entity[attributeMetadata.logicalName];
                            break;
                    }
                    if (value !== undefined) {
                        if (value === null) {
                            entityNew[attributeMetadata.logicalName] = null;
                        }
                        else {
                            switch (attributeMetadata.attributeType) {
                                case Metadata.AttributeTypeCode.BigInt:
                                case Metadata.AttributeTypeCode.Boolean:
                                case Metadata.AttributeTypeCode.DateTime:
                                case Metadata.AttributeTypeCode.Decimal:
                                case Metadata.AttributeTypeCode.Double:
                                case Metadata.AttributeTypeCode.Integer:
                                case Metadata.AttributeTypeCode.Money:
                                case Metadata.AttributeTypeCode.Picklist:
                                case Metadata.AttributeTypeCode.State:
                                case Metadata.AttributeTypeCode.Status:
                                    entityNew[attributeMetadata.logicalName] = {
                                        value: value,
                                        name: entity[[attributeMetadata.logicalName, "@OData.Community.Display.V1.FormattedValue"].join("")]
                                    };
                                    break;
                                case Metadata.AttributeTypeCode.Lookup:
                                case Metadata.AttributeTypeCode.Owner:
                                    var logicalName = entity[["_", attributeMetadata.logicalName, "_value@Microsoft.Dynamics.CRM.lookuplogicalname"].join("")];
                                    var type_1 = logicalName ? eval(["OneXrm.Entities.", logicalName].join("")) : undefined;
                                    entityNew[attributeMetadata.logicalName] = new EntityReference(value, logicalName, entity[["_", attributeMetadata.logicalName, "_value@OData.Community.Display.V1.FormattedValue"].join("")], type_1);
                                    break;
                                case Metadata.AttributeTypeCode.Memo:
                                case Metadata.AttributeTypeCode.String:
                                case Metadata.AttributeTypeCode.Uniqueidentifier:
                                    entityNew[attributeMetadata.logicalName] = value;
                                    break;
                                case Metadata.AttributeTypeCode.PartyList:
                                    // TODO
                                    break;
                                case Metadata.AttributeTypeCode.Virtual:
                                    entityNew[attributeMetadata.logicalName] = {
                                        value: $.map(value.split(","), function (val) { return parseInt(val, 10); }),
                                        name: $.map(entity[[attributeMetadata.logicalName, "@OData.Community.Display.V1.FormattedValue"].join("")].split(";"), function (val) { return val.trim(); })
                                    };
                                    break;
                                default:
                                    alert(["OneXrm.Messages.processRetrievedEntities: Unhandled attribute type: ", attributeMetadata.attributeType].join(""));
                                    break;
                            }
                        }
                    }
                }
                entities[i] = entityNew;
            }
            return entities;
        };
        return MessagesBase;
    }());
    /** Microsoft.Crm.Sdk.Messages JavaScript equivalent providing access to asynchronous Web API operations */
    var Messages = /** @class */ (function (_super) {
        __extends(Messages, _super);
        function Messages() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /** Query the webAPI. */
        /** @param method The method. */
        /** @param webAPIQuery The Web API query. */
        /** @param data The data. */
        /** @param requestHeaders The request headers. */
        /** @param successCallback The function to be called on a successful response. */
        /** @param errorCallback The function to be called on an unsuccessful response. */
        Messages.queryWebAPI = function (method, webAPIQuery, data, requestHeaders, successCallback, errorCallback) {
            var settings = {
                url: encodeURI([Page.getWebAPIPath(), webAPIQuery].join("")),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                method: method,
                beforeSend: function (request) {
                    if (requestHeaders) {
                        for (var _i = 0, requestHeaders_1 = requestHeaders; _i < requestHeaders_1.length; _i++) {
                            var requestHeader = requestHeaders_1[_i];
                            request.setRequestHeader(requestHeader.header, requestHeader.value);
                        }
                    }
                },
                success: function (data, textStatus, jqXHR) {
                    if (successCallback) {
                        successCallback(data, textStatus, jqXHR);
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    if (errorCallback) {
                        errorCallback(jqXHR, textStatus, errorThrown);
                    }
                }
            };
            if (data) {
                settings.data = data;
            }
            return $.ajax(settings);
        };
        /** Retrieve the entity according to the supplied Web API query. */
        /** @param type The type of entity. */
        /** @param webAPIQuery The Web API query. */
        /** @param successCallback The function to be called on a successful response. */
        /** @param errorCallback The function to be called on an unsuccessful response. */
        Messages.retrieveWebAPI = function (type, webAPIQuery, successCallback, errorCallback) {
            return Messages.queryWebAPI("GET", webAPIQuery, null, [
                { header: "OData-MaxVersion", value: "4.0" },
                { header: "OData-Version", value: "4.0" },
                { header: "Prefer", value: 'odata.include-annotations="*"' }
            ], function (data, textStatus, jqXHR) {
                if (successCallback) {
                    successCallback(Messages.processRetrievedEntities(type, [JSON.parse(jqXHR.responseText, Messages.jsonReviver)])[0]);
                }
            }, function (jqXHR, textStatus, errorThrown) {
                if (errorCallback) {
                    errorCallback(new Error(jqXHR.responseJSON.error.message));
                }
            });
        };
        /** Retrieve the supplied entity with the supplied id. */
        /** @param type The type of entity. */
        /** @param id The id of the entity to retrieve. */
        /** @param columns The columns to retrieve. Supply null to retrieve all columns. */
        /** @param successCallback The function to be called on a successful response. */
        /** @param errorCallback The function to be called on an unsuccessful response. */
        Messages.retrieve = function (type, id, columns, successCallback, errorCallback) {
            if (columns === void 0) { columns = null; }
            var parameters = [];
            if (columns) {
                var columnSet = new Query.ColumnSet(columns);
                if (!columnSet.allColumns) {
                    parameters.push(["$select=", columnSet.webAPI].join(""));
                }
            }
            var query = ["/", type.metadata.logicalCollectionName, "(", new Guid(id).toString("D"), ")"].join("");
            if (parameters.length > 0) {
                query += ["?", parameters.join("&")].join("");
            }
            return Messages.retrieveWebAPI(type, query, successCallback, errorCallback);
        };
        /** Retrieve the entities according to the supplied Web API query. */
        /** @param type The type of entity. */
        /** @param webAPIQuery The Web API query. */
        /** @param successCallback The function to be called on a successful response. */
        /** @param errorCallback The function to be called on an unsuccessful response. */
        Messages.retrieveMultipleWebAPI = function (type, webAPIQuery, successCallback, errorCallback) {
            return Messages.queryWebAPI("GET", webAPIQuery, null, [
                { header: "OData-MaxVersion", value: "4.0" },
                { header: "OData-Version", value: "4.0" },
                { header: "Prefer", value: 'odata.include-annotations="*"' }
            ], function (data, textStatus, jqXHR) {
                if (successCallback) {
                    successCallback(Messages.processRetrievedEntities(type, JSON.parse(jqXHR.responseText, Messages.jsonReviver).value));
                }
            }, function (jqXHR, textStatus, errorThrown) {
                if (errorCallback) {
                    errorCallback(new Error(jqXHR.responseJSON.error.message));
                }
            });
        };
        /** Retrieve the entities according to the supplied query expression. */
        /** @param type The type of entity. */
        /** @param query The query expression. */
        /** @param successCallback The function to be called on a successful response. */
        /** @param errorCallback The function to be called on an unsuccessful response. */
        Messages.retrieveMultipleQuery = function (type, query, successCallback, errorCallback) {
            return Messages.retrieveMultipleWebAPI(type, query.fetchXML, successCallback, errorCallback);
        };
        /** Retrieve the supplied entities according to the supplied query. */
        /** @param type The type of entity. */
        /** @param criteria The criteria. */
        /** @param orders The order expressions. */
        /** @param columns The columns to retrieve. Supply null to retrieve all columns. */
        /** @param top The number of records to retrieve. Supply null to retrieve all records. */
        /** @param linkedEntities The linked entities. */
        /** @param successCallback The function to be called on a successful response. */
        /** @param errorCallback The function to be called on an unsuccessful response. */
        Messages.retrieveMultiple = function (type, criteria, orders, columns, top, linkedEntities, successCallback, errorCallback) {
            if (criteria === void 0) { criteria = new Query.FilterExpression(); }
            if (orders === void 0) { orders = []; }
            if (columns === void 0) { columns = null; }
            if (top === void 0) { top = null; }
            if (linkedEntities === void 0) { linkedEntities = []; }
            var query = new Query.QueryExpression(type);
            query.columnSet = new Query.ColumnSet(columns);
            query.criteria = criteria;
            query.orders = orders;
            query.top = top;
            query.linkedEntities = linkedEntities;
            return Messages.retrieveMultipleQuery(type, query, successCallback, errorCallback);
        };
        /** Create the supplied entity. */
        /** @param entity The entity to create. */
        /** @param successCallback The function to be called on a successful response. */
        /** @param errorCallback The function to be called on an unsuccessful response. */
        Messages.create = function (entity, successCallback, errorCallback) {
            return Messages.createWebAPI(entity, null, successCallback, errorCallback);
        };
        /** Create the supplied entity and appends the supplied Web API query options. */
        /** @param entity The entity to create. */
        /** @param webAPIQueryOptions The Web API query options. */
        /** @param successCallback The function to be called on a successful response. */
        /** @param errorCallback The function to be called on an unsuccessful response. */
        Messages.createWebAPI = function (entity, webAPIQueryOptions, successCallback, errorCallback) {
            var uri = ["/", entity.logicalName, "s"].join("");
            if (webAPIQueryOptions) {
                uri += ["?", webAPIQueryOptions].join("");
            }
            return Messages.queryWebAPI("POST", uri, JSON.stringify(entity.objectForOperations), [
                { header: "OData-MaxVersion", value: "4.0" },
                { header: "OData-Version", value: "4.0" }
            ], function (data, textStatus, jqXHR) {
                if (successCallback) {
                    var entityId = jqXHR.getResponseHeader("OData-EntityId");
                    entityId = entityId.substr(entityId.indexOf("(") + 1, 36);
                    entity.id = entityId;
                    successCallback(entityId);
                }
            }, function (jqXHR, textStatus, errorThrown) {
                if (errorCallback) {
                    errorCallback(new Error(jqXHR.responseJSON.error.message));
                }
            });
        };
        /** Update the supplied entity. */
        /** @param entity The entity to update. */
        /** @param successCallback The function to be called on a successful response. */
        /** @param errorCallback The function to be called on an unsuccessful response. */
        Messages.update = function (entity, successCallback, errorCallback) {
            return Messages.updateWebAPI(entity, null, successCallback, errorCallback);
        };
        /** Update the supplied entity and appends the supplied Web API query options. */
        /** @param entity The entity to update. */
        /** @param webAPIQueryOptions The Web API query options. */
        /** @param successCallback The function to be called on a successful response. */
        /** @param errorCallback The function to be called on an unsuccessful response. */
        Messages.updateWebAPI = function (entity, webAPIQueryOptions, successCallback, errorCallback) {
            var uri = ["/", entity.entityType.metadata.logicalCollectionName, "(", entity.id, ")"].join("");
            if (webAPIQueryOptions) {
                uri += ["?", webAPIQueryOptions].join("");
            }
            return Messages.queryWebAPI("PATCH", uri, JSON.stringify(entity.objectForOperations), [
                { header: "OData-MaxVersion", value: "4.0" },
                { header: "OData-Version", value: "4.0" }
            ], function (data, textStatus, jqXHR) {
                if (successCallback) {
                    var entityId = jqXHR.getResponseHeader("OData-EntityId");
                    entityId = entityId.substr(entityId.indexOf("(") + 1, 36);
                    entity.id = entityId;
                    successCallback(entityId);
                }
            }, function (jqXHR, textStatus, errorThrown) {
                if (errorCallback) {
                    errorCallback(new Error(jqXHR.responseJSON.error.message));
                }
            });
        };
        /** Upserts the supplied entity. */
        /** @param entity The entity to update. */
        /** @param successCallback The function to be called on a successful response. */
        /** @param errorCallback The function to be called on an unsuccessful response. */
        Messages.upsert = function (entity, successCallback, errorCallback) {
            return Messages.updateWebAPI(entity, null, successCallback, errorCallback);
        };
        /** Upsert the supplied entity and appends the supplied Web API query options. */
        /** @param entity The entity to update. */
        /** @param webAPIQueryOptions The Web API query options. */
        /** @param successCallback The function to be called on a successful response. */
        /** @param errorCallback The function to be called on an unsuccessful response. */
        Messages.upsertWebAPI = function (entity, webAPIQueryOptions, successCallback, errorCallback) {
            var uri = ["/", entity.entityType.metadata.logicalCollectionName, "(", entity.id, ")"].join("");
            if (webAPIQueryOptions) {
                uri += ["?", webAPIQueryOptions].join("");
            }
            return Messages.queryWebAPI("PATCH", uri, JSON.stringify(entity.objectForOperations), [
                { header: "OData-MaxVersion", value: "4.0" },
                { header: "OData-Version", value: "4.0" }
            ], function (data, textStatus, jqXHR) {
                if (successCallback) {
                    var entityId = jqXHR.getResponseHeader("OData-EntityId");
                    entityId = entityId.substr(entityId.indexOf("(") + 1, 36);
                    entity.id = entityId;
                    successCallback(entityId);
                }
            }, function (jqXHR, textStatus, errorThrown) {
                if (errorCallback) {
                    errorCallback(new Error(jqXHR.responseJSON.error.message));
                }
            });
        };
        /** Delete the supplied entity. */
        /** @param type The type of entity to delete. */
        /** @param id The id of the entity to delete. */
        /** @param successCallback The function to be called on a successful response. */
        /** @param errorCallback The function to be called on an unsuccessful response. */
        Messages.delete = function (type, id, successCallback, errorCallback) {
            var uri = ["/", type.metadata.logicalCollectionName, "(", id, ")"].join("");
            return Messages.queryWebAPI("DELETE", uri, null, [
                { header: "OData-MaxVersion", value: "4.0" },
                { header: "OData-Version", value: "4.0" }
            ], function (data, textStatus, jqXHR) {
                if (successCallback) {
                    successCallback(id);
                }
            }, function (jqXHR, textStatus, errorThrown) {
                if (errorCallback) {
                    errorCallback(new Error(jqXHR.responseJSON.error.message));
                }
            });
        };
        /** Associate the target entity with the related entity in the supplied relationship. */
        /** @param navigationProperty The naigation property. */
        /** @param targetType The target entity type. */
        /** @param targetId The target entity Id. */
        /** @param relatedEntityType The related entity name. */
        /** @param relatedEntityId The related entity id. */
        /** @param successCallback The function to be called on a successful response. */
        /** @param errorCallback The function to be called on an unsuccessful response. */
        Messages.associate = function (navigationProperty, targetType, targetId, relatedEntityType, relatedEntityId, successCallback, errorCallback) {
            var uri = ["/", targetType.metadata.logicalCollectionName, "(", targetId, ")/", navigationProperty, "/$ref"].join("");
            return Messages.queryWebAPI("POST", uri, JSON.stringify({
                "@odata.id": [Page.getWebAPIPath(), "/", relatedEntityType.metadata.logicalCollectionName, "(", relatedEntityId, ")"].join("")
            }), [
                { header: "OData-MaxVersion", value: "4.0" },
                { header: "OData-Version", value: "4.0" }
            ], function (data, textStatus, jqXHR) {
                if (successCallback) {
                    successCallback();
                }
            }, function (jqXHR, textStatus, errorThrown) {
                if (errorCallback) {
                    errorCallback(new Error(jqXHR.responseJSON.error.message));
                }
            });
        };
        /** Disassociate the target entity with the related entity in the supplied relationship.
            For a collection-valued (N:N) navigation property, supply related entity information.
            For a single valued (N:1) navigation property, do not supply related entity information.
        */
        /** @param navigationProperty The naigation property. */
        /** @param targetEntityName The target entity name. */
        /** @param targetEntityName The target entity Id. */
        /** @param targetEntityName The related entity name. */
        /** @param targetEntityName The related entity id. */
        /** @param successCallback The function to be called on a successful response. */
        /** @param errorCallback The function to be called on an unsuccessful response. */
        Messages.disassociate = function (navigationProperty, targetType, targetId, relatedEntityType, relatedEntityId, successCallback, errorCallback) {
            var uri = ["/", targetType.metadata.logicalCollectionName, "(", targetId, ")/", navigationProperty, "/$ref"].join("");
            if (relatedEntityType && relatedEntityId) {
                uri += ["?$id=", Page.getWebAPIPath(), "/", relatedEntityType.metadata.logicalCollectionName, "(", relatedEntityId, ")"].join("");
            }
            return Messages.queryWebAPI("DELETE", uri, null, [
                { header: "OData-MaxVersion", value: "4.0" },
                { header: "OData-Version", value: "4.0" }
            ], function (data, textStatus, jqXHR) {
                if (successCallback) {
                    successCallback();
                }
            }, function (jqXHR, textStatus, errorThrown) {
                if (errorCallback) {
                    errorCallback(new Error(jqXHR.responseJSON.error.message));
                }
            });
        };
        /** Set the state of the entity. */
        /** @param type The type of entity. */
        /** @param id The id of the entity. */
        /** @param statecode The statecode. */
        /** @param statuscode The statuscode. */
        /** @param successCallback The function to be called on a successful response. */
        /** @param errorCallback The function to be called on an unsuccessful response. */
        Messages.setState = function (type, id, statecode, statuscode, successCallback, errorCallback) {
            return Messages.queryWebAPI("PATCH", ["/", type.metadata.logicalCollectionName, "(", new Guid(id).toString("D"), ")"].join(""), JSON.stringify({
                statecode: statecode,
                statuscode: statuscode
            }), [
                { header: "OData-MaxVersion", value: "4.0" },
                { header: "OData-Version", value: "4.0" },
                { header: "Accept", value: "application/json" },
                { header: "Content-Type", value: "application/json; charset=utf-8" }
            ], function (data, textStatus, jqXHR) {
                if (successCallback) {
                    successCallback();
                }
            }, function (jqXHR, textStatus, errorThrown) {
                if (errorCallback) {
                    errorCallback(new Error(jqXHR.responseJSON.error.message));
                }
            });
        };
        return Messages;
    }(MessagesBase));
    OneXrm.Messages = Messages;
    (function (Messages) {
        /** Microsoft.Crm.Sdk.Messages JavaScript equivalent providing access to selected synchronous Web API operations
        NOTE: Synchronous Web API calls MAY ONLY be made for ribbon button enablement rules that require synchronous calls
        */
        var Synchronous = /** @class */ (function (_super) {
            __extends(Synchronous, _super);
            function Synchronous() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            /** Query the webAPI. */
            /** @param method The method. */
            /** @param webAPIQuery The Web API query. */
            /** @param data The data. */
            /** @param requestHeaders The request headers. */
            Synchronous.queryWebAPI = function (method, webAPIQuery, data, requestHeaders) {
                var settings = {
                    url: encodeURI([Page.getWebAPIPath(), webAPIQuery].join("")),
                    async: false,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    method: method,
                    beforeSend: function (request) {
                        if (requestHeaders) {
                            for (var _i = 0, requestHeaders_2 = requestHeaders; _i < requestHeaders_2.length; _i++) {
                                var requestHeader = requestHeaders_2[_i];
                                request.setRequestHeader(requestHeader.header, requestHeader.value);
                            }
                        }
                    },
                };
                if (data) {
                    settings.data = data;
                }
                return $.ajax(settings);
            };
            /** Retrieve the entity according to the supplied Web API query. */
            /** @param type The type of entity. */
            /** @param webAPIQuery The Web API query. */
            Synchronous.retrieveWebAPI = function (type, webAPIQuery) {
                var response = Synchronous.queryWebAPI("GET", webAPIQuery, null, [
                    { header: "OData-MaxVersion", value: "4.0" },
                    { header: "OData-Version", value: "4.0" },
                    { header: "Prefer", value: 'odata.include-annotations="*"' }
                ]);
                return Synchronous.processRetrievedEntities(type, [JSON.parse(response.responseText, Messages.jsonReviver)])[0];
            };
            /** Retrieve the supplied entity with the supplied id. */
            /** @param type The type of entity. */
            /** @param id The id of the entity to retrieve. */
            /** @param columns The columns to retrieve. Supply null to retrieve all columns. */
            Synchronous.retrieve = function (type, id, columns) {
                if (columns === void 0) { columns = null; }
                var parameters = [];
                if (columns) {
                    var columnSet = new Query.ColumnSet(columns);
                    if (!columnSet.allColumns) {
                        parameters.push(["$select=", columnSet.webAPI].join(""));
                    }
                }
                var query = ["/", type.metadata.logicalCollectionName, "(", new Guid(id).toString("D"), ")"].join("");
                if (parameters.length > 0) {
                    query += ["?", parameters.join("&")].join("");
                }
                return Messages.Synchronous.retrieveWebAPI(type, query);
            };
            /** Retrieve the entities according to the supplied Web API query. */
            /** @param type The type of entity. */
            /** @param webAPIQuery The Web API query. */
            Synchronous.retrieveMultipleWebAPI = function (type, webAPIQuery) {
                var response = Synchronous.queryWebAPI("GET", webAPIQuery, null, [
                    { header: "OData-MaxVersion", value: "4.0" },
                    { header: "OData-Version", value: "4.0" },
                    { header: "Prefer", value: 'odata.include-annotations="*"' }
                ]);
                return Synchronous.processRetrievedEntities(type, JSON.parse(response.responseText, Messages.jsonReviver).value);
            };
            /** Retrieve the entities according to the supplied query expression. */
            /** @param type The type of entity. */
            /** @param query The query expression. */
            Synchronous.retrieveMultipleQuery = function (type, query) {
                return Synchronous.retrieveMultipleWebAPI(type, query.fetchXML);
            };
            /** Retrieve the supplied entities according to the supplied query. */
            /** @param type The type of entity. */
            /** @param criteria The criteria. */
            /** @param orders The order expressions. */
            /** @param columns The columns to retrieve. Supply null to retrieve all columns. */
            /** @param top The number of records to retrieve. Supply null to retrieve all records. */
            /** @param linkedEntities The linked entities. */
            Synchronous.retrieveMultiple = function (type, criteria, orders, columns, top, linkedEntities) {
                if (criteria === void 0) { criteria = new Query.FilterExpression(); }
                if (orders === void 0) { orders = []; }
                if (columns === void 0) { columns = null; }
                if (top === void 0) { top = null; }
                if (linkedEntities === void 0) { linkedEntities = []; }
                var query = new Query.QueryExpression(type);
                query.columnSet = new Query.ColumnSet(columns);
                query.criteria = criteria;
                query.orders = orders;
                query.top = top;
                query.linkedEntities = linkedEntities;
                return Synchronous.retrieveMultipleQuery(type, query);
            };
            return Synchronous;
        }(MessagesBase));
        Messages.Synchronous = Synchronous;
    })(Messages = OneXrm.Messages || (OneXrm.Messages = {}));
    /** Microsoft.Xrm.Sdk.Query JavaScript equivalent */
    var Query = /** @class */ (function () {
        function Query() {
        }
        return Query;
    }());
    OneXrm.Query = Query;
    (function (Query) {
        var LogicalOperator;
        (function (LogicalOperator) {
            LogicalOperator[LogicalOperator["And"] = 0] = "And";
            LogicalOperator[LogicalOperator["Or"] = 1] = "Or";
        })(LogicalOperator = Query.LogicalOperator || (Query.LogicalOperator = {}));
        var ConditionOperator;
        (function (ConditionOperator) {
            ConditionOperator[ConditionOperator["Between"] = 0] = "Between";
            ConditionOperator[ConditionOperator["Equal"] = 1] = "Equal";
            ConditionOperator[ConditionOperator["EqualBusinessId"] = 2] = "EqualBusinessId";
            ConditionOperator[ConditionOperator["EqualUserId"] = 3] = "EqualUserId";
            ConditionOperator[ConditionOperator["EqualUserLanguage"] = 4] = "EqualUserLanguage";
            ConditionOperator[ConditionOperator["GreaterEqual"] = 5] = "GreaterEqual";
            ConditionOperator[ConditionOperator["GreaterThan"] = 6] = "GreaterThan";
            ConditionOperator[ConditionOperator["In"] = 7] = "In";
            ConditionOperator[ConditionOperator["Last7Days"] = 8] = "Last7Days";
            ConditionOperator[ConditionOperator["LastMonth"] = 9] = "LastMonth";
            ConditionOperator[ConditionOperator["LastWeek"] = 10] = "LastWeek";
            ConditionOperator[ConditionOperator["LastXDays"] = 11] = "LastXDays";
            ConditionOperator[ConditionOperator["LastXHours"] = 12] = "LastXHours";
            ConditionOperator[ConditionOperator["LastXMonths"] = 13] = "LastXMonths";
            ConditionOperator[ConditionOperator["LastXWeeks"] = 14] = "LastXWeeks";
            ConditionOperator[ConditionOperator["LastXYears"] = 15] = "LastXYears";
            ConditionOperator[ConditionOperator["LastYear"] = 16] = "LastYear";
            ConditionOperator[ConditionOperator["LessEqual"] = 17] = "LessEqual";
            ConditionOperator[ConditionOperator["LessThan"] = 18] = "LessThan";
            ConditionOperator[ConditionOperator["Like"] = 19] = "Like";
            ConditionOperator[ConditionOperator["Next7Days"] = 20] = "Next7Days";
            ConditionOperator[ConditionOperator["NextMonth"] = 21] = "NextMonth";
            ConditionOperator[ConditionOperator["NextWeek"] = 22] = "NextWeek";
            ConditionOperator[ConditionOperator["NextXDays"] = 23] = "NextXDays";
            ConditionOperator[ConditionOperator["NextXHours"] = 24] = "NextXHours";
            ConditionOperator[ConditionOperator["NextXMonths"] = 25] = "NextXMonths";
            ConditionOperator[ConditionOperator["NextXWeeks"] = 26] = "NextXWeeks";
            ConditionOperator[ConditionOperator["NextXYears"] = 27] = "NextXYears";
            ConditionOperator[ConditionOperator["NextYear"] = 28] = "NextYear";
            ConditionOperator[ConditionOperator["NotBetween"] = 29] = "NotBetween";
            ConditionOperator[ConditionOperator["NotEqual"] = 30] = "NotEqual";
            ConditionOperator[ConditionOperator["NotEqualBusinessId"] = 31] = "NotEqualBusinessId";
            ConditionOperator[ConditionOperator["NotEqualUserId"] = 32] = "NotEqualUserId";
            ConditionOperator[ConditionOperator["NotIn"] = 33] = "NotIn";
            ConditionOperator[ConditionOperator["NotLike"] = 34] = "NotLike";
            ConditionOperator[ConditionOperator["NotNull"] = 35] = "NotNull";
            ConditionOperator[ConditionOperator["NotOn"] = 36] = "NotOn";
            ConditionOperator[ConditionOperator["Null"] = 37] = "Null";
            ConditionOperator[ConditionOperator["OlderThanXMonths"] = 38] = "OlderThanXMonths";
            ConditionOperator[ConditionOperator["On"] = 39] = "On";
            ConditionOperator[ConditionOperator["OnOrAfter"] = 40] = "OnOrAfter";
            ConditionOperator[ConditionOperator["OnOrBefore"] = 41] = "OnOrBefore";
            ConditionOperator[ConditionOperator["ThisMonth"] = 42] = "ThisMonth";
            ConditionOperator[ConditionOperator["ThisWeek"] = 43] = "ThisWeek";
            ConditionOperator[ConditionOperator["ThisYear"] = 44] = "ThisYear";
            ConditionOperator[ConditionOperator["Today"] = 45] = "Today";
            ConditionOperator[ConditionOperator["Tomorrow"] = 46] = "Tomorrow";
            ConditionOperator[ConditionOperator["Yesterday"] = 47] = "Yesterday";
        })(ConditionOperator = Query.ConditionOperator || (Query.ConditionOperator = {}));
        var OrderType;
        (function (OrderType) {
            OrderType[OrderType["Ascending"] = 0] = "Ascending";
            OrderType[OrderType["Descending"] = 1] = "Descending";
        })(OrderType = Query.OrderType || (Query.OrderType = {}));
        var QueryExpression = /** @class */ (function () {
            /** Initializes a new instance of the OneXrm.Query.QueryExpression class. */
            /** @param type The type of entity to retrieve. */
            /** @param columnSet The column set. */
            /** @param criteria The filter expressions. */
            /** @param orders The order expressions. */
            /** @param top The number of records to retrieve. Supply null to retrieve all records. */
            /** @param linkedEntities The linked entities. */
            function QueryExpression(type, columnSet, criteria, orders, top, linkedEntities) {
                if (columnSet === void 0) { columnSet = new ColumnSet(null); }
                if (criteria === void 0) { criteria = new FilterExpression(); }
                if (orders === void 0) { orders = []; }
                if (top === void 0) { top = null; }
                if (linkedEntities === void 0) { linkedEntities = []; }
                this.type = type;
                this.columnSet = columnSet;
                this.criteria = criteria;
                this.linkedEntities = linkedEntities;
                this.orders = orders;
                this.top = top;
            }
            Object.defineProperty(QueryExpression.prototype, "fetchXML", {
                get: function () {
                    var fetchXML = [];
                    fetchXML.push(['<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false"', this.top ? [' count="', this.top, '"'].join("") : "", ' >'].join(""));
                    fetchXML.push(['<entity name="', this.type.metadata.logicalName, '">'].join(""));
                    fetchXML.push(this.columnSet ? this.columnSet.fetchXML : '<all-attributes />');
                    if (this.orders) {
                        for (var _i = 0, _a = this.orders; _i < _a.length; _i++) {
                            var order = _a[_i];
                            fetchXML.push(order.fetchXML);
                        }
                    }
                    if (this.criteria) {
                        fetchXML.push(this.criteria.fetchXML);
                    }
                    if (this.linkedEntities) {
                        for (var _b = 0, _c = this.linkedEntities; _b < _c.length; _b++) {
                            var linkEntity = _c[_b];
                            fetchXML.push(linkEntity.fetchXML);
                        }
                    }
                    fetchXML.push('</entity>');
                    fetchXML.push('</fetch>');
                    var query = [
                        "/",
                        this.type.metadata.logicalCollectionName,
                        "?fetchXml=",
                        fetchXML.join("")
                    ].join("");
                    return query;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(QueryExpression.prototype, "webAPI", {
                get: function () {
                    var parameters = [];
                    if (this.columnSet && !this.columnSet.allColumns) {
                        parameters.push(["$select=", this.columnSet.webAPI].join(""));
                    }
                    if (this.criteria && this.criteria.conditions.length + this.criteria.filters.length > 0) {
                        parameters.push(["$filter=", this.criteria.webAPI].join(""));
                    }
                    if (this.orders && this.orders.length > 0) {
                        var orders = [];
                        for (var _i = 0, _a = this.orders; _i < _a.length; _i++) {
                            var order = _a[_i];
                            orders.push(order.webAPI);
                        }
                        parameters.push(["$orderby=", orders.join(",")].join(""));
                    }
                    if (this.top) {
                        parameters.push(["$top=", this.top].join(""));
                    }
                    var query = ["/", this.type.metadata.logicalCollectionName].join("");
                    if (parameters.length > 0) {
                        query += ["?", parameters.join("&")].join("");
                    }
                    return query;
                },
                enumerable: true,
                configurable: true
            });
            return QueryExpression;
        }());
        Query.QueryExpression = QueryExpression;
        var ColumnSet = /** @class */ (function () {
            /** Initializes a new instance of the OneXrm.Query.ColumnSet class. */
            /** @param columns The columns to retrieve. Supply null to retrieve all columns. */
            function ColumnSet(columns) {
                if (columns === void 0) { columns = null; }
                this._columns = [];
                this.columns = columns;
            }
            Object.defineProperty(ColumnSet.prototype, "columns", {
                get: function () {
                    return this._columns;
                },
                set: function (value) {
                    this._columns = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ColumnSet.prototype, "allColumns", {
                get: function () {
                    return this.columns === null || this.columns.length === 0;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ColumnSet.prototype, "fetchXML", {
                get: function () {
                    if (!this.allColumns && this.columns instanceof Array) {
                        var columns = [];
                        for (var _i = 0, _a = this.columns; _i < _a.length; _i++) {
                            var column = _a[_i];
                            columns.push(['<attribute name="', column.logicalName, '" />'].join(""));
                        }
                        return columns.join("");
                    }
                    else {
                        return "<all-attributes />";
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ColumnSet.prototype, "webAPI", {
                get: function () {
                    if (this.columns instanceof Array) {
                        var columns = [];
                        for (var _i = 0, _a = this.columns; _i < _a.length; _i++) {
                            var column = _a[_i];
                            switch (column.attributeType) {
                                case Metadata.AttributeTypeCode.Lookup:
                                case Metadata.AttributeTypeCode.Owner:
                                    columns.push(["_", column.logicalName, "_value"].join(""));
                                    break;
                                default:
                                    columns.push(column.logicalName);
                                    break;
                            }
                        }
                        return columns.join(",");
                    }
                    else {
                        return "";
                    }
                },
                enumerable: true,
                configurable: true
            });
            return ColumnSet;
        }());
        Query.ColumnSet = ColumnSet;
        var FilterExpression = /** @class */ (function () {
            /** Initializes a new instance of the OneXrm.Query.FilterExpression class. */
            /** @param filterOperator The filter operator. Defaults to OneXrm.Query.LogicalOperator.And. */
            /** @param filters The list of filters. */
            /** @param conditions The list of conditions. */
            function FilterExpression(filterOperator, filters, conditions) {
                if (filterOperator === void 0) { filterOperator = LogicalOperator.And; }
                if (filters === void 0) { filters = []; }
                if (conditions === void 0) { conditions = []; }
                this.filterOperator = filterOperator;
                this.filters = filters;
                this.conditions = conditions;
            }
            Object.defineProperty(FilterExpression.prototype, "fetchXML", {
                get: function () {
                    var fetchXML = [];
                    fetchXML.push(['<filter type="', this.filterOperator === LogicalOperator.And ? "and" : "or", '">'].join(""));
                    if (this.filters) {
                        for (var _i = 0, _a = this.filters; _i < _a.length; _i++) {
                            var filter = _a[_i];
                            fetchXML.push(filter.fetchXML);
                        }
                    }
                    if (this.conditions) {
                        for (var _b = 0, _c = this.conditions; _b < _c.length; _b++) {
                            var condition = _c[_b];
                            fetchXML.push(condition.fetchXML);
                        }
                    }
                    fetchXML.push('</filter>');
                    return fetchXML.join("");
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FilterExpression.prototype, "webAPI", {
                get: function () {
                    var clauses = [];
                    for (var _i = 0, _a = this.conditions; _i < _a.length; _i++) {
                        var condition = _a[_i];
                        clauses.push(condition.webAPI);
                    }
                    for (var _b = 0, _c = this.filters; _b < _c.length; _b++) {
                        var filter = _c[_b];
                        clauses.push(["(", filter.webAPI, ")"].join(""));
                    }
                    return clauses.join(this.filterOperator === LogicalOperator.And ? " and " : " or ");
                },
                enumerable: true,
                configurable: true
            });
            return FilterExpression;
        }());
        Query.FilterExpression = FilterExpression;
        var ConditionExpression = /** @class */ (function () {
            /** Initializes a new instance of the OneXrm.Query.ConditionExpression class. */
            /** @param attribute The attribute. */
            /** @param conditionOperator The condition operator. */
            /** @param values The value(s). */
            function ConditionExpression(attribute, conditionOperator, values) {
                if (values === void 0) { values = []; }
                this.attribute = attribute;
                this.conditionOperator = conditionOperator;
                this.values = (values instanceof Array ? values : [values]);
            }
            Object.defineProperty(ConditionExpression.prototype, "fetchXML", {
                get: function () {
                    switch (this.values.length) {
                        case 0: return ['<condition attribute="', this.attribute.logicalName, '" operator="', this.fetchXMLOperator(), '" />'].join("");
                        case 1: return ['<condition attribute="', this.attribute.logicalName, '" operator="', this.fetchXMLOperator(), '" value="', this.values[0], '" />'].join("");
                        default:
                            var values = [];
                            for (var _i = 0, _a = this.values; _i < _a.length; _i++) {
                                var value = _a[_i];
                                values.push(['<value>', value, '</value>'].join(""));
                            }
                            return ['<condition attribute="', this.attribute.logicalName, '" operator="', this.fetchXMLOperator(), '">', values.join(""), '</condition>'].join("");
                    }
                },
                enumerable: true,
                configurable: true
            });
            ConditionExpression.prototype.fetchXMLOperator = function () {
                switch (this.conditionOperator) {
                    case ConditionOperator.Between: return "between";
                    case ConditionOperator.Equal: return "eq";
                    case ConditionOperator.EqualBusinessId: return "eq-businessid";
                    case ConditionOperator.EqualUserId: return "eq-userid";
                    case ConditionOperator.EqualUserLanguage: return "eq-userlanguage";
                    case ConditionOperator.GreaterEqual: return "ge";
                    case ConditionOperator.GreaterThan: return "gt";
                    case ConditionOperator.In: return "in";
                    case ConditionOperator.Last7Days: return "last-seven-days";
                    case ConditionOperator.LastMonth: return "last-month";
                    case ConditionOperator.LastWeek: return "last-week";
                    case ConditionOperator.LastXDays: return "last-x-days";
                    case ConditionOperator.LastXHours: return "last-x-hours";
                    case ConditionOperator.LastXMonths: return "last-x-months";
                    case ConditionOperator.LastXWeeks: return "last-x-weeks";
                    case ConditionOperator.LastXYears: return "last-x-years";
                    case ConditionOperator.LastYear: return "last-year";
                    case ConditionOperator.LessEqual: return "le";
                    case ConditionOperator.LessThan: return "lt";
                    case ConditionOperator.Like: return "like";
                    case ConditionOperator.Next7Days: return "next-seven-days";
                    case ConditionOperator.NextMonth: return "next-month";
                    case ConditionOperator.NextWeek: return "next-week";
                    case ConditionOperator.NextXDays: return "next-x-days";
                    case ConditionOperator.NextXHours: return "next-x-hours";
                    case ConditionOperator.NextXMonths: return "next-x-months";
                    case ConditionOperator.NextXWeeks: return "next-x-weeks";
                    case ConditionOperator.NextXYears: return "next-x-years";
                    case ConditionOperator.NextYear: return "next-year";
                    case ConditionOperator.NotBetween: return "not-between";
                    case ConditionOperator.NotEqual: return "ne";
                    case ConditionOperator.NotEqualBusinessId: return "ne-businessid";
                    case ConditionOperator.NotEqualUserId: return "ne-userid";
                    case ConditionOperator.NotIn: return "not-in";
                    case ConditionOperator.NotLike: return "not-like";
                    case ConditionOperator.NotNull: return "not-null";
                    case ConditionOperator.NotOn: return "not-on";
                    case ConditionOperator.Null: return "null";
                    case ConditionOperator.OlderThanXMonths: return "older-than-x-months";
                    case ConditionOperator.On: return "on";
                    case ConditionOperator.OnOrAfter: return "on-or-after";
                    case ConditionOperator.OnOrBefore: return "on-or-before";
                    case ConditionOperator.ThisMonth: return "this-month";
                    case ConditionOperator.ThisWeek: return "this-week";
                    case ConditionOperator.ThisYear: return "this-year";
                    case ConditionOperator.Today: return "today";
                    case ConditionOperator.Tomorrow: return "tomorrow";
                    case ConditionOperator.Yesterday: return "yesterday";
                    default: throw new Error(["OneXrm.Query.ConditionExpression: Unhandled Operator: ", this.conditionOperator].join(""));
                }
            };
            Object.defineProperty(ConditionExpression.prototype, "webAPI", {
                get: function () {
                    return [this.webAPIAttribute(), " ", this.webAPIOperator(), " ", this.webAPIValue()].join("");
                },
                enumerable: true,
                configurable: true
            });
            ConditionExpression.prototype.webAPIAttribute = function () {
                switch (this.attribute.attributeType) {
                    case Metadata.AttributeTypeCode.Lookup: return ["_", this.attribute.logicalName, "_value"].join("");
                    default: return this.attribute.logicalName;
                }
            };
            ConditionExpression.prototype.webAPIOperator = function () {
                switch (this.conditionOperator) {
                    case ConditionOperator.Equal: return "eq";
                    case ConditionOperator.GreaterEqual: return "ge";
                    case ConditionOperator.GreaterThan: return "gt";
                    case ConditionOperator.LessEqual: return "le";
                    case ConditionOperator.LessThan: return "lt";
                    case ConditionOperator.NotEqual: return "ne";
                    // TODO: Operators
                    default: throw new Error(["OneXrm.Query.ConditionExpression: Unhandled Operator: ", this.conditionOperator].join(""));
                }
            };
            ConditionExpression.prototype.webAPIValue = function () {
                switch (this.attribute.attributeType) {
                    case Metadata.AttributeTypeCode.Lookup: return this.values[0];
                    default:
                        switch (typeof this.values[0]) {
                            case "string": return ["'", this.values[0], "'"].join("");
                            default: return this.values[0];
                        }
                }
            };
            return ConditionExpression;
        }());
        Query.ConditionExpression = ConditionExpression;
        var OrderExpression = /** @class */ (function () {
            /** Initializes a new instance of the OneXrm.Query.OrderExpression class. */
            /** @param attribute The attribute. */
            /** @param orderType The order type. Defaults to OneXrm.Query.OrderType.Ascending. */
            function OrderExpression(attribute, orderType) {
                if (orderType === void 0) { orderType = OrderType.Ascending; }
                this.attribute = attribute;
                this.orderType = orderType;
            }
            Object.defineProperty(OrderExpression.prototype, "fetchXML", {
                get: function () {
                    return ['<order attribute="', this.attribute.logicalName, '" descending="', this.orderType === OrderType.Descending ? "true" : "false", '" />'].join("");
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(OrderExpression.prototype, "webAPI", {
                get: function () {
                    return [this.attribute.logicalName, " ", this.orderType === OrderType.Descending ? "desc" : "asc"].join("");
                },
                enumerable: true,
                configurable: true
            });
            return OrderExpression;
        }());
        Query.OrderExpression = OrderExpression;
        var LinkEntity = /** @class */ (function () {
            /** Initializes a new instance of the OneXrm.Query.LinkEntity class. */
            /** @param parentAttribute The attribute to link from on the parent entity. */
            /** @param type The type of entity to link to. */
            /** @param attribute The attribute to link to. */
            /** @param criteria The filter expressions. */
            /** @param alias The alias. */
            /** @param linkedEntities The linked entities. */
            function LinkEntity(parentAttribute, type, attribute, criteria, alias, linkedEntities) {
                if (criteria === void 0) { criteria = new FilterExpression(); }
                if (linkedEntities === void 0) { linkedEntities = []; }
                this.parentAttribute = parentAttribute;
                this.type = type;
                this.attribute = attribute;
                this.criteria = criteria;
                this.alias = alias;
                this.linkedEntities = linkedEntities;
            }
            Object.defineProperty(LinkEntity.prototype, "fetchXML", {
                get: function () {
                    var fetchXML = [];
                    fetchXML.push(['<link-entity name="', this.type.metadata.logicalName, '" from="', this.attribute.logicalName, '" to="', this.parentAttribute.logicalName, '"', this.alias ? [' alias="', this.alias, '"'].join("") : "", '>'].join(""));
                    if (this.criteria) {
                        fetchXML.push(this.criteria.fetchXML);
                    }
                    if (this.linkedEntities) {
                        for (var _i = 0, _a = this.linkedEntities; _i < _a.length; _i++) {
                            var linkEntity = _a[_i];
                            fetchXML.push(linkEntity.fetchXML);
                        }
                    }
                    fetchXML.push('</link-entity>');
                    return fetchXML.join("");
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LinkEntity.prototype, "webAPI", {
                get: function () {
                    throw new Error("OneXrm.Query.LinkEntity.webAPI not supported");
                },
                enumerable: true,
                configurable: true
            });
            return LinkEntity;
        }());
        Query.LinkEntity = LinkEntity;
    })(Query = OneXrm.Query || (OneXrm.Query = {}));
    /** Microsoft.Xrm.Sdk.Entity JavaScript equivalent */
    var Entity = /** @class */ (function () {
        /** Initializes a new instance of the OneXrm.Entities.Account class. */
        /** @param logicalName The logical name of the entity. */
        function Entity(logicalName) {
            this.entityType = Entity;
            this.logicalName = logicalName;
        }
        Object.defineProperty(Entity.prototype, "objectForOperations", {
            /** Gets the object for use in create/update operations. */
            get: function () {
                var entity = {};
                for (var attributeName in this.entityType.Attributes) {
                    var attributeMetadata = this.entityType.Attributes[attributeName];
                    var attribute = this[attributeMetadata.logicalName];
                    if (attribute !== undefined) {
                        switch (attributeMetadata.attributeType) {
                            case Metadata.AttributeTypeCode.Uniqueidentifier:
                                // Ignore
                                break;
                            case Metadata.AttributeTypeCode.BigInt:
                            case Metadata.AttributeTypeCode.Boolean:
                            case Metadata.AttributeTypeCode.DateTime:
                            case Metadata.AttributeTypeCode.Decimal:
                            case Metadata.AttributeTypeCode.Double:
                            case Metadata.AttributeTypeCode.Integer:
                            case Metadata.AttributeTypeCode.Money:
                            case Metadata.AttributeTypeCode.Picklist:
                            case Metadata.AttributeTypeCode.State:
                            case Metadata.AttributeTypeCode.Status:
                                entity[attributeMetadata.logicalName] = (attribute === null ? null : attribute.value);
                                break;
                            case Metadata.AttributeTypeCode.Lookup:
                            case Metadata.AttributeTypeCode.Owner:
                                if (attribute === null) {
                                    throw new Error("OneXrm: Lookup/Owner property cannot be set to null as part of a create/update operation. Use OneXrm.Messages.Disassociate instead.");
                                }
                                if (!attribute.type) {
                                    throw new Error(["OneXrm: type property is required for operations on Lookup/Owner fields (", attributeMetadata.schemaName, ")."].join(""));
                                }
                                entity[[attributeMetadata.schemaName, "@odata.bind"].join("")] = ["/", attribute.type.metadata.logicalCollectionName, "(", attribute.id, ")"].join("");
                                break;
                            case Metadata.AttributeTypeCode.Memo:
                            case Metadata.AttributeTypeCode.String:
                                entity[attributeMetadata.logicalName] = attribute;
                                break;
                            case Metadata.AttributeTypeCode.PartyList:
                                // TODO
                                break;
                            default:
                                alert(["OneXrm.Entity.objectForOperations: Unhandled attribute type: ", attributeMetadata.attributeType].join(""));
                                break;
                        }
                    }
                }
                return entity;
            },
            enumerable: true,
            configurable: true
        });
        return Entity;
    }());
    OneXrm.Entity = Entity;
    (function (Entity) {
        var Attributes;
        (function (Attributes) {
            // Force instantiation of the module
            var dummy;
        })(Attributes = Entity.Attributes || (Entity.Attributes = {}));
    })(Entity = OneXrm.Entity || (OneXrm.Entity = {}));
    /** Microsoft.Xrm.Sdk.EntityReference JavaScript equivalent */
    var EntityReference = /** @class */ (function () {
        /** Initializes a new instance of the EntityReference class. */
        /** @param id The id. */
        /** @param logicalName The logical name of the entity. */
        /** @param name The name. */
        /** @param type The type. Only required if the field will be written to. */
        function EntityReference(id, logicalName, name, type) {
            this.id = new Guid(id).toString();
            this.logicalName = logicalName;
            this.name = name;
            this.type = type;
        }
        return EntityReference;
    }());
    OneXrm.EntityReference = EntityReference;
    /** Microsoft.Xrm.Sdk.Metadata JavaScript equivalent */
    var Metadata = /** @class */ (function () {
        function Metadata() {
        }
        return Metadata;
    }());
    OneXrm.Metadata = Metadata;
    (function (Metadata) {
        var AttributeTypeCode;
        (function (AttributeTypeCode) {
            AttributeTypeCode[AttributeTypeCode["Boolean"] = 0] = "Boolean";
            AttributeTypeCode[AttributeTypeCode["Customer"] = 1] = "Customer";
            AttributeTypeCode[AttributeTypeCode["DateTime"] = 2] = "DateTime";
            AttributeTypeCode[AttributeTypeCode["Decimal"] = 3] = "Decimal";
            AttributeTypeCode[AttributeTypeCode["Double"] = 4] = "Double";
            AttributeTypeCode[AttributeTypeCode["Integer"] = 5] = "Integer";
            AttributeTypeCode[AttributeTypeCode["Lookup"] = 6] = "Lookup";
            AttributeTypeCode[AttributeTypeCode["Memo"] = 7] = "Memo";
            AttributeTypeCode[AttributeTypeCode["Money"] = 8] = "Money";
            AttributeTypeCode[AttributeTypeCode["Owner"] = 9] = "Owner";
            AttributeTypeCode[AttributeTypeCode["PartyList"] = 10] = "PartyList";
            AttributeTypeCode[AttributeTypeCode["Picklist"] = 11] = "Picklist";
            AttributeTypeCode[AttributeTypeCode["State"] = 12] = "State";
            AttributeTypeCode[AttributeTypeCode["Status"] = 13] = "Status";
            AttributeTypeCode[AttributeTypeCode["String"] = 14] = "String";
            AttributeTypeCode[AttributeTypeCode["Uniqueidentifier"] = 15] = "Uniqueidentifier";
            AttributeTypeCode[AttributeTypeCode["CalendarRules"] = 16] = "CalendarRules";
            AttributeTypeCode[AttributeTypeCode["Virtual"] = 17] = "Virtual";
            AttributeTypeCode[AttributeTypeCode["BigInt"] = 18] = "BigInt";
            AttributeTypeCode[AttributeTypeCode["ManagedProperty"] = 19] = "ManagedProperty";
            AttributeTypeCode[AttributeTypeCode["EntityName"] = 20] = "EntityName";
        })(AttributeTypeCode = Metadata.AttributeTypeCode || (Metadata.AttributeTypeCode = {}));
        /** Microsoft.Xrm.Sdk.Metadata.EntityMetadata JavaScript equivalent */
        var EntityMetadata = /** @class */ (function () {
            function EntityMetadata() {
            }
            return EntityMetadata;
        }());
        Metadata.EntityMetadata = EntityMetadata;
        /** Microsoft.Xrm.Sdk.Metadata.AttributeMetadata JavaScript equivalent */
        var AttributeMetadata = /** @class */ (function () {
            function AttributeMetadata() {
            }
            return AttributeMetadata;
        }());
        Metadata.AttributeMetadata = AttributeMetadata;
    })(Metadata = OneXrm.Metadata || (OneXrm.Metadata = {}));
    /** Utilities */
    var Utils = /** @class */ (function () {
        function Utils() {
        }
        /** Checks the supplied value object for empty string and replaces with the replament value if empty string. */
        /** @param value The object to check for empty string. */
        /** @param replace The value to replace with. */
        Utils.cvEmptyString = function (value, replace) {
            if (replace === void 0) { replace = null; }
            if (value === "") {
                return replace;
            }
            else {
                return value;
            }
        };
        /** Checks the supplied value object for null and replaces with the replament value if null. */
        /** @param value The object to check for null. */
        /** @param replace The value to replace with. */
        Utils.cvNull = function (value, replace) {
            if (replace === void 0) { replace = null; }
            if (value === null) {
                return replace;
            }
            else {
                return value;
            }
        };
        /** Checks the supplied value object for undefined and replaces with the replament value if undefined. */
        /** @param value The object to check for undefined. */
        /** @param replace The value to replace with. */
        Utils.cvUndefined = function (value, replace) {
            if (replace === void 0) { replace = null; }
            if (value === undefined) {
                return replace;
            }
            else {
                return value;
            }
        };
        /** Gets the querystring parameter with the supplied key. */
        /** @param window The window object. */
        /** @param entityName The key of the parameter. */
        Utils.getQueryStringParameter = function (window, key) {
            key = key.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
            var regex = new RegExp("[\\?&]" + key + "=([^&#]*)");
            var match = regex.exec(window.location.href);
            if (match !== null) {
                return decodeURIComponent(match[1].replace(/\+/g, " "));
            }
            match = new RegExp("[\\?&]extraqs=([^&#]*)").exec(window.location.href);
            if (match !== null) {
                match = regex.exec(decodeURIComponent(match[1].replace(/\+/g, " ")));
                if (match !== null) {
                    return match[1].replace(/\+/g, " ");
                }
            }
            return null;
        };
        /** Returns a value indicating whether the supplied value is equal to any of the supplied values. */
        /** @param value The value. */
        /** @param values The values. */
        Utils.isIn = function (value) {
            var values = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                values[_i - 1] = arguments[_i];
            }
            return values.indexOf(value) > -1;
        };
        /** Converts the current supplied value to a String object. */
        /** @param value The value. */
        Utils.toString = function (value) {
            return [value].join("");
        };
        return Utils;
    }());
    OneXrm.Utils = Utils;
    /** Xrm.Page extensions */
    var Page = /** @class */ (function () {
        function Page() {
        }
        /** Gets the context object. */
        Page.context = function () {
            if (typeof window.GetGlobalContext !== "undefined") {
                return window.GetGlobalContext();
            }
            else {
                if (typeof Xrm !== "undefined") {
                    return Xrm.Page.context;
                }
                else {
                    throw new Error("Context is not available.");
                }
            }
        };
        /** Gets the server URL from the context. */
        Page.getClientUrl = function () {
            return Page.context().getClientUrl();
        };
        /** Gets the path to the Web API endpoint. */
        Page.getWebAPIPath = function () {
            return [Page.getClientUrl(), "/api/data/v8.2"].join("");
        };
        /** Gets an array of strings that represent the names of each of the security roles that the user has. */
        /** @param successCallback The function to be called on a successful response. */
        /** @param errorCallback The function to be called on an unsuccessful response. */
        Page.getUserRoleNames = function (successCallback, errorCallback) {
            if (Page.userRoleNames === null) {
                var filterRoleIds = [];
                var roleIds = Xrm.Page.context.getUserRoles();
                for (var _i = 0, roleIds_1 = roleIds; _i < roleIds_1.length; _i++) {
                    var roleId = roleIds_1[_i];
                    filterRoleIds.push(["roleid eq ", new Guid(roleId).toString()].join(""));
                }
                return Messages.queryWebAPI("GET", ["/roles?$select=name&$filter=", filterRoleIds.join(" or ")].join(""), null, [
                    { header: "OData-MaxVersion", value: "4.0" },
                    { header: "OData-Version", value: "4.0" }
                ], function (data, textStatus, jqXHR) {
                    Page.userRoleNames = [];
                    var roles = JSON.parse(jqXHR.responseText).value;
                    for (var _i = 0, roles_1 = roles; _i < roles_1.length; _i++) {
                        var role = roles_1[_i];
                        Page.userRoleNames.push(role.name);
                    }
                    if (successCallback) {
                        successCallback(Page.userRoleNames);
                    }
                }, function (jqXHR, textStatus, errorThrown) {
                    throw new Error(jqXHR.responseJSON.error.message);
                });
            }
            else {
                if (successCallback) {
                    successCallback(Page.userRoleNames);
                }
                return null;
            }
        };
        /** Gets an value indicating if the user has any of the supplied roles. */
        /** @param roleNames The names of the roles to check for. */
        /** @param successCallback The function to be called on a successful response. */
        /** @param errorCallback The function to be called on an unsuccessful response. */
        Page.userHasRoles = function (roleNames, successCallback, errorCallback) {
            return Page.getUserRoleNames(function (userRoleNames) {
                if (successCallback) {
                    successCallback(Enumerable.From(userRoleNames).Intersect(roleNames).Any());
                }
            }, function (error) {
                if (errorCallback) {
                    errorCallback(error);
                }
            });
        };
        Page.userRoleNames = null;
        return Page;
    }());
    OneXrm.Page = Page;
    /** OneXrm.Guid class */
    var Guid = /** @class */ (function () {
        /** Initializes a new instance of the Guid class. */
        /** @param value The value. */
        function Guid(value) {
            if (value === void 0) { value = "00000000000000000000000000000000"; }
            this.value = "00000000000000000000000000000000";
            this.value = value.replace(/[-{}]/g, "").toLowerCase();
        }
        /** Converts the value of the current Guid to its String equivalent. */
        /** @param format The format to convert to. Possible values are:
        N: 00000000000000000000000000000000
        D: 00000000-0000-0000-0000-000000000000
        B: {00000000-0000-0000-0000-000000000000}
        Anything else: 00000000-0000-0000-0000-000000000000
        */
        Guid.prototype.toString = function (format) {
            if (format === void 0) { format = ""; }
            switch (format.toUpperCase()) {
                case 'N': return this.value;
                case 'B': return ["{", this.value.substr(0, 8), "-", this.value.substr(8, 4), "-", this.value.substr(12, 4), "-", this.value.substr(16, 4), "-", this.value.substr(20, 12), "}"].join("");
                default: return [this.value.substr(0, 8), "-", this.value.substr(8, 4), "-", this.value.substr(12, 4), "-", this.value.substr(16, 4), "-", this.value.substr(20, 12)].join("");
            }
        };
        /** Gets a value indicating whether the current Guid is equal to the suppled Guid. */
        /** @param value The value to compare */
        Guid.prototype.equals = function (value) {
            if (value instanceof Guid) {
                return this.toString() === value.toString();
            }
            else {
                return this.toString() === new Guid(value).toString();
            }
        };
        /** Gets a value indicating whether the supplied guids are equal. */
        /** @param values The values to compare */
        Guid.equals = function () {
            var values = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                values[_i] = arguments[_i];
            }
            if (values.length < 2) {
                return false;
            }
            for (var i = 0; i < values.length; i++) {
                switch (true) {
                    case values[i] instanceof Guid: break;
                    case (typeof values[i] === "string"):
                        values[i] = new Guid(values[i]);
                        break;
                    default: return false;
                }
            }
            var value1 = values[0];
            for (var _a = 0, values_1 = values; _a < values_1.length; _a++) {
                var value = values_1[_a];
                if (!value1.equals(value)) {
                    return false;
                }
            }
            return true;
        };
        return Guid;
    }());
    OneXrm.Guid = Guid;
    (function (Guid) {
        Guid.Empty = new Guid("00000000-0000-0000-0000-000000000000");
    })(Guid = OneXrm.Guid || (OneXrm.Guid = {}));
})(OneXrm || (OneXrm = {}));
