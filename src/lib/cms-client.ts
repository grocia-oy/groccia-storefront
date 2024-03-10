import qs from 'qs';

const CMS_ENDPOINTS = {
  GLOBAL: '/api/global',
  HOMEPAGE: '/api/homepage',
};

interface CMSClientParams {
  config: {
    baseURL: string;
    accessToken?: string;
  };
}

export default class CMSClient {
  private baseURL: string;
  private accessToken?: string;

  constructor({ config }: CMSClientParams) {
    this.baseURL = config.baseURL;
    this.accessToken = config.accessToken;
  }

  private async fetchCMSContent(
    path: string,
    urlParamsObject: { populate?: string[]; locale?: string } = {},
    options: RequestInit = {}
  ) {
    try {
      // Merge default and user options
      const mergedOptions = {
        next: { revalidate: 60 },
        ...options,
      };

      // Build request URL
      const queryString = qs.stringify(urlParamsObject);
      const requestUrl = `${this.baseURL}${path}${
        queryString ? `?${queryString}` : ''
      }`;

      // Trigger API call
      const response = await fetch(requestUrl, mergedOptions);

      const data = await response.json();

      return data;
    } catch (error) {
      throw new Error(`Cannot making request to the server: ${error}`);
    }
  }

  private generateBaseHeaders(
    additionalHeaders?: Record<string, any>,
    accessToken?: string
  ) {
    const baseHeaders: HeadersInit = {
      'Content-Type': 'application/json',
      ...additionalHeaders,
    };

    if (accessToken) baseHeaders['Authorization'] = `Bearer ${accessToken}`;

    return baseHeaders;
  }

  getImageURL(path: string = '/') {
    if (!path.startsWith('/')) throw new Error('path has to ');

    return `${this.baseURL}${path}`;
  }

  async getGlobal(
    lang: string,
    populate: string[] = ['favicon', 'announcement_bar']
  ) {
    const urlQsParams = { populate, locale: lang };

    return await this.fetchCMSContent(CMS_ENDPOINTS.GLOBAL, urlQsParams, {
      headers: this.generateBaseHeaders(),
    });
  }

  async getHomepage(
    lang: string,
    populate: string[] = ['hero_carousel.image', 'hero_carousel.buttons', 'seo']
  ) {
    const urlQsParams = { populate, locale: lang };

    return await this.fetchCMSContent(CMS_ENDPOINTS.HOMEPAGE, urlQsParams, {
      headers: this.generateBaseHeaders(),
    });
  }
}
