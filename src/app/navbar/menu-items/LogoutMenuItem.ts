import { Router } from "@angular/router";
import { AuthenticationService } from "../../service/authentication/authentication.service";
import { RoutingMenuItem } from "./RoutingMenuItem";

export class LogoutMenuItem extends RoutingMenuItem {
    authService: AuthenticationService;

    constructor(name: string, route: string, router:Router, authService: AuthenticationService) {
        super(name, route, router);
        this.authService = authService;
    }

    override menuClicked(): void {
        this.authService.logout();
        super.menuClicked();
    }
}