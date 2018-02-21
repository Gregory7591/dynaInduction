/// <reference path="../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../Scripts/typings/linq/linq.d.ts" />
/// <reference path="../Scripts/typings/xrm/xrm.d.ts" />

/** Singular Dynamics 365 JavaScript Library Version 8.2 */
namespace OneXrm {
  abstract class MessagesBase {
    /** Converts matching returned JSON objects to correct data types. */
    /** @param key The key. */
    /** @param value The value. */
    protected static jsonReviver(key, value) {
      // Convert dates from strings to Date objects
      switch (typeof value) {
        case "string":
          let a: RegExpExecArray = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
          if (a) { return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4], +a[5], +a[6])); }
      }
      return value;
    }

    /** Process a list of retrieved entities to convert to expected format. */
    /** @param type The type of entity. */
    /** @param entities The entities to process. */
    protected static processRetrievedEntities(type: typeof Entity, entities: Entity[]): Entity[] {
      for (let i = 0; i < entities.length; i++) {
        let entity = entities[i];
        let entityNew = new type(type.metadata.logicalName);

        for (let attributeName in type.Attributes) {
          let attributeMetadata = type.Attributes[attributeName] as Metadata.AttributeMetadata;
          let value;

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
            } else {
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
                  let logicalName: string = entity[["_", attributeMetadata.logicalName, "_value@Microsoft.Dynamics.CRM.lookuplogicalname"].join("")];
                  let type = logicalName ? eval(["OneXrm.Entities.", logicalName].join("")) : undefined;
                  entityNew[attributeMetadata.logicalName] = new EntityReference(
                    value,
                    logicalName,
                    entity[["_", attributeMetadata.logicalName, "_value@OData.Community.Display.V1.FormattedValue"].join("")],
                    type);
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
                    value: $.map((<string>value).split(","), function (val) { return parseInt(val, 10); }),
                    name: $.map(entity[[attributeMetadata.logicalName, "@OData.Community.Display.V1.FormattedValue"].join("")].split(";"), function (val: string) { return val.trim(); })
                  };
                  break;
                default: alert(["OneXrm.Messages.processRetrievedEntities: Unhandled attribute type: ", attributeMetadata.attributeType].join("")); break;
              }
            }
          }
        }

        entities[i] = entityNew;
      }

      return entities;
    }
  }

  /** Microsoft.Crm.Sdk.Messages JavaScript equivalent providing access to asynchronous Web API operations */
  export class Messages extends MessagesBase {
    /** Query the webAPI. */
    /** @param method The method. */
    /** @param webAPIQuery The Web API query. */
    /** @param data The data. */
    /** @param requestHeaders The request headers. */
    /** @param successCallback The function to be called on a successful response. */
    /** @param errorCallback The function to be called on an unsuccessful response. */
    public static queryWebAPI(method: string, webAPIQuery: string, data?: any, requestHeaders?: { header: string, value: string }[], successCallback?: (data: any, textStatus: string, jqXHR: JQueryXHR) => any, errorCallback?: (jqXHR: JQueryXHR, textStatus: string, errorThrown: string) => any): JQueryXHR {
      let settings: JQueryAjaxSettings = {
        url: encodeURI([Page.getWebAPIPath(), webAPIQuery].join("")),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        method: method,
        beforeSend: function (request) {
          if (requestHeaders) {
            for (let requestHeader of requestHeaders) {
              request.setRequestHeader(requestHeader.header, requestHeader.value);
            }
          }
        },
        success: function (data: any, textStatus: string, jqXHR: JQueryXHR) {
          if (successCallback) {
            successCallback(data, textStatus, jqXHR);
          }
        },
        error: function (jqXHR: JQueryXHR, textStatus: string, errorThrown: string) {
          if (errorCallback) {
            errorCallback(jqXHR, textStatus, errorThrown);
          }
        }
      };

      if (data) {
        settings.data = data;
      }

      return $.ajax(settings);
    }

    /** Retrieve the entity according to the supplied Web API query. */
    /** @param type The type of entity. */
    /** @param webAPIQuery The Web API query. */
    /** @param successCallback The function to be called on a successful response. */
    /** @param errorCallback The function to be called on an unsuccessful response. */
    public static retrieveWebAPI(type: typeof Entity, webAPIQuery: string, successCallback?: (entity: Entity) => any, errorCallback?: (error: Error) => any): JQueryXHR {
      return Messages.queryWebAPI(
        "GET",
        webAPIQuery,
        null,
        [
          { header: "OData-MaxVersion", value: "4.0" },
          { header: "OData-Version", value: "4.0" },
          { header: "Prefer", value: 'odata.include-annotations="*"' }
        ],
        function (data: any, textStatus: string, jqXHR: JQueryXHR) {
          if (successCallback) {
            successCallback(Messages.processRetrievedEntities(type, [JSON.parse(jqXHR.responseText, Messages.jsonReviver)])[0]);
          }
        },
        function (jqXHR: JQueryXHR, textStatus: string, errorThrown: string) {
          if (errorCallback) {
            errorCallback(new Error(jqXHR.responseJSON.error.message));
          }
        });
    }

    /** Retrieve the supplied entity with the supplied id. */
    /** @param type The type of entity. */
    /** @param id The id of the entity to retrieve. */
    /** @param columns The columns to retrieve. Supply null to retrieve all columns. */
    /** @param successCallback The function to be called on a successful response. */
    /** @param errorCallback The function to be called on an unsuccessful response. */
    public static retrieve(type: typeof Entity, id: string, columns: Metadata.AttributeMetadata[] = null, successCallback?: (entity: Entity) => any, errorCallback?: (error: Error) => any): JQueryXHR {
      let parameters: string[] = [];

      if (columns) {
        let columnSet = new Query.ColumnSet(columns);
        if (!columnSet.allColumns) {
          parameters.push(["$select=", columnSet.webAPI].join(""));
        }
      }

      let query: string = ["/", type.metadata.logicalCollectionName, "(", new Guid(id).toString("D"), ")"].join("");
      if (parameters.length > 0) {
        query += ["?", parameters.join("&")].join("");
      }

      return Messages.retrieveWebAPI(
        type,
        query,
        successCallback,
        errorCallback);
    }

    /** Retrieve the entities according to the supplied Web API query. */
    /** @param type The type of entity. */
    /** @param webAPIQuery The Web API query. */
    /** @param successCallback The function to be called on a successful response. */
    /** @param errorCallback The function to be called on an unsuccessful response. */
    public static retrieveMultipleWebAPI(type: typeof Entity, webAPIQuery: string, successCallback?: (entities: Entity[]) => any, errorCallback?: (error: Error) => any): JQueryXHR {
      return Messages.queryWebAPI(
        "GET",
        webAPIQuery,
        null,
        [
          { header: "OData-MaxVersion", value: "4.0" },
          { header: "OData-Version", value: "4.0" },
          { header: "Prefer", value: 'odata.include-annotations="*"' }
        ],
        function (data: any, textStatus: string, jqXHR: JQueryXHR) {
          if (successCallback) {
            successCallback(Messages.processRetrievedEntities(type, JSON.parse(jqXHR.responseText, Messages.jsonReviver).value));
          }
        },
        function (jqXHR: JQueryXHR, textStatus: string, errorThrown: string) {
          if (errorCallback) {
            errorCallback(new Error(jqXHR.responseJSON.error.message));
          }
        });
    }

    /** Retrieve the entities according to the supplied query expression. */
    /** @param type The type of entity. */
    /** @param query The query expression. */
    /** @param successCallback The function to be called on a successful response. */
    /** @param errorCallback The function to be called on an unsuccessful response. */
    public static retrieveMultipleQuery(type: typeof Entity, query: Query.QueryExpression, successCallback?: (entities: Entity[]) => any, errorCallback?: (error: Error) => any): JQueryXHR {
      return Messages.retrieveMultipleWebAPI(
        type,
        query.fetchXML,
        successCallback,
        errorCallback);
    }

    /** Retrieve the supplied entities according to the supplied query. */
    /** @param type The type of entity. */
    /** @param criteria The criteria. */
    /** @param orders The order expressions. */
    /** @param columns The columns to retrieve. Supply null to retrieve all columns. */
    /** @param top The number of records to retrieve. Supply null to retrieve all records. */
    /** @param linkedEntities The linked entities. */
    /** @param successCallback The function to be called on a successful response. */
    /** @param errorCallback The function to be called on an unsuccessful response. */
    public static retrieveMultiple(type: typeof Entity, criteria: Query.FilterExpression = new Query.FilterExpression(), orders: Query.OrderExpression[] = [], columns: Metadata.AttributeMetadata[] = null, top: Number = null, linkedEntities: Query.LinkEntity[] = [], successCallback?: (entities: Entity[]) => any, errorCallback?: (error: Error) => any): JQueryXHR {
      let query: Query.QueryExpression = new Query.QueryExpression(type);
      query.columnSet = new Query.ColumnSet(columns);
      query.criteria = criteria;
      query.orders = orders;
      query.top = top;
      query.linkedEntities = linkedEntities;

      return Messages.retrieveMultipleQuery(
        type,
        query,
        successCallback,
        errorCallback);
    }

    /** Create the supplied entity. */
    /** @param entity The entity to create. */
    /** @param successCallback The function to be called on a successful response. */
    /** @param errorCallback The function to be called on an unsuccessful response. */
    public static create(entity: Entity, successCallback?: (id: string) => any, errorCallback?: (error: Error) => any): JQueryXHR {
      return Messages.createWebAPI(entity, null, successCallback, errorCallback);
    }

    /** Create the supplied entity and appends the supplied Web API query options. */
    /** @param entity The entity to create. */
    /** @param webAPIQueryOptions The Web API query options. */
    /** @param successCallback The function to be called on a successful response. */
    /** @param errorCallback The function to be called on an unsuccessful response. */
    public static createWebAPI(entity: Entity, webAPIQueryOptions: string, successCallback?: (id: string) => any, errorCallback?: (error: Error) => any): JQueryXHR {
      let uri: string = ["/", entity.logicalName, "s"].join("");
      if (webAPIQueryOptions) {
        uri += ["?", webAPIQueryOptions].join("");
      }

      return Messages.queryWebAPI(
        "POST",
        uri,
        JSON.stringify(entity.objectForOperations),
        [
          { header: "OData-MaxVersion", value: "4.0" },
          { header: "OData-Version", value: "4.0" }
        ],
        function (data: any, textStatus: string, jqXHR: JQueryXHR) {
          if (successCallback) {
            let entityId: string = jqXHR.getResponseHeader("OData-EntityId")
            entityId = entityId.substr(entityId.indexOf("(") + 1, 36);
            entity.id = entityId;
            successCallback(entityId);
          }
        },
        function (jqXHR: JQueryXHR, textStatus: string, errorThrown: string) {
          if (errorCallback) {
            errorCallback(new Error(jqXHR.responseJSON.error.message));
          }
        });
    }

    /** Update the supplied entity. */
    /** @param entity The entity to update. */
    /** @param successCallback The function to be called on a successful response. */
    /** @param errorCallback The function to be called on an unsuccessful response. */
    public static update(entity: Entity, successCallback?: (id: string) => any, errorCallback?: (error: Error) => any): JQueryXHR {
      return Messages.updateWebAPI(entity, null, successCallback, errorCallback);
    }

    /** Update the supplied entity and appends the supplied Web API query options. */
    /** @param entity The entity to update. */
    /** @param webAPIQueryOptions The Web API query options. */
    /** @param successCallback The function to be called on a successful response. */
    /** @param errorCallback The function to be called on an unsuccessful response. */
    public static updateWebAPI(entity: Entity, webAPIQueryOptions: string, successCallback?: (id: string) => any, errorCallback?: (error: Error) => any): JQueryXHR {
      let uri: string = ["/", entity.entityType.metadata.logicalCollectionName, "(", entity.id, ")"].join("");
      if (webAPIQueryOptions) {
        uri += ["?", webAPIQueryOptions].join("");
      }

      return Messages.queryWebAPI(
        "PATCH",
        uri,
        JSON.stringify(entity.objectForOperations),
        [
          { header: "OData-MaxVersion", value: "4.0" },
          { header: "OData-Version", value: "4.0" }
        ],
        function (data: any, textStatus: string, jqXHR: JQueryXHR) {
          if (successCallback) {
            let entityId: string = jqXHR.getResponseHeader("OData-EntityId")
            entityId = entityId.substr(entityId.indexOf("(") + 1, 36);
            entity.id = entityId;
            successCallback(entityId);
          }
        },
        function (jqXHR: JQueryXHR, textStatus: string, errorThrown: string) {
          if (errorCallback) {
            errorCallback(new Error(jqXHR.responseJSON.error.message));
          }
        });
    }

    /** Upserts the supplied entity. */
    /** @param entity The entity to update. */
    /** @param successCallback The function to be called on a successful response. */
    /** @param errorCallback The function to be called on an unsuccessful response. */
    public static upsert(entity: Entity, successCallback?: (id: string) => any, errorCallback?: (error: Error) => any): JQueryXHR {
      return Messages.updateWebAPI(entity, null, successCallback, errorCallback);
    }

    /** Upsert the supplied entity and appends the supplied Web API query options. */
    /** @param entity The entity to update. */
    /** @param webAPIQueryOptions The Web API query options. */
    /** @param successCallback The function to be called on a successful response. */
    /** @param errorCallback The function to be called on an unsuccessful response. */
    public static upsertWebAPI(entity: Entity, webAPIQueryOptions: string, successCallback?: (id: string) => any, errorCallback?: (error: Error) => any): JQueryXHR {
      let uri: string = ["/", entity.entityType.metadata.logicalCollectionName, "(", entity.id, ")"].join("");
      if (webAPIQueryOptions) {
        uri += ["?", webAPIQueryOptions].join("");
      }

      return Messages.queryWebAPI(
        "PATCH",
        uri,
        JSON.stringify(entity.objectForOperations),
        [
          { header: "OData-MaxVersion", value: "4.0" },
          { header: "OData-Version", value: "4.0" }
        ],
        function (data: any, textStatus: string, jqXHR: JQueryXHR) {
          if (successCallback) {
            let entityId: string = jqXHR.getResponseHeader("OData-EntityId")
            entityId = entityId.substr(entityId.indexOf("(") + 1, 36);
            entity.id = entityId;
            successCallback(entityId);
          }
        },
        function (jqXHR: JQueryXHR, textStatus: string, errorThrown: string) {
          if (errorCallback) {
            errorCallback(new Error(jqXHR.responseJSON.error.message));
          }
        });
    }

    /** Delete the supplied entity. */
    /** @param type The type of entity to delete. */
    /** @param id The id of the entity to delete. */
    /** @param successCallback The function to be called on a successful response. */
    /** @param errorCallback The function to be called on an unsuccessful response. */
    public static delete(type: typeof Entity, id: string, successCallback?: (id: string) => any, errorCallback?: (error: Error) => any): JQueryXHR {
      let uri: string = ["/", type.metadata.logicalCollectionName, "(", id, ")"].join("");

      return Messages.queryWebAPI(
        "DELETE",
        uri,
        null,
        [
          { header: "OData-MaxVersion", value: "4.0" },
          { header: "OData-Version", value: "4.0" }
        ],
        function (data: any, textStatus: string, jqXHR: JQueryXHR) {
          if (successCallback) {
            successCallback(id);
          }
        },
        function (jqXHR: JQueryXHR, textStatus: string, errorThrown: string) {
          if (errorCallback) {
            errorCallback(new Error(jqXHR.responseJSON.error.message));
          }
        });
    }

    /** Associate the target entity with the related entity in the supplied relationship. */
    /** @param navigationProperty The naigation property. */
    /** @param targetType The target entity type. */
    /** @param targetId The target entity Id. */
    /** @param relatedEntityType The related entity name. */
    /** @param relatedEntityId The related entity id. */
    /** @param successCallback The function to be called on a successful response. */
    /** @param errorCallback The function to be called on an unsuccessful response. */
    public static associate(navigationProperty: string, targetType: typeof Entity, targetId: string, relatedEntityType: typeof Entity, relatedEntityId: string, successCallback?: () => any, errorCallback?: (error: Error) => any): JQueryXHR {
      let uri: string = ["/", targetType.metadata.logicalCollectionName, "(", targetId, ")/", navigationProperty, "/$ref"].join("");

      return Messages.queryWebAPI(
        "POST",
        uri,
        JSON.stringify({
          "@odata.id": [Page.getWebAPIPath(), "/", relatedEntityType.metadata.logicalCollectionName, "(", relatedEntityId, ")"].join("")
        }),
        [
          { header: "OData-MaxVersion", value: "4.0" },
          { header: "OData-Version", value: "4.0" }
        ],
        function (data: any, textStatus: string, jqXHR: JQueryXHR) {
          if (successCallback) {
            successCallback();
          }
        },
        function (jqXHR: JQueryXHR, textStatus: string, errorThrown: string) {
          if (errorCallback) {
            errorCallback(new Error(jqXHR.responseJSON.error.message));
          }
        });
    }

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
    public static disassociate(navigationProperty: string, targetType: typeof Entity, targetId: string, relatedEntityType?: typeof Entity, relatedEntityId?: string, successCallback?: () => any, errorCallback?: (error: Error) => any): JQueryXHR {
      let uri: string = ["/", targetType.metadata.logicalCollectionName, "(", targetId, ")/", navigationProperty, "/$ref"].join("");
      if (relatedEntityType && relatedEntityId) {
        uri += ["?$id=", Page.getWebAPIPath(), "/", relatedEntityType.metadata.logicalCollectionName, "(", relatedEntityId, ")"].join("");
      }

      return Messages.queryWebAPI(
        "DELETE",
        uri,
        null,
        [
          { header: "OData-MaxVersion", value: "4.0" },
          { header: "OData-Version", value: "4.0" }
        ],
        function (data: any, textStatus: string, jqXHR: JQueryXHR) {
          if (successCallback) {
            successCallback();
          }
        },
        function (jqXHR: JQueryXHR, textStatus: string, errorThrown: string) {
          if (errorCallback) {
            errorCallback(new Error(jqXHR.responseJSON.error.message));
          }
        });
    }

    /** Set the state of the entity. */
    /** @param type The type of entity. */
    /** @param id The id of the entity. */
    /** @param statecode The statecode. */
    /** @param statuscode The statuscode. */
    /** @param successCallback The function to be called on a successful response. */
    /** @param errorCallback The function to be called on an unsuccessful response. */
    public static setState(type: typeof Entity, id: string, statecode: Number, statuscode: Number, successCallback?: () => any, errorCallback?: (error: Error) => any): JQueryXHR {
      return Messages.queryWebAPI(
        "PATCH",
        ["/", type.metadata.logicalCollectionName, "(", new Guid(id).toString("D"), ")"].join(""),
        JSON.stringify({
          statecode: statecode,
          statuscode: statuscode
        }),
        [
          { header: "OData-MaxVersion", value: "4.0" },
          { header: "OData-Version", value: "4.0" },
          { header: "Accept", value: "application/json" },
          { header: "Content-Type", value: "application/json; charset=utf-8" }
        ],
        function (data: any, textStatus: string, jqXHR: JQueryXHR) {
          if (successCallback) {
            successCallback();
          }
        },
        function (jqXHR: JQueryXHR, textStatus: string, errorThrown: string) {
          if (errorCallback) {
            errorCallback(new Error(jqXHR.responseJSON.error.message));
          }
        });
    }
  }

  export module Messages {
    /** Microsoft.Crm.Sdk.Messages JavaScript equivalent providing access to selected synchronous Web API operations
    NOTE: Synchronous Web API calls MAY ONLY be made for ribbon button enablement rules that require synchronous calls
    */
    export class Synchronous extends MessagesBase {
      /** Query the webAPI. */
      /** @param method The method. */
      /** @param webAPIQuery The Web API query. */
      /** @param data The data. */
      /** @param requestHeaders The request headers. */
      private static queryWebAPI(method: string, webAPIQuery: string, data?: any, requestHeaders?: { header: string, value: string }[]): JQueryXHR {
        let settings: JQueryAjaxSettings = {
          url: encodeURI([Page.getWebAPIPath(), webAPIQuery].join("")),
          async: false,
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          method: method,
          beforeSend: function (request) {
            if (requestHeaders) {
              for (let requestHeader of requestHeaders) {
                request.setRequestHeader(requestHeader.header, requestHeader.value);
              }
            }
          },
        };

        if (data) {
          settings.data = data;
        }

        return $.ajax(settings);
      }

      /** Retrieve the entity according to the supplied Web API query. */
      /** @param type The type of entity. */
      /** @param webAPIQuery The Web API query. */
      public static retrieveWebAPI(type: typeof Entity, webAPIQuery: string): Entity {
        let response = Synchronous.queryWebAPI(
          "GET",
          webAPIQuery,
          null,
          [
            { header: "OData-MaxVersion", value: "4.0" },
            { header: "OData-Version", value: "4.0" },
            { header: "Prefer", value: 'odata.include-annotations="*"' }
          ]);

        return Synchronous.processRetrievedEntities(type, [JSON.parse(response.responseText, Messages.jsonReviver)])[0];
      }

      /** Retrieve the supplied entity with the supplied id. */
      /** @param type The type of entity. */
      /** @param id The id of the entity to retrieve. */
      /** @param columns The columns to retrieve. Supply null to retrieve all columns. */
      public static retrieve(type: typeof Entity, id: string, columns: Metadata.AttributeMetadata[] = null): Entity {
        let parameters: string[] = [];

        if (columns) {
          let columnSet = new Query.ColumnSet(columns);
          if (!columnSet.allColumns) {
            parameters.push(["$select=", columnSet.webAPI].join(""));
          }
        }

        let query: string = ["/", type.metadata.logicalCollectionName, "(", new Guid(id).toString("D"), ")"].join("");
        if (parameters.length > 0) {
          query += ["?", parameters.join("&")].join("");
        }

        return Messages.Synchronous.retrieveWebAPI(
          type,
          query);
      }

      /** Retrieve the entities according to the supplied Web API query. */
      /** @param type The type of entity. */
      /** @param webAPIQuery The Web API query. */
      public static retrieveMultipleWebAPI(type: typeof Entity, webAPIQuery: string): Entity[] {
        let response = Synchronous.queryWebAPI(
          "GET",
          webAPIQuery,
          null,
          [
            { header: "OData-MaxVersion", value: "4.0" },
            { header: "OData-Version", value: "4.0" },
            { header: "Prefer", value: 'odata.include-annotations="*"' }
          ]);

        return Synchronous.processRetrievedEntities(type, JSON.parse(response.responseText, Messages.jsonReviver).value);
      }

      /** Retrieve the entities according to the supplied query expression. */
      /** @param type The type of entity. */
      /** @param query The query expression. */
      public static retrieveMultipleQuery(type: typeof Entity, query: Query.QueryExpression): Entity[] {
        return Synchronous.retrieveMultipleWebAPI(
          type,
          query.fetchXML);
      }

      /** Retrieve the supplied entities according to the supplied query. */
      /** @param type The type of entity. */
      /** @param criteria The criteria. */
      /** @param orders The order expressions. */
      /** @param columns The columns to retrieve. Supply null to retrieve all columns. */
      /** @param top The number of records to retrieve. Supply null to retrieve all records. */
      /** @param linkedEntities The linked entities. */
      public static retrieveMultiple(type: typeof Entity, criteria: Query.FilterExpression = new Query.FilterExpression(), orders: Query.OrderExpression[] = [], columns: Metadata.AttributeMetadata[] = null, top: Number = null, linkedEntities: Query.LinkEntity[] = []): Entity[] {
        let query: Query.QueryExpression = new Query.QueryExpression(type);
        query.columnSet = new Query.ColumnSet(columns);
        query.criteria = criteria;
        query.orders = orders;
        query.top = top;
        query.linkedEntities = linkedEntities;

        return Synchronous.retrieveMultipleQuery(
          type,
          query);
      }
    }
  }

  /** Microsoft.Xrm.Sdk.Query JavaScript equivalent */
  export class Query { }

  export module Query {
    export enum LogicalOperator {
      And,
      Or
    }

    export enum ConditionOperator {
      Between,
      Equal,
      EqualBusinessId,
      EqualUserId,
      EqualUserLanguage,
      GreaterEqual,
      GreaterThan,
      In,
      Last7Days,
      LastMonth,
      LastWeek,
      LastXDays,
      LastXHours,
      LastXMonths,
      LastXWeeks,
      LastXYears,
      LastYear,
      LessEqual,
      LessThan,
      Like,
      Next7Days,
      NextMonth,
      NextWeek,
      NextXDays,
      NextXHours,
      NextXMonths,
      NextXWeeks,
      NextXYears,
      NextYear,
      NotBetween,
      NotEqual,
      NotEqualBusinessId,
      NotEqualUserId,
      NotIn,
      NotLike,
      NotNull,
      NotOn,
      Null,
      OlderThanXMonths,
      On,
      OnOrAfter,
      OnOrBefore,
      ThisMonth,
      ThisWeek,
      ThisYear,
      Today,
      Tomorrow,
      Yesterday
    }

    export enum OrderType {
      Ascending,
      Descending
    }

    export class QueryExpression {
      public type: typeof Entity;
      public columnSet: ColumnSet;
      public criteria: FilterExpression;
      public distinct: boolean;
      public linkedEntities: LinkEntity[];
      public orders: OrderExpression[];
      public top: Number;

      /** Initializes a new instance of the OneXrm.Query.QueryExpression class. */
      /** @param type The type of entity to retrieve. */
      /** @param columnSet The column set. */
      /** @param criteria The filter expressions. */
      /** @param orders The order expressions. */
      /** @param top The number of records to retrieve. Supply null to retrieve all records. */
      /** @param linkedEntities The linked entities. */
      constructor(type: typeof Entity, columnSet: ColumnSet = new ColumnSet(null), criteria: FilterExpression = new FilterExpression(), orders: OrderExpression[] = [], top: Number = null, linkedEntities: LinkEntity[] = []) {
        this.type = type;
        this.columnSet = columnSet;
        this.criteria = criteria;
        this.linkedEntities = linkedEntities;
        this.orders = orders;
        this.top = top;
      }

      get fetchXML(): string {
        let fetchXML: string[] = [];

        fetchXML.push(['<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false"', this.top ? [' count="', this.top, '"'].join("") : "", ' >'].join(""));
        fetchXML.push(['<entity name="', this.type.metadata.logicalName, '">'].join(""));

        fetchXML.push(this.columnSet ? this.columnSet.fetchXML : '<all-attributes />');

        if (this.orders) {
          for (let order of this.orders) {
            fetchXML.push(order.fetchXML);
          }
        }

        if (this.criteria) {
          fetchXML.push(this.criteria.fetchXML);
        }

        if (this.linkedEntities) {
          for (let linkEntity of this.linkedEntities) {
            fetchXML.push(linkEntity.fetchXML);
          }
        }

        fetchXML.push('</entity>');
        fetchXML.push('</fetch>');

        let query: string = [
          "/",
          this.type.metadata.logicalCollectionName,
          "?fetchXml=",
          fetchXML.join("")].join("");

        return query;
      }

      get webAPI(): string {
        let parameters: string[] = [];

        if (this.columnSet && !this.columnSet.allColumns) {
          parameters.push(["$select=", this.columnSet.webAPI].join(""));
        }

        if (this.criteria && this.criteria.conditions.length + this.criteria.filters.length > 0) {
          parameters.push(["$filter=", this.criteria.webAPI].join(""));
        }

        if (this.orders && this.orders.length > 0) {
          let orders: string[] = [];
          for (let order of this.orders) {
            orders.push(order.webAPI);
          }
          parameters.push(["$orderby=", orders.join(",")].join(""));
        }

        if (this.top) {
          parameters.push(["$top=", this.top].join(""));
        }

        let query: string = ["/", this.type.metadata.logicalCollectionName].join("");
        if (parameters.length > 0) {
          query += ["?", parameters.join("&")].join("");
        }

        return query;
      }
    }

    export class ColumnSet {
      private _columns: Metadata.AttributeMetadata[] = [];

      /** Initializes a new instance of the OneXrm.Query.ColumnSet class. */
      /** @param columns The columns to retrieve. Supply null to retrieve all columns. */
      constructor(columns: Metadata.AttributeMetadata[] = null) {
        this.columns = columns;
      }

      get columns() {
        return this._columns;
      }
      set columns(value) {
        this._columns = value;
      }

      get allColumns() {
        return this.columns === null || this.columns.length === 0;
      }

      get fetchXML(): string {
        if (!this.allColumns && this.columns instanceof Array) {
          let columns: string[] = [];
          for (let column of this.columns) {
            columns.push(['<attribute name="', column.logicalName, '" />'].join(""));
          }
          return columns.join("");
        } else {
          return "<all-attributes />";
        }
      }

      get webAPI(): string {
        if (this.columns instanceof Array) {
          let columns: string[] = [];
          for (let column of this.columns) {
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
        } else {
          return "";
        }
      }
    }

    export class FilterExpression {
      filterOperator: LogicalOperator;
      filters: FilterExpression[];
      conditions: ConditionExpression[];

      /** Initializes a new instance of the OneXrm.Query.FilterExpression class. */
      /** @param filterOperator The filter operator. Defaults to OneXrm.Query.LogicalOperator.And. */
      /** @param filters The list of filters. */
      /** @param conditions The list of conditions. */
      constructor(filterOperator: LogicalOperator = LogicalOperator.And, filters: FilterExpression[] = [], conditions: ConditionExpression[] = []) {
        this.filterOperator = filterOperator;
        this.filters = filters;
        this.conditions = conditions;
      }

      get fetchXML(): string {
        let fetchXML: string[] = [];
        fetchXML.push(['<filter type="', this.filterOperator === LogicalOperator.And ? "and" : "or", '">'].join(""));
        if (this.filters) {
          for (let filter of this.filters) {
            fetchXML.push(filter.fetchXML);
          }
        }
        if (this.conditions) {
          for (let condition of this.conditions) {
            fetchXML.push(condition.fetchXML);
          }
        }
        fetchXML.push('</filter>');
        return fetchXML.join("");
      }

      get webAPI(): string {
        let clauses: string[] = [];

        for (let condition of this.conditions) {
          clauses.push(condition.webAPI);
        }

        for (let filter of this.filters) {
          clauses.push(["(", filter.webAPI, ")"].join(""));
        }

        return clauses.join(this.filterOperator === LogicalOperator.And ? " and " : " or ");
      }
    }

    export class ConditionExpression {
      attribute: Metadata.AttributeMetadata;
      conditionOperator: ConditionOperator;
      values: Object[];

      /** Initializes a new instance of the OneXrm.Query.ConditionExpression class. */
      /** @param attribute The attribute. */
      /** @param conditionOperator The condition operator. */
      /** @param values The value(s). */
      constructor(attribute: Metadata.AttributeMetadata, conditionOperator: ConditionOperator, values: Object | Object[] = []) {
        this.attribute = attribute;
        this.conditionOperator = conditionOperator;
        this.values = (values instanceof Array ? values : [values]);
      }

      get fetchXML(): string {
        switch (this.values.length) {
          case 0: return ['<condition attribute="', this.attribute.logicalName, '" operator="', this.fetchXMLOperator(), '" />'].join("");
          case 1: return ['<condition attribute="', this.attribute.logicalName, '" operator="', this.fetchXMLOperator(), '" value="', this.values[0], '" />'].join("");
          default:
            let values: string[] = [];
            for (let value of this.values) {
              values.push(['<value>', value, '</value>'].join(""));
            }
            return ['<condition attribute="', this.attribute.logicalName, '" operator="', this.fetchXMLOperator(), '">', values.join(""), '</condition>'].join("")
        }
      }

      private fetchXMLOperator(): string {
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
      }

      get webAPI(): string {
        return [this.webAPIAttribute(), " ", this.webAPIOperator(), " ", this.webAPIValue()].join("");
      }

      private webAPIAttribute(): string {
        switch (this.attribute.attributeType) {
          case Metadata.AttributeTypeCode.Lookup: return ["_", this.attribute.logicalName, "_value"].join("");
          default: return this.attribute.logicalName;
        }
      }

      private webAPIOperator(): string {
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
      }

      private webAPIValue() {
        switch (this.attribute.attributeType) {
          case Metadata.AttributeTypeCode.Lookup: return this.values[0];
          default:
            switch (typeof this.values[0]) {
              case "string": return ["'", this.values[0], "'"].join("");
              default: return this.values[0];
            }
        }
      }
    }

    export class OrderExpression {
      attribute: Metadata.AttributeMetadata;
      orderType: OrderType;

      /** Initializes a new instance of the OneXrm.Query.OrderExpression class. */
      /** @param attribute The attribute. */
      /** @param orderType The order type. Defaults to OneXrm.Query.OrderType.Ascending. */
      constructor(attribute: Metadata.AttributeMetadata, orderType: OrderType = OrderType.Ascending) {
        this.attribute = attribute;
        this.orderType = orderType;
      }

      get fetchXML(): string {
        return ['<order attribute="', this.attribute.logicalName, '" descending="', this.orderType === OrderType.Descending ? "true" : "false", '" />'].join("");
      }

      get webAPI() {
        return [this.attribute.logicalName, " ", this.orderType === OrderType.Descending ? "desc" : "asc"].join("");
      }
    }

    export class LinkEntity {
      public alias: string;
      public parentAttribute: Metadata.AttributeMetadata;
      public attribute: Metadata.AttributeMetadata;
      public criteria: FilterExpression;
      public linkedEntities: LinkEntity[];
      public type: typeof Entity;

      /** Initializes a new instance of the OneXrm.Query.LinkEntity class. */
      /** @param parentAttribute The attribute to link from on the parent entity. */
      /** @param type The type of entity to link to. */
      /** @param attribute The attribute to link to. */
      /** @param criteria The filter expressions. */
      /** @param alias The alias. */
      /** @param linkedEntities The linked entities. */
      constructor(parentAttribute: Metadata.AttributeMetadata, type: typeof Entity, attribute: Metadata.AttributeMetadata, criteria: FilterExpression = new FilterExpression(), alias?: string, linkedEntities: LinkEntity[] = []) {
        this.parentAttribute = parentAttribute;
        this.type = type;
        this.attribute = attribute;
        this.criteria = criteria;
        this.alias = alias;
        this.linkedEntities = linkedEntities;
      }

      get fetchXML(): string {
        let fetchXML: string[] = [];
        fetchXML.push(['<link-entity name="', this.type.metadata.logicalName, '" from="', this.attribute.logicalName, '" to="', this.parentAttribute.logicalName, '"', this.alias ? [' alias="', this.alias, '"'].join("") : "", '>'].join(""));
        if (this.criteria) {
          fetchXML.push(this.criteria.fetchXML);
        }
        if (this.linkedEntities) {
          for (let linkEntity of this.linkedEntities) {
            fetchXML.push(linkEntity.fetchXML);
          }
        }
        fetchXML.push('</link-entity>');

        return fetchXML.join("");
      }

      get webAPI() {
        throw new Error("OneXrm.Query.LinkEntity.webAPI not supported");
      }
    }
  }

  /** Microsoft.Xrm.Sdk.Entity JavaScript equivalent */
  export class Entity {
    public readonly entityType: typeof Entity = Entity;
    public static readonly metadata: OneXrm.Metadata.EntityMetadata;

    public id: string;
    public logicalName: string;

    /** Initializes a new instance of the OneXrm.Entities.Account class. */
    /** @param logicalName The logical name of the entity. */
    constructor(logicalName) {
      this.logicalName = logicalName;
    }

    /** Gets the object for use in create/update operations. */
    get objectForOperations(): Object {
      let entity = {};

      for (let attributeName in this.entityType.Attributes) {
        let attributeMetadata = this.entityType.Attributes[attributeName] as Metadata.AttributeMetadata;
        let attribute = this[attributeMetadata.logicalName];

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
            default: alert(["OneXrm.Entity.objectForOperations: Unhandled attribute type: ", attributeMetadata.attributeType].join("")); break;
          }
        }
      }

      return entity;
    }
  }

  export module Entity {
    export module Attributes {
      // Force instantiation of the module
      var dummy;
    }
  }

  /** Microsoft.Xrm.Sdk.EntityReference JavaScript equivalent */
  export class EntityReference {
    public id: string;
    public type: typeof Entity;
    public logicalName: string;
    public name?: string;

    /** Initializes a new instance of the EntityReference class. */
    /** @param id The id. */
    /** @param logicalName The logical name of the entity. */
    /** @param name The name. */
    /** @param type The type. Only required if the field will be written to. */
    constructor(id: string, logicalName: string, name?: string, type?: typeof Entity) {
      this.id = new Guid(id).toString();
      this.logicalName = logicalName;
      this.name = name;
      this.type = type;
    }
  }

  /** Microsoft.Xrm.Sdk.Metadata JavaScript equivalent */
  export class Metadata { }

  export module Metadata {
    export enum AttributeTypeCode {
      Boolean = 0,
      Customer = 1,
      DateTime = 2,
      Decimal = 3,
      Double = 4,
      Integer = 5,
      Lookup = 6,
      Memo = 7,
      Money = 8,
      Owner = 9,
      PartyList = 10,
      Picklist = 11,
      State = 12,
      Status = 13,
      String = 14,
      Uniqueidentifier = 15,
      CalendarRules = 16,
      Virtual = 17,
      BigInt = 18,
      ManagedProperty = 19,
      EntityName = 20
    }

    /** Microsoft.Xrm.Sdk.Metadata.EntityMetadata JavaScript equivalent */
    export class EntityMetadata {
      public isCustomEntity: boolean;
      public logicalCollectionName: string;
      public logicalName: string;
      public objectTypeCode?: number;
      public primaryIdAttribute: string;
      public schemaName: string;
    }

    /** Microsoft.Xrm.Sdk.Metadata.AttributeMetadata JavaScript equivalent */
    export class AttributeMetadata {
      public attributeType: Metadata.AttributeTypeCode;
      public logicalName: string;
      public schemaName: string;
      public targets?: string[];
    }
  }

  /** Utilities */
  export class Utils {
    /** Checks the supplied value object for empty string and replaces with the replament value if empty string. */
    /** @param value The object to check for empty string. */
    /** @param replace The value to replace with. */
    public static cvEmptyString(value: any, replace: any = null): any {
      if (value === "") {
        return replace;
      } else {
        return value;
      }
    }

    /** Checks the supplied value object for null and replaces with the replament value if null. */
    /** @param value The object to check for null. */
    /** @param replace The value to replace with. */
    public static cvNull(value: any, replace: any = null): any {
      if (value === null) {
        return replace;
      } else {
        return value;
      }
    }

    /** Checks the supplied value object for undefined and replaces with the replament value if undefined. */
    /** @param value The object to check for undefined. */
    /** @param replace The value to replace with. */
    public static cvUndefined(value: any, replace: any = null): any {
      if (value === undefined) {
        return replace;
      } else {
        return value;
      }
    }

    /** Gets the querystring parameter with the supplied key. */
    /** @param window The window object. */
    /** @param entityName The key of the parameter. */
    static getQueryStringParameter(window: Window, key: string): string {
      key = key.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
      let regex = new RegExp("[\\?&]" + key + "=([^&#]*)");
      let match = regex.exec(window.location.href);
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

      return null
    }

    /** Returns a value indicating whether the supplied value is equal to any of the supplied values. */
    /** @param value The value. */
    /** @param values The values. */
    public static isIn(value: any, ...values: any[]): boolean {
      return values.indexOf(value) > -1;
    }

    /** Converts the current supplied value to a String object. */
    /** @param value The value. */
    public static toString(value: any): string {
      return [value].join("");
    }
  }

  /** Xrm.Page extensions */
  export class Page {
    private static userRoleNames: string[] = null;

    /** Gets the context object. */
    public static context() {
      if (typeof window.GetGlobalContext !== "undefined") {
        return window.GetGlobalContext();
      } else {
        if (typeof Xrm !== "undefined") {
          return Xrm.Page.context;
        } else {
          throw new Error("Context is not available.");
        }
      }
    }

    /** Gets the server URL from the context. */
    public static getClientUrl(): string {
      return Page.context().getClientUrl();
    }

    /** Gets the path to the Web API endpoint. */
    public static getWebAPIPath(): string {
      return [Page.getClientUrl(), "/api/data/v8.2"].join("");
    }

    /** Gets an array of strings that represent the names of each of the security roles that the user has. */
    /** @param successCallback The function to be called on a successful response. */
    /** @param errorCallback The function to be called on an unsuccessful response. */
    public static getUserRoleNames(successCallback?: (userRoleNames: string[]) => any, errorCallback?: (error: Error) => any): JQueryXHR {
      if (Page.userRoleNames === null) {
        let filterRoleIds: string[] = [];
        let roleIds: string[] = Xrm.Page.context.getUserRoles();
        for (let roleId of roleIds) {
          filterRoleIds.push(["roleid eq ", new Guid(roleId).toString()].join(""));
        }

        return Messages.queryWebAPI(
          "GET",
          ["/roles?$select=name&$filter=", filterRoleIds.join(" or ")].join(""),
          null,
          [
            { header: "OData-MaxVersion", value: "4.0" },
            { header: "OData-Version", value: "4.0" }
          ],
          function (data: any, textStatus: string, jqXHR: JQueryXHR) {
            Page.userRoleNames = [];
            let roles = JSON.parse(jqXHR.responseText).value;
            for (let role of roles) {
              Page.userRoleNames.push(role.name);
            }

            if (successCallback) {
              successCallback(Page.userRoleNames);
            }
          },
          function (jqXHR: JQueryXHR, textStatus: string, errorThrown: string) {
            throw new Error(jqXHR.responseJSON.error.message);
          });
      } else {
        if (successCallback) {
          successCallback(Page.userRoleNames);
        }

        return null;
      }
    }

    /** Gets an value indicating if the user has any of the supplied roles. */
    /** @param roleNames The names of the roles to check for. */
    /** @param successCallback The function to be called on a successful response. */
    /** @param errorCallback The function to be called on an unsuccessful response. */
    public static userHasRoles(roleNames: string[], successCallback?: (userHasRole: boolean) => any, errorCallback?: (error: Error) => any): JQueryXHR {
      return Page.getUserRoleNames(
        function (userRoleNames) {
          if (successCallback) {
            successCallback(Enumerable.From(userRoleNames).Intersect(roleNames).Any());
          }
        },
        function (error) {
          if (errorCallback) {
            errorCallback(error);
          }
        }
      );
    }
  }

  /** OneXrm.Guid class */
  export class Guid {
    private value: string = "00000000000000000000000000000000";

    /** Initializes a new instance of the Guid class. */
    /** @param value The value. */
    constructor(value: string = "00000000000000000000000000000000") {
      this.value = value.replace(/[-{}]/g, "").toLowerCase();
    }

    /** Converts the value of the current Guid to its String equivalent. */
    /** @param format The format to convert to. Possible values are:
    N: 00000000000000000000000000000000
    D: 00000000-0000-0000-0000-000000000000
    B: {00000000-0000-0000-0000-000000000000}
    Anything else: 00000000-0000-0000-0000-000000000000
    */
    public toString(format: string = ""): string {
      switch (format.toUpperCase()) {
        case 'N': return this.value;
        case 'B': return ["{", this.value.substr(0, 8), "-", this.value.substr(8, 4), "-", this.value.substr(12, 4), "-", this.value.substr(16, 4), "-", this.value.substr(20, 12), "}"].join("");
        default: return [this.value.substr(0, 8), "-", this.value.substr(8, 4), "-", this.value.substr(12, 4), "-", this.value.substr(16, 4), "-", this.value.substr(20, 12)].join("");
      }
    }

    /** Gets a value indicating whether the current Guid is equal to the suppled Guid. */
    /** @param value The value to compare */
    public equals(value: Guid | string): boolean {
      if (value instanceof Guid) {
        return this.toString() === value.toString();
      } else {
        return this.toString() === new Guid(value).toString();
      }
    }

    /** Gets a value indicating whether the supplied guids are equal. */
    /** @param values The values to compare */
    public static equals(...values: any[]): boolean {
      if (values.length < 2) { return false; }
      for (let i = 0; i < values.length; i++) {
        switch (true) {
          case values[i] instanceof Guid: break;
          case (typeof values[i] === "string"): values[i] = new Guid(values[i]); break;
          default: return false;
        }
      }
      let value1: Guid = values[0];
      for (let value of values) {
        if (!value1.equals(value)) { return false; }
      }
      return true;
    }
  }

  export module Guid {
    export const Empty = new Guid("00000000-0000-0000-0000-000000000000");
  }
}