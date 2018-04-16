

namespace Auby.WebComponents {
    @Vidyano.WebComponents.WebComponent.register({
        properties: {
            size: {
                type: Object,
                observer: "_onSizeChanged"
            },
            intervalDuration: {
                type: Number,
                value: 3000
            },
            inTransition: {
                type: Boolean,
                readOnly: true,
                reflectToAttribute: true
            },
            moveDirection: {
                type: String,
                readOnly: true,
                value: "forward"
            },
            base64: Boolean,
            images: Array,
            imageOpen: Boolean,
            autoRun: {
                type: Boolean
            }
            ,
            previews: Array,
            previewIndex: {
                type: Number,
                value: 0
            },
            indicators: {
                type: Boolean,
                value: false
            },
            previewAmount: {
                type: Number,
                value: 5
            },            
        },
        observers: [
            "_onIntervalDurationChanged(intervalDuration, isAttached)",
            "_onImagesChanged(images, isAttached)",
            "_onAutoRunChanged(autoRun, isAttached)"
        ],
        mediaQueryAttributes: true
    }, "a")
    export class ImageCarousel extends Vidyano.WebComponents.WebComponent {
        readonly inTransition: boolean; private _setInTransition: (value: boolean) => void;
        readonly moveDirection: string; private _setMoveDirection: (value: string) => void;
        
        images: string[];
        intervalDuration: number;
        base64: boolean;
        previews: string[];
        previewIndex: number;
        indicators: boolean;
        previewAmount: number;
        
        private _images: linqjs.Enumerable<Element>;
        private _indicators: Array<Element>;        
        private _interval: number;
        private _trackX: number;
                
        private _setPreviews(Index: number) {            
            this.previews = [];           
            var tempArray: string[];           
            var offset = Math.floor(this.previewAmount / 2);
            var i = 0 - offset;
            tempArray = [];
            for (i; i < this.previewAmount - offset; i++) {
                var x = Index + i;
                if (x < this.images.length && x >= 0) {
                    tempArray.push(this.images[x]);
                }
                else if (x >= this.images.length) {
                    var y = x - this.images.length;
                    tempArray.push(this.images[y]);
                } else if (x < 0) {
                    var z = this.images.length + x;
                    tempArray.push(this.images[z]);
                }                
            }
            this.set("previews", tempArray);
            this.previewIndex = Index;            
        }

        async attached() {
            super.attached();
            this._setPreviews(this.previewIndex);
            if (!this.indicators) {
                this.$.indicators.style.visibility = "hidden";
            }
            var offset = Math.floor(this.previewAmount / 2);
            this.$$(".preview:nth-child(" + offset + ")").classList.add("active");
        }

        detached() {
            this._clearInterval();
            super.detached();            
        }

        private _clearInterval() {
            clearInterval(this._interval);
            this._interval = null;
        }

        private _getImageSrc(value: string) {
            return this.base64 ? `data:image/jpeg;base64,${value}` : `../web2/vulcanize/WebComponents/${value}`;
        }

        private _move(nextIndex?: number) {
            
            try {
                this._setInTransition(true);

                const items = this._images.toArray();
                const activeElement = this.$$(".item.active");

                if (activeElement == null) {
                    this._clearInterval();
                    return;
                }

                const currentIndex = this._images.indexOf(activeElement);

                if (nextIndex == null) {
                    nextIndex = this.moveDirection === "forward" ?
                        this._images.count() > currentIndex + 1 ? currentIndex + 1 : 0 :
                        currentIndex - 1 >= 0 ? currentIndex - 1 : this._images.count() - 1;
                }
                else {
                    this._setMoveDirection(nextIndex < currentIndex && !(currentIndex === this._images.count() - 1 && nextIndex == 0 && this._interval != null) ? "back" : "forward");
                }
                const nextElement = items[nextIndex];
                setTimeout(() => {
                    nextElement.classList.add("next");
                    activeElement.classList.add("move");
                    nextElement.classList.add("move");

                    this.$$(".indicator.active").classList.remove("active");
                    this._indicators[nextIndex].classList.add("active");

                    setTimeout(() => {
                        this._setInTransition(false);

                        activeElement.classList.remove("active");
                        activeElement.classList.remove("move");
                        nextElement.classList.remove("next");
                        nextElement.classList.remove("move");
                        nextElement.classList.add("active");
                       

                        if (this.previewIndex + 1 != this.images.length) {
                            this._setPreviews(this.previewIndex + 1);
                        }
                        else {
                            this._setPreviews(0);
                        }
                        this._setPreviewActive();

                        if (this._interval == null) {
                            this._setInterval();
                        }
                    }, 800);
                }, 20);
            } catch (e) {
                clearInterval(this._interval);
            }
        }

