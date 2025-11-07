import { RoutingMenuItem } from "./RoutingMenuItem";
import Keycloak from 'keycloak-js';
import { MenuItem } from "./MenuItem";

export class RegisterMenuItem extends MenuItem {
    keycloak: Keycloak;

    constructor(name: string, keycloak: Keycloak) {
        super(name);
        this.keycloak = keycloak;
    }

    override menuClicked(): void {
        this.keycloak.register({
            redirectUri: 'http://localhost:4200/register-success'
        });
    }
}