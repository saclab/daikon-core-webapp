import msalConfiguration from "../secrets/ms-config.json"

class AppSettingsService {
  GetWebApiBaseUri()  {
      return msalConfiguration.REACT_APP_WEB_API_BASE_URI;
  }
  GetMsalClientId() {
      return msalConfiguration.REACT_APP_MSAL_CLIENT_ID;
  }
  GetMsalClientScope() {
      return msalConfiguration.REACT_APP_MSAL_CLIENT_SCOPE;
  }
  GetMsalTenantAuthorityUri() {
      return msalConfiguration.REACT_APP_MSAL_TENANT_AUTHORITY_URI;
  }
  GetMsalCacheLocation() {
      return msalConfiguration.REACT_APP_MSAL_CACHE_LOCATION;
  }
  GetMsalStoreAuthInCookie() {
      let stringValue = msalConfiguration.REACT_APP_MSAL_AUTH_STATE_IN_COOKIE;

      if (stringValue.toLowerCase() === 'true') {
          return true;
      }
      else if (stringValue.toLowerCase() === 'false') {
          return false;
      }
      else {
          throw new Error('MSAL_AUTH_STATE_IN_COOKIE setting is not a valid boolean.');
      }
  }
  GetLoginRedirectUri() {
      return msalConfiguration.REACT_APP_MSAL_LOGIN_REDIRECT_URI;
  }
}

export default AppSettingsService;