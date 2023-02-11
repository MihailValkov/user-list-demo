const baseURL = process.env.REACT_APP_API_URL;

interface IOptions {
  method: string;
  body?: any;
  headers?: HeadersInit | undefined;
  credentials?: 'omit' | 'same-origin' | 'include';
}

async function httpRequest<R>(method: string, url: string, body?: any): Promise<R> {
  if (!baseURL) {
    throw new Error('REACT_APP_API_URL is missing!');
  }

  const options: IOptions = { method, credentials: 'include' };

  if (url.includes('upload')) {
    options.body = body;
  } else {
    options.headers = {};
    options.headers['Content-type'] = 'application/json';
    options.body = body ? JSON.stringify(body) : null;
  }

  try {
    const response = await fetch(`${baseURL}/${url}`, options);
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Something went wrong!');
    }
    return result;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export const http = {
  async get<R>(url: string) {
    return await httpRequest<R>('GET', url);
  },
  async post<R>(url: string, body: any) {
    return await httpRequest<R>('POST', url, body);
  },
  async put<R>(url: string, body: any) {
    return await httpRequest<R>('PUT', url, body);
  },
  async patch<R>(url: string, body: any) {
    return await httpRequest<R>('PATCH', url, body);
  },
  async del<R>(url: string) {
    return await httpRequest<R>('DELETE', url);
  }
};
