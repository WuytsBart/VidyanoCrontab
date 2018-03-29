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
            Crontab.prototype._createCron = function (minute, hour, dayOfMonth, month) {
                this._intervalCheck();
                this.cron = minute + " " + hour + " " + dayOfMonth + this._intervalCheck() + " " + month + " " + this._checkWeekDays();
            };
            Crontab.prototype.attached = function () {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _super.prototype.attached.call(this);
                                return [4 /*yield*/, this.app.importComponent("Select")];
                            case 1:
                                _a.sent();
                                this._setMonthArray(["Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "Oktober", "November", "December"]);
                                this._setCronData({
                                    isDagelijks: true,
                                    isWekelijks: false,
                                    isMaandelijks: false,
                                    minute: "*",
                                    hour: "*",
                                    dayOfMonth: "*",
                                    month: "*",
                                    dayOfWeek: "",
                                    year: "*",
                                    startDate: "",
                                    weekDaysCheck: false,
                                    leapDaysCheck: false,
                                    leapDays: "1",
                                    mondayCheck: false,
                                    tuesdayCheck: false,
                                    wednessdayCheck: false,
                                    thursdayCheck: false,
                                    fridayCheck: false,
                                    saturdayCheck: false,
                                    sundayCheck: false
                                });
                                return [2 /*return*/];
                        }
                    });
                });
            };
            Crontab.prototype._testFunction = function () {
                this._createCron(this.cronData.minute, this.cronData.hour, this.cronData.dayOfMonth, this.cronData.month);
                console.log(this.cron);
            };
            Crontab.prototype._setDagelijks = function () {
                this.cronData.isDagelijks = true;
                this.cronData.isWekelijks = false;
                this.cronData.isMaandelijks = false;
                this.notifyPath("cronData.isDagelijks", this.cronData.isDagelijks);
                this.notifyPath("cronData.isWekelijks", this.cronData.isWekelijks);
                this.notifyPath("cronData.isMaandelijks", this.cronData.isMaandelijks);
            };
            Crontab.prototype._setWekelijks = function () {
                this.cronData.isDagelijks = false;
                this.cronData.isWekelijks = true;
                this.cronData.isMaandelijks = false;
                this.notifyPath("cronData.isDagelijks", this.cronData.isDagelijks);
                this.notifyPath("cronData.isWekelijks", this.cronData.isWekelijks);
                this.notifyPath("cronData.isMaandelijks", this.cronData.isMaandelijks);
            };
            Crontab.prototype._setMaandelijks = function () {
                this.cronData.isDagelijks = false;
                this.cronData.isWekelijks = false;
                this.cronData.isMaandelijks = true;
                this.notifyPath("cronData.isDagelijks", this.cronData.isDagelijks);
                this.notifyPath("cronData.isWekelijks", this.cronData.isWekelijks);
                this.notifyPath("cronData.isMaandelijks", this.cronData.isMaandelijks);
            };
            Crontab.prototype._intervalCheck = function () {
                if (this.cronData.leapDaysCheck) {
                    return ("/" + this.cronData.leapDays);
                }
                else {
                    return "";
                }
            };
            Crontab.prototype._checkWeekDays = function () {
                if (this.cronData.isDagelijks) {
                    if (this.cronData.weekDaysCheck) {
                        return "1-5";
                    }
                    return "*";
                }
                else if (this.cronData.isWekelijks) {
                    this._setWeekArray([this.cronData.mondayCheck, this.cronData.tuesdayCheck, this.cronData.wednessdayCheck, this.cronData.thursdayCheck, this.cronData.fridayCheck, this.cronData.saturdayCheck, this.cronData.sundayCheck]);
                    var temp;
                    temp = "";
                    this.weekArray.forEach(function (day, i) {
                        if (day) {
                            temp = temp + (i + 1).toString() + ",";
                        }
                    });
                    return temp.slice(0, -1);
                }
            };
            Crontab.prototype._checkmonth = function (month) {
                switch (month) {
                    case 1:
                    case 3:
                    case 5:
                    case 7:
                    case 8:
                    case 10:
                    case 12:
                        return 31;
                    case 2:
                        return 28;
                    case 4:
                    case 6:
                    case 9:
                    case 11:
                        return 30;
                }
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
                        },
                        monthArray: {
                            type: Array,
                            readOnly: true
                        },
                        test: String
                    },
                    observers: [
                        "_createCron(this.cronData.minute, this.cronData.hour, this.cronData.dayOfMonth, this.cronData.month)"
                    ]
                }, "vc")
            ], Crontab);
            return Crontab;
        }(Vidyano.WebComponents.WebComponent));
        WebComponents.Crontab = Crontab;
    })(WebComponents = VidyanoCrontab.WebComponents || (VidyanoCrontab.WebComponents = {}));
})(VidyanoCrontab || (VidyanoCrontab = {}));
