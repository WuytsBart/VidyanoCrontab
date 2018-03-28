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
                                    cronDaily: "",
                                    eindDatumCheck: false,
                                    aantalLoopsCheck: false,
                                    weekDaysCheck: false,
                                    loopDaysCheck: false
                                });
                                return [2 /*return*/];
                        }
                    });
                });
            };
            Crontab.prototype._testFunction = function () {
                this._setCron();
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
            Crontab.prototype._setCron = function () {
                this._checkWeekDays();
                this.cron = [];
                var splitBegin = this.cronData.startDate.split("-");
                var beginYear = parseInt(splitBegin[0]);
                var beginMonth = parseInt(splitBegin[1]);
                var beginDay = parseInt(splitBegin[2]);
                var splitEnd = this.cronData.endDate.split("-");
                var endYear = parseInt(splitEnd[0]);
                var endMonth = parseInt(splitEnd[1]);
                var endDay = parseInt(splitEnd[2]);
                if (this.cronData.eindDatumCheck) {
                    if (beginYear == endYear) {
                        this.cronData.year = beginYear.toString();
                        if (beginMonth == endMonth) {
                            if (beginDay <= endDay) {
                                var temp = this.cronData.minute + " " + this.cronData.hour + " " + beginDay.toString() + "-" + endDay.toString() + " " + beginMonth.toString() + " " + this.cronData.dayOfWeek + " " + this.cronData.year;
                                this.cron.push(temp);
                            }
                        }
                        else if (beginMonth < endMonth) {
                            var temp = this.cronData.minute + " " + this.cronData.hour + " " + beginDay.toString() + "-" + this._checkmonth(beginMonth) + " " + beginMonth.toString() + " " + this.cronData.dayOfWeek + " " + this.cronData.year;
                            this.cron.push(temp);
                            for (var i = (beginMonth + 1); i < endMonth; i++) {
                                temp = this.cronData.minute + " " + this.cronData.hour + " " + "* " + i + " " + this.cronData.dayOfWeek + " " + this.cronData.year;
                                this.cron.push(temp);
                            }
                            temp = this.cronData.minute + " " + this.cronData.hour + " " + "1-" + endDay.toString() + " " + endMonth.toString() + " " + this.cronData.dayOfWeek + " " + this.cronData.year;
                            this.cron.push(temp);
                        }
                    }
                    else if (beginYear < endYear) {
                        var interYears = ((endYear) - beginYear);
                        var temp = this.cronData.minute + " " + this.cronData.hour + " " + beginDay.toString() + "-" + this._checkmonth(beginMonth) + " " + beginMonth.toString() + " " + this.cronData.dayOfWeek + " " + beginYear;
                        this.cron.push(temp);
                        for (var i = (beginMonth + 1); i <= 12; i++) {
                            temp = this.cronData.minute + " " + this.cronData.hour + " " + "* " + i + " " + this.cronData.dayOfWeek + " " + beginYear;
                            this.cron.push(temp);
                        }
                        for (var i = 1; i < interYears; i++) {
                            for (var x = 1; x <= 12; x++) {
                                temp = this.cronData.minute + " " + this.cronData.hour + " " + "* " + x + " " + this.cronData.dayOfWeek + " " + (beginYear + i);
                                this.cron.push(temp);
                            }
                        }
                        for (var i = 1; i < endMonth; i++) {
                            temp = this.cronData.minute + " " + this.cronData.hour + " " + "* " + i + " " + this.cronData.dayOfWeek + " " + endYear;
                            this.cron.push(temp);
                        }
                        temp = this.cronData.minute + " " + this.cronData.hour + " " + "1-" + endDay.toString() + " " + endMonth.toString() + " " + this.cronData.dayOfWeek + " " + endYear;
                        this.cron.push(temp);
                    }
                }
                console.log(this.cron);
            };
            Crontab.prototype._checkWeekDays = function () {
                if (this.cronData.weekDaysCheck) {
                    this.cronData.dayOfWeek = "1-5";
                }
                else
                    this.cronData.dayOfWeek = "*";
            };
            Crontab.prototype._checkmonth = function (month) {
                //if ()
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
                            type: Array
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
                    observers: []
                }, "vc")
            ], Crontab);
            return Crontab;
        }(Vidyano.WebComponents.WebComponent));
        WebComponents.Crontab = Crontab;
    })(WebComponents = VidyanoCrontab.WebComponents || (VidyanoCrontab.WebComponents = {}));
})(VidyanoCrontab || (VidyanoCrontab = {}));
