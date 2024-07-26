import DataProviderAppInfo from "interfaces/DataProviderAppInfo";
import Logger from "utils/Logger";

export class DataProviderAppCatalog {
    private static registeredApps: Map<string, DataProviderAppInfo> = new Map();

    static registerApp(appInfo: DataProviderAppInfo): void {
        if (this.registeredApps.has(appInfo.name)) {
            Logger.warn(`App '${appInfo.name}' is already registered.`);
            return;
        }
        this.registeredApps.set(appInfo.name, appInfo);
        Logger.info(`Registered app: ${appInfo.display_name}`);
    }

    static getAppInfo(appName: string): DataProviderAppInfo | undefined {
        return this.registeredApps.get(appName);
    }

    static getAllApps(): DataProviderAppInfo[] {
        return Array.from(this.registeredApps.values());
    }
}
