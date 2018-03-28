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
                                this._setMonthArray(["Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "Oktober", "November", "December"]);
                                this._setWeekArray(["Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag", "Zondag"]);
                                this._setCronData({
                                    isDagelijks: true,
                                    isWekelijks: false,
                                    isMaandelijks: false,
                                    minute: "*",
                                    hour: "*",
                                    dayOfMonth: "*",
                                    month: "*",
                                    dayOfWeek: "*",
                                    year: "*",
                                    startDate: "",
                                    endDate: "",
                                    cronDaily: ""
                                });
                                return [2 /*return*/];
                        }
                    });
                });
            };
            Crontab.prototype._testFunction = function () {
                console.log(this.test);
            };
            Crontab.prototype._computeCron = function (minute, hour, dayOfMonth, month, dayOfWeek, year) {
                this.cron = minute + " " + hour + " " + dayOfMonth + " " + this._getMonth(month) + " " + this._getDayOfWeek(dayOfWeek) + " " + year;
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
            Crontab.prototype._getMonth = function (month) {
                switch (month) {
                    case "Januari":
                        return "1";
                    case "Februari":
                        return "2";
                    case "Maart":
                        return "3";
                    case "April":
                        return "4";
                    case "Mei":
                        return "5";
                    case "Juni":
                        return "6";
                    case "Juli":
                        return "7";
                    case "Augustus":
                        return "8";
                    case "September":
                        return "9";
                    case "Oktober":
                        return "10";
                    case "November":
                        return "11";
                    case "December":
                        return "12";
                    default:
                        return "*";
                }
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
            Crontab.prototype._setCronDaily = function () {
                this.cronDaily = [];
                var splitBegin = this.cronData.startDate.split("-");
                var beginYear = parseInt(splitBegin[0]);
                var beginMonth = parseInt(splitBegin[1]);
                var beginDay = parseInt(splitBegin[2]);
                var splitEnd = this.cronData.endDate.split("-");
                var endYear = parseInt(splitEnd[0]);
                var endMonth = parseInt(splitEnd[1]);
                var endDay = parseInt(splitEnd[2]);
                if (beginYear == endYear) {
                    this.cronData.year = beginYear.toString();
                    if (beginMonth == endMonth) {
                        if (beginDay <= endDay) {
                            var temp = this.cronData.minute + " " + this.cronData.hour + " " + beginDay.toString() + "-" + endDay.toString() + " " + beginMonth.toString() + " " + this.cronData.dayOfWeek + " " + this.cronData.year;
                            this.cronDaily.push(temp);
                        }
                    }
                    else if (beginMonth < endMonth) {
                        if (this._checkmonth(beginMonth) == 1) {
                            var temp = this.cronData.minute + " " + this.cronData.hour + " " + beginDay.toString() + "-31 " + beginMonth.toString() + " " + this.cronData.dayOfWeek + " " + this.cronData.year;
                            this.cronDaily.push(temp);
                            for (var i = (beginMonth + 1); i < endMonth; i++) {
                                temp = this.cronData.minute + " " + this.cronData.hour + " " + "* " + i + " " + this.cronData.dayOfWeek + " " + this.cronData.year;
                                this.cronDaily.push(temp);
                            }
                            temp = this.cronData.minute + " " + this.cronData.hour + " " + "1-" + endDay.toString() + " " + endMonth.toString() + " " + this.cronData.dayOfWeek + " " + this.cronData.year;
                            this.cronDaily.push(temp);
                            console.log(this.cronDaily);
                        }
                        else if (this._checkmonth(beginMonth) == 3) {
                            var temp = this.cronData.minute + " " + this.cronData.hour + " " + beginDay.toString() + "-30 " + beginMonth.toString() + " " + this.cronData.dayOfWeek + " " + this.cronData.year;
                            this.cronDaily.push(temp);
                            for (var i = (beginMonth + 1); i < endMonth; i++) {
                                temp = this.cronData.minute + " " + this.cronData.hour + " " + "* " + i + " " + this.cronData.dayOfWeek + " " + this.cronData.year;
                                this.cronDaily.push(temp);
                            }
                            temp = this.cronData.minute + " " + this.cronData.hour + " " + "1-" + endDay.toString() + " " + endMonth.toString() + " " + this.cronData.dayOfWeek + " " + this.cronData.year;
                            this.cronDaily.push(temp);
                            console.log(this.cronDaily);
                        }
                        else if (this._checkmonth(beginMonth) == 2) {
                            var temp = this.cronData.minute + " " + this.cronData.hour + " " + beginDay.toString() + "-28 " + beginMonth.toString() + " " + this.cronData.dayOfWeek + " " + this.cronData.year;
                            this.cronDaily.push(temp);
                            for (var i = (beginMonth + 1); i < endMonth; i++) {
                                temp = this.cronData.minute + " " + this.cronData.hour + " " + "* " + i + " " + this.cronData.dayOfWeek + " " + this.cronData.year;
                                this.cronDaily.push(temp);
                            }
                            temp = this.cronData.minute + " " + this.cronData.hour + " " + "1-" + endDay.toString() + " " + endMonth.toString() + " " + this.cronData.dayOfWeek + " " + this.cronData.year;
                            this.cronDaily.push(temp);
                            console.log(this.cronDaily);
                        }
                    }
                }
                else if (beginYear < endYear) {
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
                        return 1;
                    case 2:
                        return 2;
                    case 4:
                    case 6:
                    case 9:
                    case 11:
                        return 3;
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
                        cronDaily: {
                            type: Array
                        },
                        test: String
                    },
                    observers: [
                        "_computeCron(cronData.minute, cronData.hour, cronData.dayOfMonth, cronData.month, cronData.dayOfWeek, cronData.year)"
                    ]
                }, "vc")
            ], Crontab);
            return Crontab;
        }(Vidyano.WebComponents.WebComponent));
        WebComponents.Crontab = Crontab;
    })(WebComponents = VidyanoCrontab.WebComponents || (VidyanoCrontab.WebComponents = {}));
})(VidyanoCrontab || (VidyanoCrontab = {}));
