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
                Contact.onLoad = function () {
                    //FinalDynamicsChallenge.Forms.contact.Contact.attachEvents(context);
                    //FinalDynamicsChallenge.Forms.contact.Contact.businessRules(context, true);
                    DynaInduction.Forms.contact.Contact.workAge();
                    DynaInduction.Forms.contact.Contact.prefMethodCom();
                };
                Contact.onChange = function (context) {
                    DynaInduction.Forms.contact.Contact.prefMethodCom();
                };
                Contact.onSave = function (context) { };
                Contact.attachEvents = function (context) { };
                Contact.businessRules = function (context, onLoad) {
                    if (onLoad === void 0) { onLoad = false; }
                };
                Contact.workAge = function () {
                    var currentDate = new Date();
                    var BirthDate = Xrm.Page.getAttribute(OneXrm.Entities.contact.Attributes.di_dateofbirth.logicalName).getValue();
                    var dateDiff = currentDate.getMonth() - BirthDate.getMonth();
                    if (dateDiff > -1) {
                        Xrm.Page.getAttribute(OneXrm.Entities.contact.Attributes.di_age.logicalName).setValue(currentDate.getFullYear() - BirthDate.getFullYear());
                    }
                    else {
                        Xrm.Page.getAttribute(OneXrm.Entities.contact.Attributes.di_age.logicalName).setValue(currentDate.getFullYear() - BirthDate.getFullYear() - 1);
                    }
                };
                Contact.prefMethodCom = function () {
                    var prefferedContactMethodCode = Xrm.Page.getAttribute(OneXrm.Entities.contact.Attributes.preferredcontactmethodcode.logicalName).getValue();
                    Xrm.Page.getAttribute(OneXrm.Entities.contact.Attributes.emailaddress1.logicalName).setRequiredLevel((prefferedContactMethodCode === OneXrm.OptionSets.contact_preferredcontactmethodcode.Any || prefferedContactMethodCode === 2) ? "required" : "none");
                    Xrm.Page.getAttribute(OneXrm.Entities.contact.Attributes.mobilephone.logicalName).setRequiredLevel((prefferedContactMethodCode === 3 ? "required" : "none"));
                    Xrm.Page.getAttribute(OneXrm.Entities.contact.Attributes.fax.logicalName).setRequiredLevel((prefferedContactMethodCode === 4 ? "required" : "none"));
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
