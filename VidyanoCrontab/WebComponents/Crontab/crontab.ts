
namespace VidyanoCrontab.WebComponents {
    @Vidyano.WebComponents.WebComponent.register({
        properties: {

            cron: {
                type: String,
                
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

            },
            initialCron: {
                type: String,
                value: "0 10 10 * * 1-5"
            },
            dailyWarning: {
                type: Boolean,
                value: false
            }
                        
        },

    }, "vc")
    export class Crontab extends Vidyano.WebComponents.WebComponent {
        readonly weekData: IWeekDay[]; private _setWeekData: (value: IWeekDay[]) => void;
        cron: string;
        seconds: string;
        isDagelijks: boolean;
        isWekelijks: boolean;
        isMaandelijks: boolean;
        minute: string;
        hour: string;
        dayOfMonth: string;
        month: string;
        dayOfWeek: string;
        leapDaysCheck: boolean;
        weekDaysCheck: boolean;
        leapDays: string;
        initialCron: string;
        dailyWarning: boolean;

        private _testFunction() {
            
        }

        private _createCron() {
            return `${this.seconds} ${this.minute} ${this.hour} ${this._getDayOfMonth()}${this._intervalCheck(this.leapDaysCheck)} ${this.month} ${this._checkWeekDays()}`;
        }

        private _leap() {                       
            if (this.leapDaysCheck) {
                this.weekDaysCheck = false;
                this.notifyPath("weekDaysCheck", this.weekDaysCheck);
            }
        }

        private _week() {
            if (this.weekDaysCheck) {
                this.leapDaysCheck = false;
                this.notifyPath("leapDaysCheck", this.leapDaysCheck);
            }
        }

        private _notifyWeekDays() {
            this.notifyPath("weekData.0.*", this.weekData[0].checked)
            this.notifyPath("weekData.1.*", this.weekData[1].checked)
            this.notifyPath("weekData.2.*", this.weekData[2].checked)
            this.notifyPath("weekData.3.*", this.weekData[3].checked)
            this.notifyPath("weekData.4.*", this.weekData[4].checked)
            this.notifyPath("weekData.5.*", this.weekData[5].checked)
            this.notifyPath("weekData.6.*", this.weekData[6].checked)
        }

        private _setInitialValues() {
            var splitCron = this.initialCron.split(" ");
            this.minute = splitCron[1];
            this.hour = splitCron[2];
            var dayOfMonthTest = splitCron[3].split("/")
            if (dayOfMonthTest.length > 1) {
                this.dayOfMonth = dayOfMonthTest[0];
                this.leapDays = dayOfMonthTest[1];
                this.leapDaysCheck = true;
            }
            else {
                this.dayOfMonth = splitCron[3];
            }
            if (splitCron[5] == "1-5") {
                this.weekDaysCheck = true;
            }
            var range = splitCron[5].split("-");
            var list = splitCron[5].split(",");
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
                var day = Number(splitCron[5]) -1;
                this.weekData[day].checked = true;

            }

            if (this.leapDaysCheck && this.weekDaysCheck) {
                this.dailyWarning = true;
            }
        }

        async attached() {
            super.attached();
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
        }

        private _getDayOfMonth() {
            if (this.isMaandelijks) {
                return this.dayOfMonth
            }
            else {
                return "*";
            }
        }

        private _setDagelijks() {
            this.isDagelijks = true;
            this.isWekelijks = false;
            this.isMaandelijks = false;
            this._notifyMode();
        }
        private _setWekelijks() {
            this.isDagelijks = false;
            this.isWekelijks = true;
            this.isMaandelijks = false;
            this._notifyMode();
        }
        private _setMaandelijks() {
            this.isDagelijks = false;
            this.isWekelijks = false;
            this.isMaandelijks = true;
            this._notifyMode();
        }

        private _notifyMode() {
            this.notifyPath("isDagelijks", this.isDagelijks);
            this.notifyPath("isWekelijks", this.isWekelijks);
            this.notifyPath("isMaandelijks", this.isMaandelijks);
        }

        private _intervalCheck(leapDayCheck) {
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
            
        }

        private _checkWeekDays() {
            if (this.isDagelijks) {
                if (this.weekDaysCheck) {
                    return "1-5";
                }
                return "*";
            }
            else if (this.isWekelijks) {
                
                var temp: string;
                temp = "";
                this.weekData.forEach(function (day, i) {
                    if (day.checked) {
                        temp = temp + (i + 1).toString() + ","
                    }
                })
                if (temp != "") {


                    return temp.slice(0, -1);
                }
                else { return  "*" }
            }
            else {
                return "*";
            }
        }

    }    

    export interface IWeekDay {
        label: string;
        checked: boolean;
    }
    
}