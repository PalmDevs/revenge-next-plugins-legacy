import { t as DiscordNativeModules } from "../../native-B7ez-sGx.js";

//#region lib/discord/src/native.d.ts
declare namespace native_d_exports {
  export { BundleUpdaterManager, CacheModule, ClientInfoModule, DeviceModule, FileModule, ThemeModule };
}
/**
 * Naming conventions:
 * - Always use the most recent module name (if we can do it in a non-breaking way)
 * - If the module name starts with "Native", remove it
 * - If the module name starts with "RTN", remove it
 * - If the module name ends with "Module", include it
 * - If the module name ends with "Manager", include it
 */
declare let CacheModule: DiscordNativeModules.CacheModule;
declare let FileModule: DiscordNativeModules.FileModule;
declare let ClientInfoModule: DiscordNativeModules.ClientInfoModule;
declare let DeviceModule: DiscordNativeModules.DeviceModule;
declare let ThemeModule: DiscordNativeModules.ThemeModule;
declare let BundleUpdaterManager: DiscordNativeModules.BundleUpdaterManager;
//#endregion
export { BundleUpdaterManager, CacheModule, ClientInfoModule, DeviceModule, FileModule, ThemeModule, native_d_exports as t };