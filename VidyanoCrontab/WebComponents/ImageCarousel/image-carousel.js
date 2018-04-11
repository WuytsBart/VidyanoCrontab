"use strict";
var Auby;
(function (Auby) {
    var WebComponents;
    (function (WebComponents) {
        var ImageCarousel = /** @class */ (function (_super) {
            __extends(ImageCarousel, _super);
            function ImageCarousel() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            ImageCarousel.prototype._testFunction = function () {
                console.log(this._indicators);
                console.log(this._previews);
            };
            ImageCarousel.prototype.detached = function () {
                this._clearInterval();
                _super.prototype.detached.call(this);
            };
            ImageCarousel.prototype._clearInterval = function () {
                clearInterval(this._interval);
                this._interval = null;
            };
            ImageCarousel.prototype._getImageSrc = function (value) {
                return this.base64 ? "data:image/jpeg;base64," + value : "../web2/vulcanize/WebComponents/" + value;
            };
            ImageCarousel.prototype._move = function (nextIndex) {
                var _this = this;
                try {
                    this._setInTransition(true);
                    var items = this._images.toArray();
                    var activeElement_1 = this.$$(".item.active");
                    if (activeElement_1 == null) {
                        this._clearInterval();
                        return;
                    }
                    var currentIndex = this._images.indexOf(activeElement_1);
                    if (nextIndex == null) {
                        nextIndex = this.moveDirection === "forward" ?
                            this._images.count() > currentIndex + 1 ? currentIndex + 1 : 0 :
                            currentIndex - 1 >= 0 ? currentIndex - 1 : this._images.count() - 1;
                    }
                    else {
                        this._setMoveDirection(nextIndex < currentIndex && !(currentIndex === this._images.count() - 1 && nextIndex == 0 && this._interval != null) ? "back" : "forward");
                    }
                    var nextElement_1 = items[nextIndex];
                    setTimeout(function () {
                        nextElement_1.classList.add("next");
                        activeElement_1.classList.add("move");
                        nextElement_1.classList.add("move");
                        _this.$$(".indicator.active").classList.remove("active");
                        _this._indicators[nextIndex].classList.add("active");
                        setTimeout(function () {
                            _this._setInTransition(false);
                            activeElement_1.classList.remove("active");
                            activeElement_1.classList.remove("move");
                            nextElement_1.classList.remove("next");
                            nextElement_1.classList.remove("move");
                            nextElement_1.classList.add("active");
                            if (_this._interval == null) {
                                _this._setInterval();
                            }
                        }, 800);
                    }, 20);
                }
                catch (e) {
                    clearInterval(this._interval);
                }
            };
            ImageCarousel.prototype._onAutoRunChanged = function (newValue, isAttached) {
                if (!isAttached)
                    return;
                if (newValue) {
                    this._setInterval();
                }
                else {
                    this._clearInterval();
                }
            };
            ImageCarousel.prototype._onBackTap = function (e) {
                if (this.inTransition)
                    return;
                this._clearInterval();
                this._setMoveDirection("back");
                this._move();
            };
            ImageCarousel.prototype._onForwardTap = function (e) {
                if (this.inTransition)
                    return;
                this._clearInterval();
                this._setMoveDirection("forward");
                this._move();
            };
            ImageCarousel.prototype._onImagesChanged = function (images, isAttached) {
                var _this = this;
                if (isAttached) {
                    setTimeout(function () {
                        _this.$$(".item:first-child").classList.add("active");
                        _this.$$(".indicator:first-child").classList.add("active");
                        _this._images = Enumerable.from(_this.querySelectorAll(".item"));
                        _this._indicators = Array.from(_this.querySelectorAll(".indicator"));
                        _this._previews = Array.from(_this.querySelectorAll(".preview"));
                    }, 1);
                }
            };
            ImageCarousel.prototype._onIndicatorTap = function (e) {
                if (this.inTransition === true)
                    return;
                var index = this._indicators.indexOf(e.currentTarget);
                this._clearInterval();
                this._move(index);
            };
            ImageCarousel.prototype._onPreviewTap = function (e) {
                if (this.inTransition === true)
                    return;
                var index = this._previews.indexOf(e.currentTarget);
                console.log(this._previews[index].__data__);
                this._clearInterval();
                this._move(index);
            };
            ImageCarousel.prototype._onItemsTrack = function (e) {
                if (this.inTransition === true)
                    return;
                switch (e.detail.state) {
                    case 'start':
                        this._trackX = e.detail.x;
                        break;
                    case 'end':
                        if (Math.abs(e.detail.x - this._trackX) < 10)
                            return;
                        var moveDirection = e.detail.x < this._trackX ? "forward" : "back";
                        this._clearInterval();
                        this._setMoveDirection(moveDirection);
                        this._move();
                        break;
                    default:
                        return;
                }
            };
            ImageCarousel.prototype._onSizeChanged = function (value) {
                this.customStyle["--ck-image-carousel--width"] = value.width + "px";
                this.customStyle["--ck-image-carousel--height"] = value.height + "px";
                this.updateStyles();
            };
            ImageCarousel.prototype._onIntervalDurationChanged = function (intervalDuration, isAttached) {
                if (isAttached && this._interval != null) {
                    clearInterval(this._interval);
                    this._setInterval();
                }
            };
            ImageCarousel.prototype._setInterval = function () {
                var _this = this;
                if (this._interval != null)
                    return;
                this._interval = setInterval(function () {
                    if (_this.inTransition !== true) {
                        _this._setMoveDirection("forward");
                        _this._move();
                    }
                }, this.intervalDuration);
            };
            ImageCarousel = __decorate([
                Vidyano.WebComponents.WebComponent.register({
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
                    },
                    observers: [
                        "_onIntervalDurationChanged(intervalDuration, isAttached)",
                        "_onImagesChanged(images, isAttached)",
                        "_onAutoRunChanged(autoRun, isAttached)"
                    ],
                    mediaQueryAttributes: true
                }, "a")
            ], ImageCarousel);
            return ImageCarousel;
        }(Vidyano.WebComponents.WebComponent));
        WebComponents.ImageCarousel = ImageCarousel;
    })(WebComponents = Auby.WebComponents || (Auby.WebComponents = {}));
})(Auby || (Auby = {}));
