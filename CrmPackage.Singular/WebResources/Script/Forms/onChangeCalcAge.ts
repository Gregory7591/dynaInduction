/// <reference path="../../../OneXrm/OneXrm.ts" include="true" />
/// <reference path="../../../OneXrm/OneXrm.Entities.contact.ts" include="true" />

module DynaInduction {
  export module Forms {
    export module contact {
      export class Contact {
        public static onLoad(): void {
          //FinalDynamicsChallenge.Forms.contact.Contact.attachEvents(context);
          //FinalDynamicsChallenge.Forms.contact.Contact.businessRules(context, true);
          DynaInduction.Forms.contact.Contact.workAge();
          DynaInduction.Forms.contact.Contact.prefMethodCom();
        }

        public static onChange(context: Xrm.Page.EventContext): void {
          DynaInduction.Forms.contact.Contact.prefMethodCom();
        }

        public static onSave(context: Xrm.Page.EventContext): void { }

        private static attachEvents(context: Xrm.Page.EventContext): void { }

        private static businessRules(context: Xrm.Page.EventContext, onLoad: boolean = false): void { }


        private static workAge(): void {

          var currentDate = new Date();
          let BirthDate = (<Xrm.Page.DateAttribute>Xrm.Page.getAttribute(OneXrm.Entities.contact.Attributes.di_dateofbirth.logicalName)).getValue();

          var dateDiff = currentDate.getMonth() - BirthDate.getMonth();
          if (dateDiff > -1) {
            (<Xrm.Page.NumberAttribute>Xrm.Page.getAttribute(OneXrm.Entities.contact.Attributes.di_age.logicalName)).setValue(currentDate.getFullYear() - BirthDate.getFullYear());
          }
          else {
            (<Xrm.Page.NumberAttribute>Xrm.Page.getAttribute(OneXrm.Entities.contact.Attributes.di_age.logicalName)).setValue(currentDate.getFullYear() - BirthDate.getFullYear() - 1);
          }

        }
        private static prefMethodCom(): void {
          var prefferedContactMethodCode = (<Xrm.Page.OptionSetAttribute>Xrm.Page.getAttribute(OneXrm.Entities.contact.Attributes.preferredcontactmethodcode.logicalName)).getValue();
          (<Xrm.Page.LookupAttribute>Xrm.Page.getAttribute(OneXrm.Entities.contact.Attributes.emailaddress1.logicalName)).setRequiredLevel((prefferedContactMethodCode === OneXrm.OptionSets.contact_preferredcontactmethodcode.Any || prefferedContactMethodCode === 2) ? "required" : "none");
          (<Xrm.Page.LookupAttribute>Xrm.Page.getAttribute(OneXrm.Entities.contact.Attributes.mobilephone.logicalName)).setRequiredLevel((prefferedContactMethodCode === 3 ? "required" : "none"));
          (<Xrm.Page.LookupAttribute>Xrm.Page.getAttribute(OneXrm.Entities.contact.Attributes.fax.logicalName)).setRequiredLevel((prefferedContactMethodCode === 4 ? "required" : "none"));

        }
      }

    }
  }
}

window["DynaInduction"] = window["DynaInduction"] || DynaInduction;
window["DynaInduction"].Forms = window["DynaInduction"].Forms || DynaInduction.Forms;
window["DynaInduction"].Forms.contact = window["DynaInduction"].Forms.contact || DynaInduction.Forms.contact;
window["DynaInduction"].Forms.contact.Contact = window["DynaInduction"].Forms.contact.Event || DynaInduction.Forms.contact.Contact;