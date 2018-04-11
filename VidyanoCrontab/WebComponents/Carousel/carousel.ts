namespace VidyanoCrontab.WebComponents {
    @Vidyano.WebComponents.WebComponent.register({
        properties: {
            carouselImages: {
                type: Array,
                readOnly: true
            }
        }
    }, "vc")
    export class Carousel extends Vidyano.WebComponents.WebComponent {
        readonly carouselImages: string[]; private _setCarouselImages: (value: string[]) => void;

        attached() {
            super.attached()

            this._setCarouselImages([
                "Carousel/Images/Giraf.jpg",
                "Carousel/Images/leeuw.jpg",
                "Carousel/Images/olifant.jpg",
                "Carousel/Images/reiger.jpg",
                "Carousel/Images/tijger.jpg",
                "Carousel/Images/alpaca.jpeg"
            ]);
        }

        
    }
}