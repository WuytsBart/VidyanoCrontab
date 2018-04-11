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
                this.cron = this.seconds + " " + this.minute + " " + this.hour + " " + this._getDayOfMonth() + this._intervalCheck(this.leapDaysCheck) + " " + this.month + " " + this._checkWeekDays();
            };
            Crontab.prototype._checkHourInput = function () {
                if (this.hour > 23) {
                    this.hour = 23;
                }
                if (this.hour < 0) {
                    this.hour = 0;
                }
            };
            Crontab.prototype._checkMinuteInput = function () {
                if (this.minute > 59) {
                    this.minute = 59;
                }
                if (this.minute < 0) {
                    this.minute = 0;
                }
            };
            Crontab.prototype._checkLeapDayInput = function () {
                if (this.leapDays > 31) {
                    this.leapDays = 31;
                }
                if (this.leapDays < 1) {
                    this.leapDays = 1;
                }
            };
            Crontab.prototype._checkDayOfMonthInput = function () {
                if (Number(this.dayOfMonth) > 31) {
                    this.dayOfMonth = "31";
                }
                if (Number(this.dayOfMonth) < 1) {
                    this.dayOfMonth = "1";
                }
            };
            Crontab.prototype._leap = function () {
                if (this.leapDaysCheck) {
                    this.weekDaysCheck = false;
                }
            };
            Crontab.prototype._week = function () {
                if (this.weekDaysCheck) {
                    this.leapDaysCheck = false;
                }
            };
            Crontab.prototype._notifyWeekDays = function () {
                for (var i = 0; i < 7; i++) {
                    this.notifyPath("weekData." + i + ".*", this.weekData[i].checked);
                }
            };
            Crontab.prototype._setInitialValues = function () {
                var splitCron = this.cron.split(" ");
                this.minute = Number(splitCron[1]);
                this.hour = Number(splitCron[2]);
                var dayOfMonthTest = splitCron[3].split("/");
                var range = splitCron[5].split("-");
                var list = splitCron[5].split(",");
                if (dayOfMonthTest.length > 1) {
                    this.dayOfMonth = dayOfMonthTest[0];
                    this.leapDays = Number(dayOfMonthTest[1]);
                    this.leapDaysCheck = true;
                }
                else {
                    this.dayOfMonth = splitCron[3];
                }
                if (splitCron[5] == "1-5") {
                    this.weekDaysCheck = true;
                }
                if (range.length > list.length) {
                    for (var i = Number(range[0]) - 1; i < Number(range[1]); i++) {
                        this.weekData[i].checked = true;
                    }
                }
                else if (list.length > range.length) {
                    for (var i = 0; i < list.length; i++) {
                        var index = Number(list[i]) - 1;
                        this.weekData[index].checked = true;
                    }
                }
                else if (splitCron[5] != "*") {
                    var day = Number(splitCron[5]) - 1;
                    this.weekData[day].checked = true;
                }
            };
            Crontab.prototype.attached = function () {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        _super.prototype.attached.call(this);
                        this._setWeekData([
                            {
                                label: "Maandag",
                                checked: false,
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
                        this._setInitialValues();
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
            };
            Crontab.prototype._setWekelijks = function () {
                this.isDagelijks = false;
                this.isWekelijks = true;
                this.isMaandelijks = false;
            };
            Crontab.prototype._setMaandelijks = function () {
                this.isDagelijks = false;
                this.isWekelijks = false;
                this.isMaandelijks = true;
            };
            Crontab.prototype._intervalCheck = function (leapDayCheck) {
                if (this.isDagelijks) {
                    if (leapDayCheck) {
                        return ("/" + this.leapDays);
                    }
                }
                return "";
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
                            value: "0 10 10 * * 1-5"
                        },
                        seconds: {
                            type: Number,
                            value: 0
                        },
                        minute: {
                            type: Number,
                        },
                        hour: {
                            type: Number,
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
                            value: true,
                            notify: true
                        },
                        isWekelijks: {
                            type: Boolean,
                            value: false,
                            notify: true
                        },
                        isMaandelijks: {
                            type: Boolean,
                            value: false,
                            notify: true
                        },
                        weekDaysCheck: {
                            type: Boolean,
                            value: false,
                        },
                        leapDaysCheck: {
                            type: Boolean,
                            value: false
                        },
                        leapDays: {
                            type: Number,
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
                    observers: [
                        "_createCron(minute, hour, dayOfMonth, month, leapDays, weekDaysCheck, leapDaysCheck, isDagelijks, isWekelijks, isMaandelijks, weekData.*)",
                        "_checkHourInput(hour)",
                        "_checkMinuteInput(minute)",
                        "_checkLeapDayInput(leapDays)",
                        "_checkDayOfMonthInput(dayOfMonth)"
                    ]
                }, "vc")
            ], Crontab);
            return Crontab;
        }(Vidyano.WebComponents.WebComponent));
        WebComponents.Crontab = Crontab;
    })(WebComponents = VidyanoCrontab.WebComponents || (VidyanoCrontab.WebComponents = {}));
})(VidyanoCrontab || (VidyanoCrontab = {}));
