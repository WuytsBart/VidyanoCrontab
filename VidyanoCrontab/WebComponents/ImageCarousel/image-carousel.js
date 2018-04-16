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
            ImageCarousel.prototype._setPreviews = function (Index) {
                this.previews = [];
                var tempArray;
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
                    }
                    else if (x < 0) {
                        var z = this.images.length + x;
                        tempArray.push(this.images[z]);
                    }
                }
                this.set("previews", tempArray);
                this.previewIndex = Index;
            };
            ImageCarousel.prototype.attached = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var offset;
                    return __generator(this, function (_a) {
                        _super.prototype.attached.call(this);
                        this._setPreviews(this.previewIndex);
                        if (!this.indicators) {
                            this.$.indicators.style.visibility = "hidden";
                        }
                        offset = Math.floor(this.previewAmount / 2);
                        this.$$(".preview:nth-child(" + offset + ")").classList.add("active");
                        return [2 /*return*/];
                    });
                });
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
                            if (_this.previewIndex + 1 != _this.images.length) {
                                _this._setPreviews(_this.previewIndex + 1);
                            }
                            else {
                                _this._setPreviews(0);
                            }
                            _this._setPreviewActive();
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
            ImageCarousel.prototype._onPreviewForwardTap = function (e) {
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
            };
            ImageCarousel.prototype._onPreviewBackTap = function (e) {
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
            };
            ImageCarousel.prototype._onImagesChanged = function (images, isAttached) {
                var _this = this;
                if (isAttached) {
                    setTimeout(function () {
                        _this.$$(".item:first-child").classList.add("active");
                        _this.$$(".indicator:first-child").classList.add("active");
                        var offset = Math.floor(_this.previewAmount / 2);
                        _this.$$(".preview:nth-child(" + (offset + 1) + ")").classList.add("active");
                        _this._images = Enumerable.from(_this.querySelectorAll(".item"));
                        _this._indicators = Array.from(_this.querySelectorAll(".indicator"));
                    }, 1);
                }
            };
            ImageCarousel.prototype._setPreviewActive = function () {
                if (this.$$(".preview.active")) {
                    this.$$(".preview.active").classList.remove("active");
                }
                for (var i = 0; i <= this.previewAmount; i++) {
                    var test_1 = this.$$(".item.active");
                    var activeElement = test_1.src;
                    if (activeElement === this._getImageSrc(this.previews[i])) {
                        this.$$(".preview:nth-child(" + (i + 1) + ")").classList.add("active");
                        break;
                    }
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
                var tapIndex = e.model.index;
                var tapSrc = this.previews[tapIndex];
                var index;
                for (var i = 0; i < this.images.length; i++) {
                    if (this.images[i] === tapSrc) {
                        index = i;
                    }
                }
                this._clearInterval();
                this._setPreviews(index);
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
                        },
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
            ], ImageCarousel);
            return ImageCarousel;
        }(Vidyano.WebComponents.WebComponent));
        WebComponents.ImageCarousel = ImageCarousel;
    })(WebComponents = Auby.WebComponents || (Auby.WebComponents = {}));
})(Auby || (Auby = {}));
