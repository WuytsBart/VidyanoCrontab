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
            }
        },

        observers: [
            "_computeCron(cronData.minute, cronData.hour, cronData.dayOfMonth, cronData.month, cronData.dayOfWeek)"
        ]

    }, "vc")
    export class Crontab extends Vidyano.WebComponents.WebComponent {
        readonly weekArray: String[]; private _setWeekArray: (value: string[]) => void;
        readonly cronData: ICronData; private _setCronData: (value: ICronData) => void;

        cron: String;
        dayOfWeek: String;

        async attached() {
            super.attached();

            await this.app.importComponent("Select");

            this._setWeekArray(["Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag", "Zondag"]);
            this._setCronData({
                isDagelijks: true,
                isWekelijks: false,
                isMaandelijks: false,
                isJaarlijks: false,
                minute: "*",
                hour: "*",
                dayOfMonth: "*",
                month: "*",
                dayOfWeek: "*"
            })
        }

        private _testFunction(): void {
            this.cronData.minute = '1';
            this.cronData.isMaandelijks = true;

            this.notifyPath("cronData.isMaandelijks", this.cronData.isMaandelijks);

            console.log(this.cron)
            console.log(this.cronData.minute);
        }

        private _computeCron(minute: String, hour: String, dayOfMonth: String, month: String, dayOfWeek: String): void {

            this.cron = `${minute} ${hour} ${dayOfMonth} ${month} ${this._getDayOfWeek(dayOfWeek)}`
        }

        private _getDayOfWeek(dayOfWeek: String): String {
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
        }

        private _setDagelijks() {
            this.cronData.isDagelijks = true;
            this.cronData.isWekelijks = false;
            this.cronData.isMaandelijks = false;
            this.cronData.isJaarlijks = false;
            this.notifyPath("cronData.isDagelijks", this.cronData.isDagelijks);
            this.notifyPath("cronData.isWekelijks", this.cronData.isWekelijks);
            this.notifyPath("cronData.isMaandelijks", this.cronData.isMaandelijks);
            this.notifyPath("cronData.isJaarlijks", this.cronData.isJaarlijks);
        }
        private _setWekelijks() {
            this.cronData.isDagelijks = false;
            this.cronData.isWekelijks = true;
            this.cronData.isMaandelijks = false;
            this.cronData.isJaarlijks = false;
            this.notifyPath("cronData.isDagelijks", this.cronData.isDagelijks);
            this.notifyPath("cronData.isWekelijks", this.cronData.isWekelijks);
            this.notifyPath("cronData.isMaandelijks", this.cronData.isMaandelijks);
            this.notifyPath("cronData.isJaarlijks", this.cronData.isJaarlijks);
        }
        private _setMaandelijks() {
            this.cronData.isDagelijks = false;
            this.cronData.isWekelijks = false;
            this.cronData.isMaandelijks = true;
            this.cronData.isJaarlijks = false;
            this.notifyPath("cronData.isDagelijks", this.cronData.isDagelijks);
            this.notifyPath("cronData.isWekelijks", this.cronData.isWekelijks);
            this.notifyPath("cronData.isMaandelijks", this.cronData.isMaandelijks);
            this.notifyPath("cronData.isJaarlijks", this.cronData.isJaarlijks);
        }
        private _setJaarlijks() {
            this.cronData.isDagelijks = false;
            this.cronData.isWekelijks = false;
            this.cronData.isMaandelijks = false;
            this.cronData.isJaarlijks = true;
            this.notifyPath("cronData.isDagelijks", this.cronData.isDagelijks);
            this.notifyPath("cronData.isWekelijks", this.cronData.isWekelijks);
            this.notifyPath("cronData.isMaandelijks", this.cronData.isMaandelijks);
            this.notifyPath("cronData.isJaarlijks", this.cronData.isJaarlijks);
        }
    }

    export interface ICronData {
        isDagelijks: boolean;
        isWekelijks: boolean;
        isMaandelijks: boolean;
        isJaarlijks: boolean;
        minute: string;
        hour: string,
        dayOfMonth: string,
        month: string,
        dayOfWeek: string,
    }
}