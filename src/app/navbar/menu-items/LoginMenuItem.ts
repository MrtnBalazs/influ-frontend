import Keycloak from 'keycloak-js';
import { MenuItem } from "./MenuItem";

export class LoginMenuItem extends MenuItem {
    keycloak: Keycloak;

    constructor(name: string, keycloak: Keycloak) {
        super(name);
        this.keycloak = keycloak;
    }

    menuClicked(): void {
        this.keycloak.login();
    }
}