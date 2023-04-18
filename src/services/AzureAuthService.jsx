import { PublicClientApplication } from "@azure/msal-browser";

class AzureAuthService {
  constructor(appSettings) {
    if (!appSettings) {
      console.error("The app settings service was not provided");
      throw new Error("the app settings service was not provided");
    }

    this.appSettings = appSettings;

    let msalConfig = this.GetMsalClientConfiguration();
    this.msalApplication = new PublicClientApplication(msalConfig);
    this.appSettings.GetMsalStoreAuthInCookie();
  }

  // msal application object
  msalApplication;

  // settings service
  appSettings;

  // cached account info
  account;

  HandlePageLoadEvent() {
    // let exceptions bubble up to the caller to handle
    return this.msalApplication.handleRedirectPromise().then((authResult) => {
      this.HandleRedirectResponse(authResult);
    });
  }

  HandleRedirectResponse(authResult) {
    // if this page load is redirect from the Microsoft Identity platform then the
    // authResult will be populated. Otherwise null on other page loads.

    if (authResult !== null) {
      // save the fresh account info from the result.
      this.account = authResult.account;
    } else {
      // see if we have cached accounts.
      const currentAccounts = this.msalApplication.getAllAccounts();

      if (currentAccounts === null) {
        // no cached accounts.
        // user will need to click the sign-in button and redirect to login.
        return;
      } else if (currentAccounts.length > 1) {
        // there are some situations where the user may have multiple (different) cached logins.
        // this code sample does not cover that scenario but just logs a warning here.
        // this conditional block would need to be updated to support multiple accounts.
        // otherwise it will just grab the first one below.
        console.warn("Multiple accounts detected in MSAL account cache.");
        this.account = currentAccounts[0];
      } else if (currentAccounts.length === 1) {
        // we have exactly 1 cached account.
        // set the account info. user may not need to sign in.
        this.account = currentAccounts[0];
      }
    }
  }

  GetMsalClientConfiguration() {
    return {
      auth: {
        clientId: this.appSettings.GetMsalClientId(),
        authority: this.appSettings.GetMsalTenantAuthorityUri(),
        redirectUri: this.appSettings.GetLoginRedirectUri(),
      },
      cache: {
        cacheLocation: this.appSettings.GetMsalCacheLocation(),
        storeAuthStateInCookie: this.appSettings.GetMsalStoreAuthInCookie(),
      },
    };
  }

  GetToken() {
    let tokenRequest = {
      account: this.account,
      scopes: [this.appSettings.GetMsalClientScope()],
    };

    // msal will return the cached token if present, or call to get a new one
    // if it is expired or near expiring.
    return this.msalApplication.acquireTokenSilent(tokenRequest);
  }

  SignIn() {
    let loginRedirectRequestPayload = {
      scopes: [this.appSettings.GetMsalClientScope()],
      prompt: "select_account",
    };

    // this will redirect the web application to the Microsoft Identity platform sign in pages.
    // no code will execute after this point.
    this.msalApplication.loginRedirect(loginRedirectRequestPayload);
  }

  SignOut() {
    if (!this.account) {
      // no cached login to signout
      return;
    }

    let accountInfo = this.msalApplication.getAccountByUsername(
      this.account?.username
    );

    if (accountInfo !== null) {
      let logoutRequestPayload = {
        account: accountInfo,
      };

      this.msalApplication.logout(logoutRequestPayload);
    }
  }
}

export default AzureAuthService;
