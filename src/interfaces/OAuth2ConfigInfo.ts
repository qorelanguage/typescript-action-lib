interface OAuth2Config {
    client_id: string;
    client_secret: string;
    auth_url: string;
    scope: string;
    redirect_url: string;
    token_url: string;
    auth_options?: any; // additional options as needed
}

export default OAuth2Config;