import { appConfig } from "../config";

class AzureAppSettingsService {
  GetWebApiBaseUri() {
    return appConfig.REACT_APP_WEB_API_BASE_URI;
  }
  GetMsalClientId() {
    return appConfig.azure.REACT_APP_MSAL_CLIENT_ID;
  }
  GetMsalClientScope() {
    return appConfig.azure.REACT_APP_MSAL_CLIENT_SCOPE;
  }
  GetMsalTenantAuthorityUri() {
    return appConfig.azure.REACT_APP_MSAL_TENANT_AUTHORITY_URI;
  }
  GetMsalCacheLocation() {
    return appConfig.azure.REACT_APP_MSAL_CACHE_LOCATION;
  }
  GetMsalStoreAuthInCookie() {
    let stringValue = appConfig.azure.REACT_APP_MSAL_AUTH_STATE_IN_COOKIE;

    if (
      typeof stringValue == "undefined" ||
      stringValue === null ||
      stringValue === undefined
    ) {
      console.error("GetMsalStoreAuthInCookie INVALID CONF");
      return false;
    }

    if (stringValue.toLowerCase() === "true") {
      return true;
    } else if (stringValue.toLowerCase() === "false") {
      return false;
    } else {
      // throw new Error(
      //   "MSAL_AUTH_STATE_IN_COOKIE setting is not a valid boolean."
      // );
      console.error("GetMsalStoreAuthInCookie INVALID CONF");
      return false;
    }
  }
  GetLoginRedirectUri() {
    return appConfig.azure.REACT_APP_MSAL_LOGIN_REDIRECT_URI;
  }
}

export default AzureAppSettingsService;
