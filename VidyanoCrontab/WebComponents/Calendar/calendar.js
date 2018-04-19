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
                                this.weekArray = ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"];
                                this.currentDate = moment().utc();
                                this.currentDate = moment(this.currentDate);
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
                var indexDate = this.firstOfMonth;
                if (indexDate.day != 0) {
                    indexDate.subtract(indexDate.day(), "days");
                }
                var tempMonthArray = [];
                for (var i = 0; i < 6; i++) {
                    var tempArray = [];
                    var tempI;
                    for (var x = 0; x < 7; x++) {
                        tempArray.push(indexDate.date());
                        indexDate = indexDate.add(1, "days");
                        if (indexDate.date() == this.lastofMonth && indexDate.month() == this.firstOfMonth.month()) {
                            tempI = 6;
                        }
                    }
                    if (tempI == 6) {
                        i = 6;
                    }
                    tempMonthArray.push(tempArray);
                }
                this.set("monthArray", tempMonthArray);
            };
            Calendar.prototype._onNextMonthTap = function () {
            };
            Calendar = __decorate([
                Vidyano.WebComponents.WebComponent.register({
                    properties: {
                        currentMonth: Number,
                        currentDay: Number,
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
