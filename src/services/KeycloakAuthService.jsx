import Keycloak from "keycloak-js";

class KeycloakAuthService {
  // keycloak object
  keycloak;

  // settings service
  appSettings;

  // cached token
  token;
  account;

  constructor(appSettings) {
    if (!appSettings) {
      console.error("The app settings service was not provided");
      throw new Error("the app settings service was not provided");
    }

    this.appSettings = appSettings;

    let keycloakConfig = this.getKeycloakClientConfiguration();
    this.keycloak = Keycloak(keycloakConfig);
  }

  async HandlePageLoadEvent() {
    await this.keycloak.init({
      onLoad: "check-sso",
      checkLoginIframe: false,
      token: this.token,
      clientId: this.appSettings.GetKeyCloakClientId(),
      realm: this.appSettings.GetKeyCloakRealm(),
      url: this.appSettings.GetKeyCloakServerURL(),
      redirectUri: this.appSettings.GetLoginRedirectUri(),
    });

    if (this.keycloak.authenticated) {
      this.account = this.keycloak.authenticated;
      this.token = this.keycloak.token;
    }
  }

  getKeycloakClientConfiguration() {
    return {
      realm: this.appSettings.GetKeyCloakRealm(),
      url: this.appSettings.GetKeyCloakServerURL(),
      clientId: this.appSettings.GetKeyCloakClientId(),
      onLoad: "check-sso",
      promiseType: "native",
    };
  }

  async GetToken() {
    if (!this.keycloak.authenticated) {
      await this.keycloak.login({
        redirectUri: this.appSettings.GetLoginRedirectUri(),
      });
    }
    this.token = this.keycloak.token;
    return {
      accessToken: this.token,
    };
  }

  SignIn() {
    this.keycloak.login({
      redirectUri: this.appSettings.GetLoginRedirectUri(),
    });
  }

  SignOut() {
    this.keycloak.logout({
      redirectUri: this.appSettings.GetLogoutRedirectUri(),
    });
    this.token = null;
    this.account = false;
  }
}

export default KeycloakAuthService;
