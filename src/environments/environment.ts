export const environment = {
    production: false,
    baseUrl: 'http://localhost:8081',
    //baseUrl: 'https://8vklq.wiremockapi.cloud',
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