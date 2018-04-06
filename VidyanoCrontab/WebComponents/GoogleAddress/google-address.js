"use strict";
var VidyanoCrontab;
(function (VidyanoCrontab) {
    var WebComponents;
    (function (WebComponents) {
        var GoogleAddress = /** @class */ (function (_super) {
            __extends(GoogleAddress, _super);
            function GoogleAddress() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            GoogleAddress.prototype._testFunction = function () {
                console.log(this.address);
                this._setAddress();
                console.log(this.address);
            };
            GoogleAddress.prototype._initAutocomplete = function () {
                var autocomplete = new google.maps.places.Autocomplete(document.getElementById('autoComplete'));
                google.maps.event.addListener(autocomplete, 'place_changed', function () { });
            };
            GoogleAddress.prototype._setAddress = function () {
                this.address = document.getElementById('autoComplete').value;
            };
            GoogleAddress.prototype.attached = function () {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        _super.prototype.attached.call(this);
                        this._initAutocomplete();
                        return [2 /*return*/];
                    });
                });
            };
            GoogleAddress = __decorate([
                Vidyano.WebComponents.WebComponent.register({
                    properties: {
                        address: {
                            type: String,
                        }
                    }
                }, "vc")
            ], GoogleAddress);
            return GoogleAddress;
        }(Vidyano.WebComponents.WebComponent));
        WebComponents.GoogleAddress = GoogleAddress;
    })(WebComponents = VidyanoCrontab.WebComponents || (VidyanoCrontab.WebComponents = {}));
})(VidyanoCrontab || (VidyanoCrontab = {}));
