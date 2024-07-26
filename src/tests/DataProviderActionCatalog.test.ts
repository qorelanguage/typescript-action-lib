import DataProviderActionCatalog from "@/api/actions/DataProviderActionCatalog";
import { DataProviderAppCatalog } from "@/api/apps/DataProviderAppCatalog";

describe('DataProviderActionCatalog', () => {
    beforeEach(() => {
        // Clear registered apps before each test
        jest.clearAllMocks();
    });

    describe('registerAction', () => {
        it('should register an action under an existing app', () => {
            const appInfo = {
                name: 'myapp',
                display_name: 'My Application',
                short_desc: 'An example application for demonstration',
                desc: 'Long description of my application',
                logo: 'https://example.com/myapp_logo.png'
            };
            DataProviderAppCatalog.registerApp(appInfo);

            const actionInfo = {
                action: 'myaction',
                display_name: 'My Action',
                short_desc: 'Description of my action',
                desc: 'Long description of my action',
                type: 'API',
                input_type: 'json',
                output_type: 'json',
                options: []
            };

            DataProviderActionCatalog.registerAction(appInfo.name, actionInfo);

            // Retrieve registered app and action info
            const registeredApp = DataProviderAppCatalog.getAppInfo(appInfo.name);
            expect(registeredApp).toBeDefined();
            expect(registeredApp!.name).toBe('myapp');

        });

        it('should not register an action if the app is not registered', () => {
            const actionInfo = {
                action: 'myaction',
                display_name: 'My Action',
                short_desc: 'Description of my action',
                desc: 'Long description of my action',
                type: 'API',
                input_type: 'json',
                output_type: 'json',
                options: []
            };

            DataProviderActionCatalog.registerAction('nonexistentapp', actionInfo);
        });
    });
});
