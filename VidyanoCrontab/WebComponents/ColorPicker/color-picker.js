"use strict";
var VidyanoCrontab;
(function (VidyanoCrontab) {
    var WebComponents;
    (function (WebComponents) {
        var ColorPicker = /** @class */ (function (_super) {
            __extends(ColorPicker, _super);
            function ColorPicker() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            ColorPicker.prototype.attached = function () {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        _super.prototype.attached.call(this);
                        this.colors = [
                            "theme-color",
                            "theme-color-light",
                            "theme-color-lighter",
                            "theme-color-dark",
                            "theme-color-darker",
                            "theme-color-faint",
                            "theme-color-semi-faint",
                            "theme-accent-color",
                            "theme-accent-color-light",
                            "theme-accent-color-lighter",
                            "theme-accent-color-dark",
                            "theme-accent-color-darker",
                            "theme-accent-color-faint",
                            "theme-accent-color-semi-faint",
                            "theme-color-error",
                            "theme-color-warning",
                            "theme-color-notice",
                            "theme-color-ok",
                            "theme-foreground",
                            "theme-light-border",
                            "theme-dark-border"
                        ];
                        return [2 /*return*/];
                    });
                });
            };
            ColorPicker.prototype._setColor = function (e) {
                this.selectedColor = e.model.item;
                if (this.$$(".color.active")) {
                    this.$$(".color.active").classList.remove("active");
                }
                for (var i = 0; i <= this.colors.length; i++) {
                    if (this.selectedColor === this.colors[i]) {
                        this.$$(".color:nth-child(" + (i + 1) + ")").classList.add("active");
                        break;
                    }
                }
            };
            ColorPicker = __decorate([
                Vidyano.WebComponents.WebComponent.register({
                    properties: {
                        selectedColor: {
                            type: String,
                            value: "theme-color"
                        },
                        colors: Array,
                    }
                }, "vc")
            ], ColorPicker);
            return ColorPicker;
        }(Vidyano.WebComponents.WebComponent));
        WebComponents.ColorPicker = ColorPicker;
    })(WebComponents = VidyanoCrontab.WebComponents || (VidyanoCrontab.WebComponents = {}));
})(VidyanoCrontab || (VidyanoCrontab = {}));
