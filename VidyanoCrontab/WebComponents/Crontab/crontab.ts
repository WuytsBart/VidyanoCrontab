namespace VidyanoCrontab.WebComponents {
    @Vidyano.WebComponents.WebComponent.register({
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
    export class Crontab extends Vidyano.WebComponents.WebComponent {
        readonly weekArray: boolean[]; private _setWeekArray: (value: boolean[]) => void;
        readonly cronData: ICronData; private _setCronData: (value: ICronData) => void;
        cron: String; 
        
        private _createCron(minute: String, hour: String, dayOfMonth: String, month: String) {
            this._intervalCheck();
            this.cron = `${minute} ${hour} ${dayOfMonth}${this._intervalCheck()} ${month} ${this._checkWeekDays()}`;
        }


        async attached() {
            super.attached();

            await this.app.importComponent("Select");
            this._setCronData({
                isDagelijks: true,
                isWekelijks: false,
                isMaandelijks: false,
                minute: "*",
                hour: "*",
                dayOfMonth: "*",
                month: "*",
                dayOfWeek: "",
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
                
            })
        }

        private _submitFunction(): void {
            this._createCron(this.cronData.minute, this.cronData.hour, this.cronData.dayOfMonth, this.cronData.month);
        }

        private _setDagelijks() {
            this.cronData.isDagelijks = true;
            this.cronData.isWekelijks = false;
            this.cronData.isMaandelijks = false;
            this.notifyPath("cronData.isDagelijks", this.cronData.isDagelijks);
            this.notifyPath("cronData.isWekelijks", this.cronData.isWekelijks);
            this.notifyPath("cronData.isMaandelijks", this.cronData.isMaandelijks);
        }
        private _setWekelijks() {
            this.cronData.isDagelijks = false;
            this.cronData.isWekelijks = true;
            this.cronData.isMaandelijks = false;
            this.notifyPath("cronData.isDagelijks", this.cronData.isDagelijks);
            this.notifyPath("cronData.isWekelijks", this.cronData.isWekelijks);
            this.notifyPath("cronData.isMaandelijks", this.cronData.isMaandelijks);
        }
        private _setMaandelijks() {
            this.cronData.isDagelijks = false;
            this.cronData.isWekelijks = false;
            this.cronData.isMaandelijks = true;
            this.notifyPath("cronData.isDagelijks", this.cronData.isDagelijks);
            this.notifyPath("cronData.isWekelijks", this.cronData.isWekelijks);
            this.notifyPath("cronData.isMaandelijks", this.cronData.isMaandelijks);
        }

        private _intervalCheck() {
            if (this.cronData.leapDaysCheck) {
                return ("/" + this.cronData.leapDays);
            }
            else {
                return "";
            }
        }
        
        private _checkWeekDays() {

            if (this.cronData.isDagelijks) {
                if (this.cronData.weekDaysCheck) {
                    return "1-5";
                }
                return "*";
            }
            else if (this.cronData.isWekelijks) {
                this._setWeekArray([this.cronData.mondayCheck, this.cronData.tuesdayCheck, this.cronData.wednessdayCheck, this.cronData.thursdayCheck, this.cronData.fridayCheck, this.cronData.saturdayCheck, this.cronData.sundayCheck]);
                var temp: string;
                temp = "";
                this.weekArray.forEach(function (day, i) {
                    if (day) {
                        temp = temp + (i + 1).toString() + ","
                    }
                })

                return temp.slice(0, -1);

            }
            else {
                return "*";
            }
        }
    }

    export interface ICronData {
        isDagelijks: boolean;
        isWekelijks: boolean;
        isMaandelijks: boolean;
        minute: string;
        hour: string,
        dayOfMonth: string,
        month: string,
        dayOfWeek: string,
        leapDaysCheck: Boolean,
        weekDaysCheck: Boolean,
        leapDays: string,
        mondayCheck: boolean,
        tuesdayCheck: boolean,
        wednessdayCheck: boolean,
        thursdayCheck: boolean,
        fridayCheck: boolean,
        saturdayCheck: boolean,
        sundayCheck: boolean
    }
}