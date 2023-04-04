import { appConfig } from "../config";

export default class KeycloakAppSettingsService {
  GetWebApiBaseUri() {
    return appConfig.REACT_APP_WEB_API_BASE_URI;
  }
  GetLoginRedirectUri() {
    return appConfig.keycloak.REACT_APP_KEYCLOAK_LOGIN_REDIRECT_URI;
  }
  GetLogoutRedirectUri() {
    return appConfig.keycloak.REACT_APP_KEYCLOAK_LOGOUT_REDIRECT_URI;
  }

  GetKeyCloakServerURL() {
    return appConfig.keycloak.REACT_APP_KEYCLOAK_URL;
  }

  GetKeyCloakRealm() {
    return appConfig.keycloak.REACT_APP_KEYCLOAK_REALM;
  }

  GetKeyCloakClientId() {
    return appConfig.keycloak.REACT_APP_KEYCLOAK_CLIENT_ID;
  }
}
