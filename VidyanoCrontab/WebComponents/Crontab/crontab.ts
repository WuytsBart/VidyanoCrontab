namespace VidyanoCrontab.WebComponents {
    @Vidyano.WebComponents.WebComponent.register({
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

        observers: [
            
        ]

    }, "vc")
    export class Crontab extends Vidyano.WebComponents.WebComponent {
        readonly weekArray: String[]; private _setWeekArray: (value: string[]) => void;
        readonly monthArray: String[]; private _setMonthArray: (value: string[]) => void;
        readonly cronData: ICronData; private _setCronData: (value: ICronData) => void;
        cron: String[]; private _setCronArray: (value: string) => void;



        dayOfWeek: String;
        test: String;
        

        async attached() {
            super.attached();

            await this.app.importComponent("Select");
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
                
            })
        }

        private _testFunction(): void {
            this._setCron();
            
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

        private _setCron(): void {
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
        }

        private _checkWeekDays() {
            if (this.cronData.weekDaysCheck) {
                this.cronData.dayOfWeek = "1-5";
            }
            else this.cronData.dayOfWeek = "*";
            
        }

        private _checkmonth(month: Number): Number {
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
        year: string,
        startDate: string,
        endDate: string,
        cronDaily: string,
        eindDatumCheck: Boolean,
        aantalLoopsCheck: Boolean,
        loopDaysCheck: Boolean,
        weekDaysCheck: Boolean
    }
}