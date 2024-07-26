import DataProviderActionInfo from "@/interfaces/DataProviderActionInfo";
import DataProviderAppInfo from "@/interfaces/DataProviderAppInfo";
import Logger from "@/utils/Logger";

export default class DataProviderActionCatalog {
    static registerApp(appInfo: DataProviderAppInfo): void {
        Logger.info(`Registering app: ${appInfo.display_name}`);
        // Logic to register app goes here
    }

    static registerAction(appName: string, actionInfo: DataProviderActionInfo): void {
        Logger.info(`Registering action ${actionInfo.display_name} for app '${appName}'`);
        // Logic to register action goes here
    }
}