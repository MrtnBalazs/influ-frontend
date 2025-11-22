import Keycloak from 'keycloak-js';
import { MenuItem } from "./MenuItem";

export class LogoutMenuItem extends MenuItem {
    keycloak: Keycloak;

    constructor(name: string, keycloak: Keycloak) {
        super(name);
        this.keycloak = keycloak;
    }

    override menuClicked(): void {
        this.keycloak.logout();
    }
}