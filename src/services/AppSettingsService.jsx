class AppSettingsService {
  GetWebApiBaseUri() {
      console.log(process.env.REACT_APP_WEB_API_BASE_URI);
    return process.env.REACT_APP_WEB_API_BASE_URI;
  }
  GetMsalClientId() {
    return process.env.REACT_APP_MSAL_CLIENT_ID;
  }
  GetMsalClientScope() {
    return process.env.REACT_APP_MSAL_CLIENT_SCOPE;
  }
  GetMsalTenantAuthorityUri() {
    return process.env.REACT_APP_MSAL_TENANT_AUTHORITY_URI;
  }
  GetMsalCacheLocation() {
    return process.env.REACT_APP_MSAL_CACHE_LOCATION;
  }
  GetMsalStoreAuthInCookie() {
    let stringValue = process.env.REACT_APP_MSAL_AUTH_STATE_IN_COOKIE;
    console.log("GetMsalStoreAuthInCookie");
    console.log(process.env.REACT_APP_MSAL_AUTH_STATE_IN_COOKIE);

    if (stringValue.toLowerCase() === "true") {
      return true;
    } else if (stringValue.toLowerCase() === "false") {
      return false;
    } else {
      throw new Error(
        "MSAL_AUTH_STATE_IN_COOKIE setting is not a valid boolean."
      );
    }
  }
  GetLoginRedirectUri() {
    return process.env.REACT_APP_MSAL_LOGIN_REDIRECT_URI;
  }
}

export default AppSettingsService;