        private _onAutoRunChanged(newValue: boolean, isAttached: boolean) {
            if (!isAttached)
                return;

            if (newValue) {
                this._setInterval();
            } else {
                this._clearInterval();
            }
        }

        private _onBackTap(e: TapEvent) {
            if (this.inTransition)
                return;

            this._clearInterval();
            this._setMoveDirection("back");
            this._move();
        }

        private _onForwardTap(e: TapEvent) {
            if (this.inTransition)
                return;

            this._clearInterval();
            this._setMoveDirection("forward");
            this._move();
        }

        private _onPreviewForwardTap(e: TapEvent) {
            if (this.previewIndex < this.images.length) {
                this._setPreviews(this.previewIndex + 1);
            }
            else {
                this._setPreviews(0);
            }
            
            if (this.$$(".preview.active")) {
                this.$$(".preview.active").classList.remove("active");
            }
            this._setPreviewActive();
        }

        private _onPreviewBackTap(e: TapEvent) {
            if (this.previewIndex > 0) {
                this._setPreviews(this.previewIndex - 1);
            }
            else {
                this._setPreviews(this.images.length - 1);
            }

            if (this.$$(".preview.active")) {
                this.$$(".preview.active").classList.remove("active");
            }
            this._setPreviewActive();
        }

        private _onImagesChanged(images: Array<string>, isAttached: boolean) {
            if (isAttached) {
                setTimeout(() => {
                    this.$$(".item:first-child").classList.add("active");
                    this.$$(".indicator:first-child").classList.add("active");
                    var offset = Math.floor(this.previewAmount / 2);
                    this.$$(".preview:nth-child(" + (offset+1) + ")").classList.add("active");
                                       
                    this._images = Enumerable.from(this.querySelectorAll(".item"));
                    this._indicators = Array.from(this.querySelectorAll(".indicator"));
                    
                }, 1);
            }
        }

        private _setPreviewActive() {            
            if (this.$$(".preview.active")) {
                this.$$(".preview.active").classList.remove("active");
            }
            for (var i = 0; i <= this.previewAmount; i++) {
                const test = <HTMLImageElement>this.$$(".item.active")
                const activeElement = test.src;
                
                if (activeElement === this._getImageSrc(this.previews[i])) {
                    this.$$(".preview:nth-child(" + (i + 1) + ")").classList.add("active");
                    break;
                }
            }
        }

        private _onIndicatorTap(e: TapEvent) {
            if (this.inTransition === true)
                return;

            const index = this._indicators.indexOf(<any>e.currentTarget);
            this._clearInterval();
            this._move(index);
        }

        private _onPreviewTap(e: TapEvent) {
            if (this.inTransition === true)
                return;

            const tapIndex = e.model.index;
            const tapSrc = this.previews[tapIndex];
            var index;
            for (var i = 0; i < this.images.length; i++) {
                if (this.images[i] === tapSrc) {
                     index = i;
                }
            }                        
            this._clearInterval();
            
            this._move(index);   
            this._setPreviews(index - 1);
        }

        private _onItemsTrack(e: any) {
            if (this.inTransition === true)
                return;

            switch (e.detail.state) {
                case 'start':
                    this._trackX = e.detail.x;
                    break;
                case 'end':
                    if (Math.abs(e.detail.x - this._trackX) < 10)
                        return;

                    const moveDirection = e.detail.x < this._trackX ? "forward" : "back";

                    this._clearInterval();
                    this._setMoveDirection(moveDirection);
                    this._move();
                    break;
                default:
                    return;
            }
        }

        private _onSizeChanged(value: Vidyano.WebComponents.ISize) {
            this.customStyle["--ck-image-carousel--width"] = `${value.width}px`;
            this.customStyle["--ck-image-carousel--height"] = `${value.height}px`;
            this.updateStyles();
        }

        private _onIntervalDurationChanged(intervalDuration: number, isAttached: boolean) {
            if (isAttached && this._interval != null) {
                clearInterval(this._interval);
                this._setInterval();
            }
        }

        private _setInterval() {
            if (this._interval != null)
                return;

            this._interval = setInterval(() => {
                if (this.inTransition !== true) {
                    this._setMoveDirection("forward");
                    this._move();
                }
            }, this.intervalDuration);
        }
    }
}