
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
        test: string;

        private _testFunction() {
            console.log(this.address);
            this._setAddress();
            console.log(this.address);            
        }

        private _initAutocomplete() {
            
            var autocomplete = new google.maps.places.Autocomplete(document.getElementById('autoComplete'));
            google.maps.event.addListener(autocomplete, 'place_changed', function () );
        }

        private _setAddress() {
            this.address = document.getElementById('autoComplete').value;
        }

        async attached() {
            super.attached();
            this._initAutocomplete();
        }

        
        
   

      
    }
}