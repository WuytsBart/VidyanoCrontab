

namespace VidyanoCrontab.WebComponents {
    @Vidyano.WebComponents.WebComponent.register({
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
    export class Calendar extends Vidyano.WebComponents.WebComponent {
        currentDate;
        monthArray: [number[]];
        weekArray: string[];  
        firstOfMonth;
        lastofMonth;
        lastDayOfMonth;
        monthOffset: number;
        currentMonth: string;
        currentYear: number;
       
        

        async attached() {
            await this.app.importLib("moment");
            super.attached();
            this.weekArray = ["maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag", "zondag"];
            this.currentDate = moment().utc();
            this.currentMonth = this.currentDate.format('MMMM');
            this.currentYear = this.currentDate.year();
            this._calcInit(this.currentDate);
            this._setCalendar();            
        }

        

        private _calcInit(start) {         
            this.firstOfMonth = start.startOf("month");
            this.lastofMonth = start.daysInMonth();            
        }


        private _setCalendar() {
            var tempMonthArray = [];
            var indexDate = this.firstOfMonth.clone();
            indexDate.subtract(5, "days");
            if (indexDate.day != 0) {
                indexDate.subtract(indexDate.day(), "days")
            }            
            for (var i = 0; i < 6; i++) {
                var tempArray = [];
                var tempI = 0;
                for (var x = 0; x < 7; x++) {
                    tempArray.push(indexDate.clone().add(1,"days").date());
                    indexDate = indexDate.add(1, "days");
                    if (indexDate.date() >= indexDate.daysInMonth() && i > 2 ) {                        
                        i = 6;
                    }
                }                
                if (!(i == 0 && tempArray[6] > 7)) {
                    tempMonthArray.push(tempArray);
                }                 
            }
            this.set("monthArray", tempMonthArray);
        }


        private _onNextMonthTap() {
            this.monthOffset++;
            var tempMoment = moment(this.currentDate).clone().add(this.monthOffset, "months");
            this._calcInit(tempMoment);
            this._setCalendar();
            this.currentMonth = tempMoment.format('MMMM');
            this.currentYear = tempMoment.year();
        }

        private _onPreviousMonthTap() {
            this.monthOffset--;
            var tempMoment = moment(this.currentDate).clone().add(this.monthOffset, "months");
            this._calcInit(moment(this.currentDate).clone().add(this.monthOffset, "months"));
            this._setCalendar();
            this.currentMonth = tempMoment.format('MMMM');
            this.currentYear = tempMoment.year();
        }
    }
}