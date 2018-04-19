

namespace VidyanoCrontab.WebComponents {
    @Vidyano.WebComponents.WebComponent.register({
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
    export class Calendar extends Vidyano.WebComponents.WebComponent {
        currentDate;
        monthArray: [number[]];
        weekArray: string[];  
        firstOfMonth;
        lastofMonth;
        lastDayOfMonth;
        monthOffset: number;
        

        async attached() {
            await this.app.importLib("moment");
            super.attached();
            this.weekArray = ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"];
            this.currentDate = moment().utc();
            this.currentDate = moment(this.currentDate);
            this._calcInit(this.currentDate);
            
            this._setCalendar();
            
        }



        private _calcInit(start) {
         
            this.firstOfMonth = start.startOf("month");
            this.lastofMonth = start.daysInMonth();
            
        }


        private _setCalendar() {
            var indexDate = this.firstOfMonth;
            if (indexDate.day != 0) {
                indexDate.subtract(indexDate.day(), "days")
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
        }


        private _onNextMonthTap() {
            
            
           
           
        }
    }
}