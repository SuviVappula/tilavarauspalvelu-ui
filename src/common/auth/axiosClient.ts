import axios, { AxiosRequestConfig } from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import applyCaseMiddleware from 'axios-case-converter';
import { isClient } from 'react-use/lib/util';
import { authEnabled, oidcUrl, oidcClientId, apiScope } from '../const';

const axiosOptions = {
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
  },
};

const getApiAccessToken = () =>
  sessionStorage.getItem(`oidc.apiToken.${apiScope}`);

export const clearApiAccessToken = (): void =>
  sessionStorage.removeItem(`oidc.apiToken.${apiScope}`);

const setApiAccessToken = (accessToken: string) =>
  sessionStorage.setItem(`oidc.apiToken.${apiScope}`, accessToken);

const getAccessToken = () => {
  const key = `oidc.user:${oidcUrl}/:${oidcClientId}`;
  const data = sessionStorage.getItem(key);

  if (data) {
    try {
      const parsed = JSON.parse(data);
      return parsed.access_token;
    } catch (Exception) {
      return undefined;
    }
  }
  return undefined;
};

const updateApiAccessToken = async (accessToken: string) => {
  if (!apiScope) {
    throw new Error('Application configuration error, illegal api scope.');
  }
  const response = await axios.request({
    responseType: 'json',
    method: 'POST',
    url: `${oidcUrl}/api-tokens/`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  const { data } = response;

  const apiAccessToken = data[apiScope];
  setApiAccessToken(apiAccessToken);

  return apiAccessToken;
};

const axiosClient = applyCaseMiddleware(axios.create(axiosOptions));
if (isClient && authEnabled) {
  axiosClient.interceptors.request.use((req: AxiosRequestConfig) => {
    const apiAccessToken = getApiAccessToken();

    if (apiAccessToken) {
      req.headers.Authorization = `Bearer ${apiAccessToken}`;
    }
    return req;
  });

  const refreshAuthLogic = (failedRequest: any) => {
    const accessToken = getAccessToken();
    return updateApiAccessToken(accessToken).then((apiAccessToken) => {
      // eslint-disable-next-line no-param-reassign
      failedRequest.response.config.headers.Authorization = `Bearer ${apiAccessToken}`;
      return Promise.resolve();
    });
  };

  createAuthRefreshInterceptor(axiosClient, refreshAuthLogic);
}

export default axiosClient;
