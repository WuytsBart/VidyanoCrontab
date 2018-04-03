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
            Crontab.prototype._createCron = function () {
                return this.seconds + " " + this.minute + " " + this.hour + " " + this._getDayOfMonth() + this._intervalCheck(this.leapDaysCheck) + " " + this.month + " " + this._checkWeekDays();
            };
            Crontab.prototype._leap = function () {
                if (this.leapDaysCheck) {
                    this.weekDaysCheck = false;
                    this.notifyPath("weekDaysCheck", this.weekDaysCheck);
                }
            };
            Crontab.prototype._week = function () {
                if (this.weekDaysCheck) {
                    this.leapDaysCheck = false;
                    this.notifyPath("leapDaysCheck", this.leapDaysCheck);
                }
            };
            Crontab.prototype._notifyWeekDays = function () {
                this.notifyPath("weekData.0.*", this.weekData[0].checked);
                this.notifyPath("weekData.1.*", this.weekData[1].checked);
                this.notifyPath("weekData.2.*", this.weekData[2].checked);
                this.notifyPath("weekData.3.*", this.weekData[3].checked);
                this.notifyPath("weekData.4.*", this.weekData[4].checked);
                this.notifyPath("weekData.5.*", this.weekData[5].checked);
                this.notifyPath("weekData.6.*", this.weekData[6].checked);
            };
            Crontab.prototype.attached = function () {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        _super.prototype.attached.call(this);
                        this._setWeekData([
                            {
                                label: "Maandag",
                                checked: true,
                            },
                            {
                                label: "Dinsdag",
                                checked: false
                            },
                            {
                                label: "Woensdag",
                                checked: false
                            },
                            {
                                label: "Donderdag",
                                checked: false
                            },
                            {
                                label: "Vrijdag",
                                checked: false
                            },
                            {
                                label: "Zaterdag",
                                checked: false
                            },
                            {
                                label: "Zondag",
                                checked: false
                            },
                        ]);
                        return [2 /*return*/];
                    });
                });
            };
            Crontab.prototype._getDayOfMonth = function () {
                if (this.isMaandelijks) {
                    return this.dayOfMonth;
                }
                else {
                    return "*";
                }
            };
            Crontab.prototype._setDagelijks = function () {
                this.isDagelijks = true;
                this.isWekelijks = false;
                this.isMaandelijks = false;
                this.notifyPath("isDagelijks", this.isDagelijks);
                this.notifyPath("isWekelijks", this.isWekelijks);
                this.notifyPath("isMaandelijks", this.isMaandelijks);
            };
            Crontab.prototype._setWekelijks = function () {
                this.isDagelijks = false;
                this.isWekelijks = true;
                this.isMaandelijks = false;
                this.notifyPath("isDagelijks", this.isDagelijks);
                this.notifyPath("isWekelijks", this.isWekelijks);
                this.notifyPath("isMaandelijks", this.isMaandelijks);
            };
            Crontab.prototype._setMaandelijks = function () {
                this.isDagelijks = false;
                this.isWekelijks = false;
                this.isMaandelijks = true;
                this.notifyPath("isDagelijks", this.isDagelijks);
                this.notifyPath("isWekelijks", this.isWekelijks);
                this.notifyPath("isMaandelijks", this.isMaandelijks);
            };
            Crontab.prototype._intervalCheck = function (leapDayCheck) {
                if (this.isDagelijks) {
                    if (leapDayCheck) {
                        return ("/" + this.leapDays);
                    }
                    else {
                        return "";
                    }
                }
                else {
                    return "";
                }
            };
            Crontab.prototype._checkWeekDays = function () {
                if (this.isDagelijks) {
                    if (this.weekDaysCheck) {
                        return "1-5";
                    }
                    return "*";
                }
                else if (this.isWekelijks) {
                    var temp;
                    temp = "";
                    this.weekData.forEach(function (day, i) {
                        if (day.checked) {
                            temp = temp + (i + 1).toString() + ",";
                        }
                    });
                    if (temp != "") {
                        return temp.slice(0, -1);
                    }
                    else {
                        return "*";
                    }
                }
                else {
                    return "*";
                }
            };
            Crontab = __decorate([
                Vidyano.WebComponents.WebComponent.register({
                    properties: {
                        cron: {
                            type: String,
                            //value: "0 10 7 * * 1, 2, 7"
                            computed: "_createCron(minute, hour, dayOfMonth, month, leapDays, weekDaysCheck, leapDaysCheck, isDagelijks, isWekelijks, isMaandelijks, weekData.*)"
                        },
                        seconds: {
                            type: String,
                            value: "0"
                        },
                        minute: {
                            type: String,
                            value: "*"
                        },
                        hour: {
                            type: String,
                            value: "*"
                        },
                        month: {
                            type: String,
                            value: "*"
                        },
                        dayOfWeek: {
                            type: String,
                            value: "*"
                        },
                        isDagelijks: {
                            type: Boolean,
                            value: true
                        },
                        isWekelijks: {
                            type: Boolean,
                            value: false
                        },
                        isMaandelijks: {
                            type: Boolean,
                            value: false
                        },
                        weekDaysCheck: {
                            type: Boolean,
                            value: false
                        },
                        leapDaysCheck: {
                            type: Boolean,
                            value: false
                        },
                        leapDays: {
                            type: String,
                            value: "*"
                        },
                        dayOfMonth: {
                            type: String,
                            value: "*"
                        },
                        weekData: {
                            type: Array,
                            readOnly: true,
                        }
                    },
                }, "vc")
            ], Crontab);
            return Crontab;
        }(Vidyano.WebComponents.WebComponent));
        WebComponents.Crontab = Crontab;
    })(WebComponents = VidyanoCrontab.WebComponents || (VidyanoCrontab.WebComponents = {}));
})(VidyanoCrontab || (VidyanoCrontab = {}));
