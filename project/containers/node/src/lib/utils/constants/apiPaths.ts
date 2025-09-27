export const API_AUTH_SIGN_UP_PATH = "/users/signup";
export const API_AUTH_LOGIN_PATH = "/users/login";
export const API_AUTH_VALIDATE_TOKEN = "/validateToken";

export const API_PORTFOLIO_CREATE_PATH = "/portfolios";
export const API_PORTFOLIO_UPDATE_PATH = (portfolioId: string) => `/portfolios/${portfolioId}`;
export const API_PORTFOLIO_DELETE_PATH = (portfolioId: string) => `/portfolios/${portfolioId}`;

export const API_DASHBOARD_GET_PATH = "/dashboard";

export const API_TAG_CREATE_PATH = "/tags";
export const API_TAG_GET_ALL_PATH = "/tags";

export const API_CREATE_STOCK_PATH = "/portfolios/${{portfolioId}}/stock";
export const API_UPDATE_STOCK_PATH = (portfolioId: string, assetId: string) =>
  `/portfolios/${portfolioId}/stock/${assetId}`;
export const API_UPDATE_CRYPTO_PATH = (portfolioId: string, assetId: string) =>
  `/portfolios/${portfolioId}/crypto/${assetId}`;
export const API_UPDATE_RESSOURCE_PATH = (portfolioId: string, assetId: string) =>
  `/portfolios/${portfolioId}/ressource/${assetId}`;
export const API_UPDATE_FIXED_REVENUE_PATH = (portfolioId: string, assetId: string) =>
  `/portfolios/${portfolioId}/fixedRevenue/${assetId}`;
export const API_GET_ALL_ASSETS_PATH = "/assets";

export const API_WIDGET_CREATE_PATH_DISTRIBUTION = "/distribution";
export const API_WIDGET_CREATE_PATH_NETWORTH = "/netWorth";
export const API_WIDGET_CREATE_PATH_WATCHLIST = "/watchList";
export const API_WIDGET_GET_ALL_PATH = "/widgets";
export const API_WIDGET_CREATE_PATH = (dashboardId: string) => `/widgets/${dashboardId}`;
export const API_WIDGET_UPDATE_PATH_DISTRIBUTION = (dashboardId: string, widgetId: string) =>
  `/widgets/${dashboardId}` + API_WIDGET_CREATE_PATH_DISTRIBUTION + `/${widgetId}`;
export const API_WIDGET_UPDATE_PATH_NETWORTH = (dashboardId: string, widgetId: string) =>
  `/widgets/${dashboardId}` + API_WIDGET_CREATE_PATH_NETWORTH + `/${widgetId}`;
export const API_WIDGET_UPDATE_PATH_WATCHLIST = (dashboardId: string, widgetId: string) =>
  `/widgets/${dashboardId}` + API_WIDGET_CREATE_PATH_WATCHLIST + `/${widgetId}`;
