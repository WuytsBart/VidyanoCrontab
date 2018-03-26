"use strict";
var VidyanoCrontab;
(function (VidyanoCrontab) {
    var WebComponents;
    (function (WebComponents) {
        var Crontab = /** @class */ (function (_super) {
            __extends(Crontab, _super);
            function Crontab() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Crontab = __decorate([
                Vidyano.WebComponents.WebComponent.register({}, "vc")
            ], Crontab);
            return Crontab;
        }(Vidyano.WebComponents.WebComponent));
        WebComponents.Crontab = Crontab;
    })(WebComponents = VidyanoCrontab.WebComponents || (VidyanoCrontab.WebComponents = {}));
})(VidyanoCrontab || (VidyanoCrontab = {}));
