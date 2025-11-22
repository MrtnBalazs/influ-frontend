export class Button {

    constructor(public text: string, public color: string, public callbackFn: () => void) {
        this.color = "var(--" + color + ")";
    }
    
}