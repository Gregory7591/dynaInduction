/// <reference path="../../../OneXrm/OneXrm.ts" include="true" />
/// <reference path="../../../OneXrm/OneXrm.Entities.contact.ts" include="true" />

module DynaInduction {
  export module Forms {
    export module contact {
      export class ribbonStatus {
        private static matured(context: Xrm.Page.EventContext) {
          var currentDate = new Date();
          var maturityDate = (<Xrm.Page.DateAttribute>Xrm.Page.getAttribute(OneXrm.Entities.contact.Attributes.di_maturity_date.logicalName)).getValue();
          if (maturityDate <= currentDate) {
            (<Xrm.Page.OptionSetAttribute>Xrm.Page.getAttribute(OneXrm.Entities.contact.Attributes.statuscode.logicalName)).setValue(OneXrm.OptionSets.contact_statuscode.Matured);
          }
          else
            alert("Cannot change status to matured as the investment is not past its maturity date");
        }
      }
    }
  }
}

window["DynaInduction"] = window["DynaInduction"] || DynaInduction;
window["DynaInduction"].Forms = window["DynaInduction"].Forms || DynaInduction.Forms;
window["DynaInduction"].Forms.contact = window["DynaInduction"].Forms.contact || DynaInduction.Forms.contact;
window["DynaInduction"].Forms.contact.ribbonStatus = window["DynaInduction"].Forms.contact.Event || DynaInduction.Forms.contact.ribbonStatus;