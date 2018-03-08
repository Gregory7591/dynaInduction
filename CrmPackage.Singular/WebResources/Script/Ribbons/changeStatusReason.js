/// <reference path="../../../OneXrm/OneXrm.ts" include="true" />
/// <reference path="../../../OneXrm/OneXrm.Entities.contact.ts" include="true" />
var DynaInduction;
(function (DynaInduction) {
    var Forms;
    (function (Forms) {
        var contact;
        (function (contact) {
            var ribbonStatus = /** @class */ (function () {
                function ribbonStatus() {
                }
                ribbonStatus.matured = function (context) {
                    var currentDate = new Date();
                    var maturityDate = Xrm.Page.getAttribute(OneXrm.Entities.contact.Attributes.di_maturity_date.logicalName).getValue();
                    if (maturityDate <= currentDate) {
                        Xrm.Page.getAttribute(OneXrm.Entities.contact.Attributes.statuscode.logicalName).setValue(OneXrm.OptionSets.contact_statuscode.Matured);
                    }
                    else
                        alert("Cannot change status to matured as the investment is not past its maturity date");
                };
                return ribbonStatus;
            }());
            contact.ribbonStatus = ribbonStatus;
        })(contact = Forms.contact || (Forms.contact = {}));
    })(Forms = DynaInduction.Forms || (DynaInduction.Forms = {}));
})(DynaInduction || (DynaInduction = {}));
window["DynaInduction"] = window["DynaInduction"] || DynaInduction;
window["DynaInduction"].Forms = window["DynaInduction"].Forms || DynaInduction.Forms;
window["DynaInduction"].Forms.contact = window["DynaInduction"].Forms.contact || DynaInduction.Forms.contact;
window["DynaInduction"].Forms.contact.ribbonStatus = window["DynaInduction"].Forms.contact.Event || DynaInduction.Forms.contact.ribbonStatus;
