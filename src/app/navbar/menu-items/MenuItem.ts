export abstract class MenuItem {
    name: string;
    
    constructor(name: string) {
        this.name = name;
    }

    abstract menuClicked(): void;
}