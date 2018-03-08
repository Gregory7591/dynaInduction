/// <reference path="../../../OneXrm/OneXrm.ts" include="true" />
/// <reference path="../../../OneXrm/OneXrm.Entities.contact.ts" include="true" />
var DynaInduction;
(function (DynaInduction) {
    var Forms;
    (function (Forms) {
        var contact;
        (function (contact) {
            var ribbon = /** @class */ (function () {
                function ribbon() {
                }
                ribbon.onLoad = function (context) {
                    DynaInduction.Forms.contact.ribbon.addSixMonthsInvestmentPeriod(context);
                };
                ribbon.estimatedReturn = function (context) {
                    var intialInvestment = Xrm.Page.getAttribute(OneXrm.Entities.contact.Attributes.di_intialinvesmentfinal.logicalName).getValue();
                    var investmentPeriod = Xrm.Page.getAttribute(OneXrm.Entities.contact.Attributes.di_investmentperiod.logicalName).getValue();
                    var interestRate = (Xrm.Page.getAttribute(OneXrm.Entities.contact.Attributes.di_interest_rate.logicalName).getValue()) / 100;
                    if (intialInvestment != 0 && investmentPeriod != 0 && interestRate != 0) {
                        Xrm.Page.getAttribute(OneXrm.Entities.contact.Attributes.di_esitimatedreturnfinal.logicalName).setValue(intialInvestment * (1 + (interestRate * investmentPeriod)));
                    }
                };
                ribbon.addSixMonthsInvestmentPeriod = function (context) {
                    var investmentPeriod = Xrm.Page.getAttribute(OneXrm.Entities.contact.Attributes.di_investmentperiod.logicalName).getValue() + 6;
                    Xrm.Page.getAttribute(OneXrm.Entities.contact.Attributes.di_investmentperiod.logicalName).setValue(investmentPeriod);
                    DynaInduction.Forms.contact.ribbon.estimatedReturn(context);
                };
                return ribbon;
            }());
            contact.ribbon = ribbon;
        })(contact = Forms.contact || (Forms.contact = {}));
    })(Forms = DynaInduction.Forms || (DynaInduction.Forms = {}));
})(DynaInduction || (DynaInduction = {}));
window["DynaInduction"] = window["DynaInduction"] || DynaInduction;
window["DynaInduction"].Forms = window["DynaInduction"].Forms || DynaInduction.Forms;
window["DynaInduction"].Forms.contact = window["DynaInduction"].Forms.contact || DynaInduction.Forms.contact;
window["DynaInduction"].Forms.contact.ribbon = window["DynaInduction"].Forms.contact.Event || DynaInduction.Forms.contact.ribbon;
