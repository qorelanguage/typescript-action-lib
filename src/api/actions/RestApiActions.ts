interface RestApiActionOptions {
    endpoint: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE'; // Add more if needed
    headers?: { [key: string]: string };
    data?: any;
    params?: { [key: string]: any };
}

class RestApiActions {
    static async executeRestAction(options: RestApiActionOptions): Promise<any> {
        const { endpoint, method, headers, data, params } = options;

        // Add params to the URL for GET requests
        let url = endpoint;
        if (method === 'GET' && params) {
            const queryString = Object.keys(params)
                .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
                .join('&');
            url += `?${queryString}`;
        }

        try {
            const response = await fetch(url, {
                method: method,
                headers: headers || {},
                body: data ? JSON.stringify(data) : undefined,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error executing REST API action:', error);
            throw error;
        }
    }
}

export { RestApiActionOptions, RestApiActions };