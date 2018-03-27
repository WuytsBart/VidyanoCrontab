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
            Crontab.prototype.attached = function () {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _super.prototype.attached.call(this);
                                return [4 /*yield*/, this.app.importComponent("Select")];
                            case 1:
                                _a.sent();
                                this._setWeekArray(["Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag", "Zondag"]);
                                this._setCronData({
                                    isDagelijks: true,
                                    isWekelijks: false,
                                    isMaandelijks: false,
                                    isJaarlijks: false,
                                    minute: "*",
                                    hour: "*",
                                    dayOfMonth: "*",
                                    month: "*",
                                    dayOfWeek: "*"
                                });
                                return [2 /*return*/];
                        }
                    });
                });
            };
            Crontab.prototype._testFunction = function () {
                this.cronData.minute = '1';
                this.cronData.isMaandelijks = true;
                this.notifyPath("cronData.isMaandelijks", this.cronData.isMaandelijks);
                console.log(this.cron);
                console.log(this.cronData.minute);
            };
            Crontab.prototype._computeCron = function (minute, hour, dayOfMonth, month, dayOfWeek) {
                this.cron = minute + " " + hour + " " + dayOfMonth + " " + month + " " + this._getDayOfWeek(dayOfWeek);
            };
            Crontab.prototype._getDayOfWeek = function (dayOfWeek) {
                switch (dayOfWeek) {
                    case "Maandag":
                        return "1";
                    case "Dinsdag":
                        return "2";
                    case "Woensdag":
                        return "3";
                    case "Donderdag":
                        return "4";
                    case "Vrijdag":
                        return "5";
                    case "Zaterdag":
                        return "6";
                    case "Zondag":
                        return "7";
                    default:
                        return "*";
                }
            };
            Crontab.prototype._setDagelijks = function () {
                this.cronData.isDagelijks = true;
                this.cronData.isWekelijks = false;
                this.cronData.isMaandelijks = false;
                this.cronData.isJaarlijks = false;
                this.notifyPath("cronData.isDagelijks", this.cronData.isDagelijks);
                this.notifyPath("cronData.isWekelijks", this.cronData.isWekelijks);
                this.notifyPath("cronData.isMaandelijks", this.cronData.isMaandelijks);
                this.notifyPath("cronData.isJaarlijks", this.cronData.isJaarlijks);
            };
            Crontab.prototype._setWekelijks = function () {
                this.cronData.isDagelijks = false;
                this.cronData.isWekelijks = true;
                this.cronData.isMaandelijks = false;
                this.cronData.isJaarlijks = false;
                this.notifyPath("cronData.isDagelijks", this.cronData.isDagelijks);
                this.notifyPath("cronData.isWekelijks", this.cronData.isWekelijks);
                this.notifyPath("cronData.isMaandelijks", this.cronData.isMaandelijks);
                this.notifyPath("cronData.isJaarlijks", this.cronData.isJaarlijks);
            };
            Crontab.prototype._setMaandelijks = function () {
                this.cronData.isDagelijks = false;
                this.cronData.isWekelijks = false;
                this.cronData.isMaandelijks = true;
                this.cronData.isJaarlijks = false;
                this.notifyPath("cronData.isDagelijks", this.cronData.isDagelijks);
                this.notifyPath("cronData.isWekelijks", this.cronData.isWekelijks);
                this.notifyPath("cronData.isMaandelijks", this.cronData.isMaandelijks);
                this.notifyPath("cronData.isJaarlijks", this.cronData.isJaarlijks);
            };
            Crontab.prototype._setJaarlijks = function () {
                this.cronData.isDagelijks = false;
                this.cronData.isWekelijks = false;
                this.cronData.isMaandelijks = false;
                this.cronData.isJaarlijks = true;
                this.notifyPath("cronData.isDagelijks", this.cronData.isDagelijks);
                this.notifyPath("cronData.isWekelijks", this.cronData.isWekelijks);
                this.notifyPath("cronData.isMaandelijks", this.cronData.isMaandelijks);
                this.notifyPath("cronData.isJaarlijks", this.cronData.isJaarlijks);
            };
            Crontab = __decorate([
                Vidyano.WebComponents.WebComponent.register({
                    properties: {
                        cron: {
                            type: String
                        },
                        weekArray: {
                            type: Array,
                            readOnly: true
                        },
                        cronData: {
                            type: Object,
                            readOnly: true
                        }
                    },
                    observers: [
                        "_computeCron(cronData.minute, cronData.hour, cronData.dayOfMonth, cronData.month, cronData.dayOfWeek)"
                    ]
                }, "vc")
            ], Crontab);
            return Crontab;
        }(Vidyano.WebComponents.WebComponent));
        WebComponents.Crontab = Crontab;
    })(WebComponents = VidyanoCrontab.WebComponents || (VidyanoCrontab.WebComponents = {}));
})(VidyanoCrontab || (VidyanoCrontab = {}));
