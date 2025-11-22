import { Router } from "@angular/router";
import { MenuItem } from "./MenuItem";

export class RoutingMenuItem extends MenuItem {
    route: string;
    router: Router;
    
    constructor(name: string, route: string, router: Router) {
        super(name);
        this.route = route;
        this.router = router;
    }

    override menuClicked(): void {
        this.router.navigate([this.route]);
    }
}