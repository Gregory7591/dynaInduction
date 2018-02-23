/// <reference path="../../../OneXrm/OneXrm.ts" include="true" />
/// <reference path="../../../OneXrm/OneXrm.Entities.contact.ts" include="true" />
var DynaInduction;
(function (DynaInduction) {
    var Forms;
    (function (Forms) {
        var contact;
        (function (contact) {
            var Contact = /** @class */ (function () {
                function Contact() {
                }
                Contact.onLoad = function (context) {
                    //FinalDynamicsChallenge.Forms.contact.Contact.attachEvents(context);
                    //FinalDynamicsChallenge.Forms.contact.Contact.businessRules(context, true);
                    DynaInduction.Forms.contact.Contact.prefMethodCom(context);
                    DynaInduction.Forms.contact.Contact.lockFullName(context);
                };
                Contact.onChange = function (context) {
                    DynaInduction.Forms.contact.Contact.prefMethodCom(context);
                    if (Xrm.Page.getAttribute(OneXrm.Entities.contact.Attributes.birthdate.logicalName).getValue() != null) {
                        DynaInduction.Forms.contact.Contact.workAge(context);
                    }
                };
                Contact.onSave = function (context) {
                    DynaInduction.Forms.contact.Contact.lockFullName(context);
                };
                Contact.attachEvents = function (context) { };
                Contact.businessRules = function (context, onLoad) {
                    if (onLoad === void 0) { onLoad = false; }
                };
                Contact.lockFullName = function (context) {
                    if (Xrm.Page.getAttribute(OneXrm.Entities.contact.Attributes.fullname.logicalName).getValue() != null) {
                        Xrm.Page.getControl(OneXrm.Entities.contact.Attributes.fullname.logicalName).setDisabled(true);
                        //Xrm.Page.ui.getFormType();
                    }
                };
                Contact.workAge = function (context) {
                    var currentDate = new Date();
                    var BirthDate = Xrm.Page.getAttribute(OneXrm.Entities.contact.Attributes.birthdate.logicalName).getValue();
                    var dateDiff = currentDate.getMonth() - BirthDate.getMonth();
                    if (dateDiff > -1) {
                        Xrm.Page.getAttribute(OneXrm.Entities.contact.Attributes.di_age.logicalName).setValue(currentDate.getFullYear() - BirthDate.getFullYear());
                    }
                    else {
                        Xrm.Page.getAttribute(OneXrm.Entities.contact.Attributes.di_age.logicalName).setValue(currentDate.getFullYear() - BirthDate.getFullYear() - 1);
                    }
                };
                Contact.prefMethodCom = function (context) {
                    var prefferedContactMethodCode = Xrm.Page.getAttribute(OneXrm.Entities.contact.Attributes.preferredcontactmethodcode.logicalName).getValue();
                    Xrm.Page.getAttribute(OneXrm.Entities.contact.Attributes.emailaddress1.logicalName).setRequiredLevel((prefferedContactMethodCode === OneXrm.OptionSets.contact_preferredcontactmethodcode.Any || prefferedContactMethodCode === 2) ? "required" : "required");
                    Xrm.Page.getAttribute(OneXrm.Entities.contact.Attributes.mobilephone.logicalName).setRequiredLevel((prefferedContactMethodCode === 3 ? "required" : "none"));
                    Xrm.Page.getAttribute(OneXrm.Entities.contact.Attributes.fax.logicalName).setRequiredLevel((prefferedContactMethodCode === 4 ? "required" : "none"));
                };
                Contact.estimatedReturn = function (context) {
                    var intialInvestment = Xrm.Page.getAttribute(OneXrm.Entities.contact.Attributes.di_intialinvesmentfinal.logicalName).getValue();
                    var investmentPeriod = Xrm.Page.getAttribute(OneXrm.Entities.contact.Attributes.di_investmentperiod.logicalName).getValue();
                    var interestRate = (Xrm.Page.getAttribute(OneXrm.Entities.contact.Attributes.di_interest_rate.logicalName).getValue()) / 100;
                    if (intialInvestment != 0 && investmentPeriod != 0 && interestRate != 0) {
                        Xrm.Page.getAttribute(OneXrm.Entities.contact.Attributes.di_esitimatedreturnfinal.logicalName).setValue(intialInvestment * (1 + (interestRate * investmentPeriod)));
                    }
                };
                Contact.addSixMonthsInvestmentPeriod = function (context) {
                    var investmentPeriod = Xrm.Page.getAttribute(OneXrm.Entities.contact.Attributes.di_investmentperiod.logicalName).getValue() + 6;
                    Xrm.Page.getAttribute(OneXrm.Entities.contact.Attributes.di_investmentperiod.logicalName).setValue(investmentPeriod);
                };
                return Contact;
            }());
            contact.Contact = Contact;
        })(contact = Forms.contact || (Forms.contact = {}));
    })(Forms = DynaInduction.Forms || (DynaInduction.Forms = {}));
})(DynaInduction || (DynaInduction = {}));
window["DynaInduction"] = window["DynaInduction"] || DynaInduction;
window["DynaInduction"].Forms = window["DynaInduction"].Forms || DynaInduction.Forms;
window["DynaInduction"].Forms.contact = window["DynaInduction"].Forms.contact || DynaInduction.Forms.contact;
window["DynaInduction"].Forms.contact.Contact = window["DynaInduction"].Forms.contact.Event || DynaInduction.Forms.contact.Contact;
