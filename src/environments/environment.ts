export const environment = {
    production: false,
    keycloak: {
        config: {
            url: 'http://localhost:8100/auth/',
            realm: 'influ-realm',
            clientId: 'influ-frontend'
        },
        initOptions: {
            onLoad: 'check-sso',
            checkLoginIframe: false
        }
    }
};