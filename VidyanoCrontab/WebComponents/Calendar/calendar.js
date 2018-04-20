"use strict";
var VidyanoCrontab;
(function (VidyanoCrontab) {
    var WebComponents;
    (function (WebComponents) {
        var Calendar = /** @class */ (function (_super) {
            __extends(Calendar, _super);
            function Calendar() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Calendar.prototype.attached = function () {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.app.importLib("moment")];
                            case 1:
                                _a.sent();
                                _super.prototype.attached.call(this);
                                this.weekArray = ["maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag", "zondag"];
                                this.currentDate = moment().utc();
                                this.currentMonth = this.currentDate.format('MMMM');
                                this.currentYear = this.currentDate.year();
                                this._calcInit(this.currentDate);
                                this._setCalendar();
                                return [2 /*return*/];
                        }
                    });
                });
            };
            Calendar.prototype._calcInit = function (start) {
                this.firstOfMonth = start.startOf("month");
                this.lastofMonth = start.daysInMonth();
            };
            Calendar.prototype._setCalendar = function () {
                var tempMonthArray = [];
                var indexDate = this.firstOfMonth.clone();
                indexDate.subtract(5, "days");
                if (indexDate.day != 0) {
                    indexDate.subtract(indexDate.day(), "days");
                }
                for (var i = 0; i < 6; i++) {
                    var tempArray = [];
                    var tempI = 0;
                    for (var x = 0; x < 7; x++) {
                        tempArray.push(indexDate.clone().add(1, "days").date());
                        indexDate = indexDate.add(1, "days");
                        if (indexDate.date() >= indexDate.daysInMonth() && i > 2) {
                            i = 6;
                        }
                    }
                    if (!(i == 0 && tempArray[6] > 7)) {
                        tempMonthArray.push(tempArray);
                    }
                }
                this.set("monthArray", tempMonthArray);
            };
            Calendar.prototype._onNextMonthTap = function () {
                this.monthOffset++;
                var tempMoment = moment(this.currentDate).clone().add(this.monthOffset, "months");
                this._calcInit(tempMoment);
                this._setCalendar();
                this.currentMonth = tempMoment.format('MMMM');
                this.currentYear = tempMoment.year();
            };
            Calendar.prototype._onPreviousMonthTap = function () {
                this.monthOffset--;
                var tempMoment = moment(this.currentDate).clone().add(this.monthOffset, "months");
                this._calcInit(moment(this.currentDate).clone().add(this.monthOffset, "months"));
                this._setCalendar();
                this.currentMonth = tempMoment.format('MMMM');
                this.currentYear = tempMoment.year();
            };
            Calendar = __decorate([
                Vidyano.WebComponents.WebComponent.register({
                    properties: {
                        currentMonth: Number,
                        currentYear: Number,
                        monthArray: Array,
                        monthOffset: {
                            type: Number,
                            value: 0
                        },
                        weekArray: Array,
                    }
                }, "vc")
            ], Calendar);
            return Calendar;
        }(Vidyano.WebComponents.WebComponent));
        WebComponents.Calendar = Calendar;
    })(WebComponents = VidyanoCrontab.WebComponents || (VidyanoCrontab.WebComponents = {}));
})(VidyanoCrontab || (VidyanoCrontab = {}));
