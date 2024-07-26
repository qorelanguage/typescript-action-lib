import DataProviderActionCatalog from "@/api/actions/DataProviderActionCatalog";
import { RestApiActionOptions, RestApiActions } from "@/api/actions/RestApiActions";
import DataProviderActionInfo from "@/interfaces/DataProviderActionInfo";
import DataProviderAppInfo from "@/interfaces/DataProviderAppInfo";
import { OAuth2Config, OAuth2Manager } from "./OAuth2Config";
import Logger from "@/utils/Logger";

// Initialize DataProviderActionCatalog
export const initializeDataProvider = () => {
    // Registering an application and actions
    const myAppInfo: DataProviderAppInfo = {
        name: 'app-name-example',
        display_name: 'app-display-name-example',
        short_desc: 'app-short-description-example',
        desc: 'app-long-description-example',
        logo: 'app-logo-url-example'
    };
    DataProviderActionCatalog.registerApp(myAppInfo);

    const myActionInfo: DataProviderActionInfo = {
        action: 'action-example',
        display_name: 'action-name',
        short_desc: 'action-short-desc',
        desc: 'action-long-desc',
        type: 'API', // or 'EVENT' as needed
        input_type: 'json', // Example input type
        output_type: 'json', // Example output type
        options: [] // Example options
    };
    DataProviderActionCatalog.registerAction('myApp', myActionInfo);
};

// Example of executing a REST API action
export const executeRestActionExample = async () => {
    const restActionOptions: RestApiActionOptions = {
        endpoint: 'end-point',
        method: 'GET',
        headers: { Authorization: 'Bearer token' },
        params: { param1: 'value1' },
    };

    try {
        const responseData = await RestApiActions.executeRestAction(restActionOptions);
        Logger.info(`Received data: ${responseData}`);
    } catch (error) {
        console.error('Error executing REST API action:', error);
    }
};

// Example of fetching OAuth2 token
export const fetchOAuthTokenExample = async () => {
    const oauthConfig: OAuth2Config = {
        client_id: 'client-id-example',
        client_secret: 'client-id-secret',
        auth_url: 'oauth-url',
        scope: 'read write',
        redirect_url: 'oauth-callback-url',
        token_url: 'oauth-token'
    };

    const oauthManager = OAuth2Manager.getInstance(oauthConfig);

    try {
        const accessToken = await oauthManager.getToken('AUTHORIZATION_CODE_FROM_CALLBACK');
        Logger.info(`Access token: ${accessToken}`);
    } catch (error) {
        Logger.error(`Error fetching OAuth2 token: ${error}`);
    }
};