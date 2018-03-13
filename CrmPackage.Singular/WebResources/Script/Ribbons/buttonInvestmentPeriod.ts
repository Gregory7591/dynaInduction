/// <reference path="../../../OneXrm/OneXrm.ts" include="true" />
/// <reference path="../../../OneXrm/OneXrm.Entities.contact.ts" include="true" />

module DynaInduction {
  export module Forms {
    export module contact {
      export class ribbon {
        public static onLoad(context: Xrm.Page.EventContext): void {
          DynaInduction.Forms.contact.ribbon.addSixMonthsInvestmentPeriod(context);
        }

        private static estimatedReturn(context: Xrm.Page.EventContext) {
          var intialInvestment = (<Xrm.Page.NumberAttribute>Xrm.Page.getAttribute(OneXrm.Entities.contact.Attributes.di_intialinvesmentfinal.logicalName)).getValue();
          var investmentPeriod = (<Xrm.Page.NumberAttribute>Xrm.Page.getAttribute(OneXrm.Entities.contact.Attributes.di_investmentperiod.logicalName)).getValue();
          var interestRate = ((<Xrm.Page.NumberAttribute>Xrm.Page.getAttribute(OneXrm.Entities.contact.Attributes.di_interest_rate.logicalName)).getValue()) / 100;
          if (intialInvestment != 0 && investmentPeriod != 0 && interestRate != 0) {
            (<Xrm.Page.NumberAttribute>Xrm.Page.getAttribute(OneXrm.Entities.contact.Attributes.di_esitimatedreturnfinal.logicalName)).setValue(intialInvestment * (1 + (interestRate * investmentPeriod)));
          }
        }
        private static addSixMonthsInvestmentPeriod(context: Xrm.Page.EventContext) {
          var investmentPeriod = (<Xrm.Page.NumberAttribute>Xrm.Page.getAttribute(OneXrm.Entities.contact.Attributes.di_investmentperiod.logicalName)).getValue() + 6;
          (<Xrm.Page.NumberAttribute>Xrm.Page.getAttribute(OneXrm.Entities.contact.Attributes.di_investmentperiod.logicalName)).setValue(investmentPeriod);
          DynaInduction.Forms.contact.ribbon.estimatedReturn(context);
           var date = (<Xrm.Page.DateAttribute>Xrm.Page.getAttribute(OneXrm.Entities.contact.Attributes.di_maturity_date.logicalName)).getValue();
          date.setMonth(date.getMonth() + 6);
          (<Xrm.Page.DateAttribute>Xrm.Page.getAttribute(OneXrm.Entities.contact.Attributes.di_maturity_date.logicalName)).setValue(date);
        }
      }
    }
  }
}

window["DynaInduction"] = window["DynaInduction"] || DynaInduction;
window["DynaInduction"].Forms = window["DynaInduction"].Forms || DynaInduction.Forms;
window["DynaInduction"].Forms.contact = window["DynaInduction"].Forms.contact || DynaInduction.Forms.contact;
window["DynaInduction"].Forms.contact.ribbon = window["DynaInduction"].Forms.contact.Event || DynaInduction.Forms.contact.ribbon;