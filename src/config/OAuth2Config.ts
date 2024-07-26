import OAuth2Config from "@/interfaces/OAuth2ConfigInfo";

class OAuth2Manager {
    private static instance: OAuth2Manager;
    private oauthConfig: OAuth2Config;

    private constructor(config: OAuth2Config) {
        this.oauthConfig = config;
    }

    static getInstance(config: OAuth2Config): OAuth2Manager {
        if (!OAuth2Manager.instance) {
            OAuth2Manager.instance = new OAuth2Manager(config);
        }
        return OAuth2Manager.instance;
    }

    async getToken(authorizationCode: string): Promise<string> {
        const { client_id, client_secret, token_url, redirect_url } = this.oauthConfig;

        const tokenParams = {
            client_id,
            client_secret,
            grant_type: 'authorization_code',
            redirect_url,
            code: authorizationCode,
        };

        try {
            const response = await fetch(token_url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(tokenParams)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const responseData = await response.json() as { access_token: string };
            return responseData.access_token;
        } catch (error) {
            console.error('Error fetching OAuth2 token:', error);
            throw error;
        }
    }
}

export { OAuth2Config, OAuth2Manager };