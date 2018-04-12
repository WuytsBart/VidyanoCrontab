"use strict";
var VidyanoCrontab;
(function (VidyanoCrontab) {
    var WebComponents;
    (function (WebComponents) {
        var Carousel = /** @class */ (function (_super) {
            __extends(Carousel, _super);
            function Carousel() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Carousel.prototype.attached = function () {
                _super.prototype.attached.call(this);
                this._setCarouselImages([
                    "Carousel/Images/Giraf.jpg",
                    "Carousel/Images/leeuw.jpg",
                    "Carousel/Images/olifant.jpg",
                    "Carousel/Images/reiger.jpg",
                    "Carousel/Images/tijger.jpg",
                    "Carousel/Images/alpaca.jpeg",
                    "Carousel/Images/hond.jpg",
                    "Carousel/Images/uil.jpg",
                ]);
            };
            Carousel = __decorate([
                Vidyano.WebComponents.WebComponent.register({
                    properties: {
                        carouselImages: {
                            type: Array,
                            readOnly: true
                        }
                    }
                }, "vc")
            ], Carousel);
            return Carousel;
        }(Vidyano.WebComponents.WebComponent));
        WebComponents.Carousel = Carousel;
    })(WebComponents = VidyanoCrontab.WebComponents || (VidyanoCrontab.WebComponents = {}));
})(VidyanoCrontab || (VidyanoCrontab = {}));
