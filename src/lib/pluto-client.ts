const PLUTO_ENDPOINTS = {
  V1: {
    FEEDBACKS: '/api/v1/feedbacks/',
  },
};

type PlutoClientParams = {
  config: {
    baseURL: string;
  };
};

export default class PlutoClient {
  private baseURL: string;

  constructor({ config }: PlutoClientParams) {
    this.baseURL = config.baseURL;
  }

  private async fetchPlutoContent(path: string, options: RequestInit = {}) {
    try {
      // Merge default and user options
      const mergedOptions = {
        next: { revalidate: 60 },
        ...options,
      };

      // Build request URL
      const requestUrl = `${this.baseURL}${path}`;

      // Trigger API call
      const response = await fetch(requestUrl, mergedOptions);

      const data = await response.json();

      return data;
    } catch (error) {
      throw new Error(`Cannot making request to the Pluto client: ${error}`);
    }
  }

  private generateBaseHeaders(additionalHeaders?: Record<string, any>) {
    const baseHeaders: HeadersInit = {
      'Content-Type': 'application/json',
      ...additionalHeaders,
    };

    return baseHeaders;
  }

  async createFeedback(data: any) {
    try {
      const response = await this.fetchPlutoContent(
        PLUTO_ENDPOINTS.V1.FEEDBACKS,
        {
          method: 'POST',
          body: JSON.stringify(data),
          headers: this.generateBaseHeaders(),
        }
      );

      return response;
    } catch (error) {
      throw new Error(`Cannot create feedback: ${error}`);
    }
  }
}
