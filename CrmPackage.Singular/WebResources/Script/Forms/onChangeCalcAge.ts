/// <reference path="../../../OneXrm/OneXrm.ts" include="true" />
/// <reference path="../../../OneXrm/OneXrm.Entities.contact.ts" include="true" />

module DynaInduction {
  export module Forms {
    export module contact {
      export class Contact {
        public static onLoad(context: Xrm.Page.EventContext): void {
          //FinalDynamicsChallenge.Forms.contact.Contact.attachEvents(context);
          //FinalDynamicsChallenge.Forms.contact.Contact.businessRules(context, true);
          DynaInduction.Forms.contact.Contact.prefMethodCom(context);
          DynaInduction.Forms.contact.Contact.lockFullName(context); 
          }

        public static onChange(context: Xrm.Page.EventContext): void {
          DynaInduction.Forms.contact.Contact.prefMethodCom(context);
          if ((<Xrm.Page.StringAttribute>Xrm.Page.getAttribute(OneXrm.Entities.contact.Attributes.birthdate.logicalName)).getValue() != null) {
            DynaInduction.Forms.contact.Contact.workAge(context);
          }  
        }

        public static onSave(context: Xrm.Page.EventContext): void {
          DynaInduction.Forms.contact.Contact.lockFullName(context);}

        private static attachEvents(context: Xrm.Page.EventContext): void { }

        private static businessRules(context: Xrm.Page.EventContext, onLoad: boolean = false): void { }

        private static lockFullName(context: Xrm.Page.EventContext): void {
          if ((<Xrm.Page.StringAttribute>Xrm.Page.getAttribute(OneXrm.Entities.contact.Attributes.fullname.logicalName)).getValue() != null) {
            Xrm.Page.getControl(OneXrm.Entities.contact.Attributes.fullname.logicalName).setDisabled(true);
           }
        }
      
        private static workAge(context: Xrm.Page.EventContext): void {
          var currentDate = new Date();
          var BirthDate = (<Xrm.Page.DateAttribute>Xrm.Page.getAttribute(OneXrm.Entities.contact.Attributes.birthdate.logicalName)).getValue();
          var dateDiff = currentDate.getMonth() - BirthDate.getMonth();
         if (dateDiff > -1) {
            (<Xrm.Page.NumberAttribute>Xrm.Page.getAttribute(OneXrm.Entities.contact.Attributes.di_age.logicalName)).setValue(currentDate.getFullYear() - BirthDate.getFullYear());
          }
          else {
            (<Xrm.Page.NumberAttribute>Xrm.Page.getAttribute(OneXrm.Entities.contact.Attributes.di_age.logicalName)).setValue(currentDate.getFullYear() - BirthDate.getFullYear() - 1);
          }
        }
        private static prefMethodCom(context: Xrm.Page.EventContext): void {
          var prefferedContactMethodCode = (<Xrm.Page.OptionSetAttribute>Xrm.Page.getAttribute(OneXrm.Entities.contact.Attributes.preferredcontactmethodcode.logicalName)).getValue();
          (<Xrm.Page.LookupAttribute>Xrm.Page.getAttribute(OneXrm.Entities.contact.Attributes.emailaddress1.logicalName)).setRequiredLevel((prefferedContactMethodCode === OneXrm.OptionSets.contact_preferredcontactmethodcode.Any || prefferedContactMethodCode === 2) ? "required" : "required");
          (<Xrm.Page.LookupAttribute>Xrm.Page.getAttribute(OneXrm.Entities.contact.Attributes.mobilephone.logicalName)).setRequiredLevel((prefferedContactMethodCode === 3 ? "required" : "none"));
          (<Xrm.Page.LookupAttribute>Xrm.Page.getAttribute(OneXrm.Entities.contact.Attributes.fax.logicalName)).setRequiredLevel((prefferedContactMethodCode === 4 ? "required" : "none"));
        }

        private static estimatedReturn(context: Xrm.Page.EventContext) {
          var intialInvestment = (<Xrm.Page.NumberAttribute>Xrm.Page.getAttribute(OneXrm.Entities.contact.Attributes.di_intialinvesmentfinal.logicalName)).getValue();
          var investmentPeriod = (<Xrm.Page.NumberAttribute>Xrm.Page.getAttribute(OneXrm.Entities.contact.Attributes.di_investmentperiod.logicalName)).getValue();
          var interestRate = ((<Xrm.Page.NumberAttribute>Xrm.Page.getAttribute(OneXrm.Entities.contact.Attributes.di_interest_rate.logicalName)).getValue())/100;
          if ((intialInvestment != null) && (investmentPeriod != null) && (interestRate != null)) {
            (<Xrm.Page.NumberAttribute>Xrm.Page.getAttribute(OneXrm.Entities.contact.Attributes.di_esitimatedreturnfinal.logicalName)).setValue(intialInvestment * (1 + (interestRate * investmentPeriod)));
          }
        }

        private static calculateMaturityDate(context: Xrm.Page.EventContext) {
          var joiningDate = (<Xrm.Page.DateAttribute>Xrm.Page.getAttribute(OneXrm.Entities.contact.Attributes.di_joining_date.logicalName)).getValue();
          var investmentPeriod = ((<Xrm.Page.NumberAttribute>Xrm.Page.getAttribute(OneXrm.Entities.contact.Attributes.di_investmentperiod.logicalName)).getValue());
          if (joiningDate != null && investmentPeriod != null) {
            joiningDate.setMonth(joiningDate.getMonth() + investmentPeriod);
            (<Xrm.Page.DateAttribute>Xrm.Page.getAttribute(OneXrm.Entities.contact.Attributes.di_maturity_date.logicalName)).setValue(joiningDate);
          }
        } 
      }
    }
  }
}

window["DynaInduction"] = window["DynaInduction"] || DynaInduction;
window["DynaInduction"].Forms = window["DynaInduction"].Forms || DynaInduction.Forms;
window["DynaInduction"].Forms.contact = window["DynaInduction"].Forms.contact || DynaInduction.Forms.contact;
window["DynaInduction"].Forms.contact.Contact = window["DynaInduction"].Forms.contact.Event || DynaInduction.Forms.contact.Contact;