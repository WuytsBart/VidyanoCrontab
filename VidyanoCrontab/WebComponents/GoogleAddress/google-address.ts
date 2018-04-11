
namespace VidyanoCrontab.WebComponents {
    @Vidyano.WebComponents.WebComponent.register({
        properties: {
            address: {
                type: String,                
            }
        }
    }, "vc")
    export class GoogleAddress extends Vidyano.WebComponents.WebComponent {
        address: string;
        autocomplete: any;
       
        private _testFunction() {
            console.log(this.address);                
        }

        private _initAutocomplete() {            
            var autocomplete = new google.maps.places.Autocomplete(document.getElementById('autoComplete'));
            autocomplete.addListener('place_changed', this._setAddress.bind(this));
        }

        private _setAddress() {
            this.address = (<any>document.getElementById('autoComplete')).value;
        }

        async attached() {
            super.attached();
            this._initAutocomplete();
        }

        
        
   

      
    }
}