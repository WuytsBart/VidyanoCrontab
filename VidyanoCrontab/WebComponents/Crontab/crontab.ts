namespace VidyanoCrontab.WebComponents {
    @Vidyano.WebComponents.WebComponent.register({
        properties: {

            cron: {
                type: String,
                computed: "_createCron(cronData.minute, cronData.hour, cronData.dayOfMonth, cronData.month, cronData.leapDays, cronData.weekDaysCheck, cronData.leapDaysCheck, cronData.mondayCheck, cronData.tuesdayCheck, cronData.wednessdayCheck, cronData.thursdayCheck, cronData.fridayCheck, cronData.saturdayCheck, cronData.sundayCheck, cronData.isDagelijks, cronData.isWekelijks, cronData.isMaandelijks)"
            },
            weekArray: {
                type: Array,
                readOnly: true
            },
            cronData: {
                type: Object,
                readOnly: true
            },
            interval: {
                type: String,
                computed: "_intervalCheck(cronData.leapDaysCheck)"
            },
            dayOfMonth: {
                type: String,
                computed: "_getDayOfMonth(cronData.isMaandelijks)"
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

            return `${this.cronData.seconds} ${minute} ${hour} ${this._getDayOfMonth()}${this._intervalCheck(this.cronData.leapDaysCheck)} ${month} ${this._checkWeekDays()}`;
        }

        private _testFunction() {
            console.log(this.cron);
        }

        async attached() {
            super.attached();

            await this.app.importComponent("Select");
            this._setCronData({
                isDagelijks: true,
                isWekelijks: false,
                isMaandelijks: false,
                seconds: "0",
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

        private _getDayOfMonth() {
            if (this.cronData.isMaandelijks) {
                return this.cronData.dayOfMonth
            }
            else {
                return "*";
            }
        }

        private _submitFunction(): void {
            this._createCron(this.cronData.minute, this.cronData.hour, this.cronData.dayOfMonth, this.cronData.month);
            console.log(this.cron);
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

        private _intervalCheck(leapDayCheck) {
            if (this.cronData.isDagelijks) {

                if (leapDayCheck) {
                    return ("/" + this.cronData.leapDays);
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

            if (this.cronData.isDagelijks) {
                if (this.cronData.weekDaysCheck) {
                    return "1-5";
                }
                return "*";
            }
            else if (this.cronData.isWekelijks) {
                
                var temp: string;
                temp = "";
                this.weekArray.forEach(function (day, i) {
                    if (day) {
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

    export interface ICronData {
        isDagelijks: boolean;
        isWekelijks: boolean;
        isMaandelijks: boolean;
        seconds: string;
        minute: string;
        hour: string,
        dayOfMonth: string,
        month: string,
        dayOfWeek: string,
        leapDaysCheck: boolean,
        weekDaysCheck: boolean,
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