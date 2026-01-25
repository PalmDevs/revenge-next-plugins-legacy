import "../../../react-navigation-B-L1yoaO.js";
import { t as DiscordModules } from "../../../index-NLeEsMBb.js";

//#region lib/discord/src/modules/settings/index.d.ts
declare namespace index_d_exports {
  export { SettingsItem, SettingsModulesLoadedSubscription, SettingsSection, addSettingsItemToSection, isSettingsModulesLoaded, onSettingsModulesLoaded, refreshSettingsNavigator, refreshSettingsOverviewScreen, registerSettingsItem, registerSettingsItems, registerSettingsSection };
}
type SettingsItem = DiscordModules.Modules.Settings.SettingsItem;
type SettingsSection = DiscordModules.Modules.Settings.SettingsSection;
type SettingsModulesLoadedSubscription = () => void;
/**
 * Checks if the settings modules are loaded.
 */
declare function isSettingsModulesLoaded(): boolean;
/**
 * Subscribes to when settings modules are loaded.
 * Plugins should ideally register their settings in the given callback to ensure fast startup time.
 *
 * If settings modules are already loaded, the callback will be called immediately.
 *
 * @param subcription The subscription function to call when the settings modules are loaded.
 * @returns A function to unsubscribe from the event.
 */
declare function onSettingsModulesLoaded(subcription: SettingsModulesLoadedSubscription): () => void;
/**
 * Registers a settings section with a given key.
 *
 * @param key The key to register the settings section with.
 * @param section The settings section to register.
 * @returns A function to unregister the settings section.
 */
declare function registerSettingsSection(key: string, section: SettingsSection): () => void;
/**
 * Registers a settings item with a given key.
 *
 * @param key The key to register the settings item with.
 * @param item The settings item to register.
 * @returns A function to unregister the settings item.
 */
declare function registerSettingsItem(key: string, item: SettingsItem): () => void;
/**
 * Registers multiple settings items at once.
 *
 * @param record The settings items to register.
 * @returns A function to unregister the settings items.
 */
declare function registerSettingsItems(record: Record<string, SettingsItem>): () => void;
/**
 * Adds a settings item to an existing section.
 *
 * @param key The section to add the settings item to.
 * @param item The settings item to add.
 * @returns A function to remove the settings item from the section.
 */
declare function addSettingsItemToSection(key: string, item: string): () => void;
/**
 * Refreshes the SettingsOverviewScreen.
 */
declare function refreshSettingsOverviewScreen(): void;
/**
 * Refreshes the settings navigator.
 */
declare function refreshSettingsNavigator(): void;
//#endregion
export { SettingsItem, SettingsModulesLoadedSubscription, SettingsSection, addSettingsItemToSection, isSettingsModulesLoaded, onSettingsModulesLoaded, refreshSettingsNavigator, refreshSettingsOverviewScreen, registerSettingsItem, registerSettingsItems, registerSettingsSection, index_d_exports as t };