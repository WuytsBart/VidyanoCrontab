

namespace VidyanoCrontab.WebComponents {
    @Vidyano.WebComponents.WebComponent.register({
        properties: {
            selectedColor: {
                type: String,
                value: "theme-color"
            },
            colors: Array,
        }
    }, "vc")
    export class ColorPicker extends Vidyano.WebComponents.WebComponent {
        colors: string[];
        selectedColor: string;


        async attached() {
            super.attached();
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
            ]
                        
        }
        private _setColor(e: TapEvent) {
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
            
        }
    }
}