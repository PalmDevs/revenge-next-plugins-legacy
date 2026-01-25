import { x as index_d_exports } from "./types-Ct0e6YQc.js";
import { a as utils_d_exports, c as index_d_exports$1 } from "./utils-DXrVt5U8.js";
import { t as index_d_exports$2 } from "./index-CrguKj0G.js";
import { i as fs_d_exports } from "./fs-DJKLNjzi.js";
import { u as index_d_exports$3 } from "./index-BVQDJlXf.js";
import { a as constants_d_exports } from "./constants-32FpA8yk.js";
import { s as index_d_exports$4 } from "./index-BTYR7jr_.js";
import { t as index_d_exports$5 } from "./index-CDE2ZC1T.js";
import { FunctionComponent } from "react";
import * as _revenge_mod_patcher0 from "@revenge-mod/patcher";
import * as _revenge_mod_assets0 from "@revenge-mod/assets";
import * as PluginApiReact_ from "@revenge-mod/react";

//#region lib/plugins/src/apis/modules.d.ts
interface PluginApiModules {
  finders: PluginApiModulesFinders;
  metro: PluginApiModulesMetro;
  native: PluginApiModulesNative;
}
type PluginApiModulesNative = typeof index_d_exports$3 & {
  fs: typeof fs_d_exports;
};
type PluginApiModulesMetro = typeof utils_d_exports & typeof index_d_exports$1;
type PluginApiModulesFinders = typeof index_d_exports$2 & {
  filters: typeof index_d_exports;
};
//#endregion
//#region lib/plugins/src/apis/plugins.d.ts
interface PluginApiPlugins {
  constants: typeof constants_d_exports;
}
//#endregion
//#region lib/plugins/src/apis/react.d.ts
type PluginApiReact = typeof PluginApiReact_ & {
  jsxRuntime: typeof index_d_exports$4;
  native: typeof index_d_exports$5;
};
//#endregion
//#region lib/plugins/src/types.d.ts
interface PluginApiExtensionsOptions {}
/**
 * The unscoped plugin API (very limited). This API is available as a global for plugins.
 * Available in the `preInit` phase.
 */
interface UnscopedPreInitPluginApi<O extends PluginApiExtensionsOptions = PluginApiExtensionsOptions> {
  modules: PluginApiModules;
  patcher: typeof _revenge_mod_patcher0;
  plugins: PluginApiPlugins;
  react: PluginApiReact;
}
/**
 * The unscoped plugin API (limited). This API is available as a global for plugins.
 * Available in the `init` phase.
 */
interface UnscopedInitPluginApi<O extends PluginApiExtensionsOptions = PluginApiExtensionsOptions> extends UnscopedPreInitPluginApi<O> {
  assets: typeof _revenge_mod_assets0;
}
/**
 * The unscoped plugin API. This API is available as a global for plugins.
 * Available in the `start` and `stop` phase.
 */
interface UnscopedPluginApi<O extends PluginApiExtensionsOptions = PluginApiExtensionsOptions> extends UnscopedInitPluginApi<O> {}
/**
 * A cleanup function that can be registered to be called when the plugin is stopped.
 */
type PluginCleanup = () => any;
/**
 * Registers cleanup functions to be called when the plugin is stopped.
 *
 * @example
 * ```ts
 * cleanup(unpatch)
 * cleanup(unsub)
 * ```
 */
type PluginCleanupApi = (...fns: PluginCleanup[]) => void;
/**
 * Decorates the plugin API for the dependents of the plugin with a decorator function.
 * @param decorator The decorator function to apply.
 *
 * @example
 * ```ts
 * // Your plugin's `init` function:
 * init({ decorate }) {
 *   decorate((plugin, options) => {
 *     plugin.api.customMethod = () => {
 *       console.log('Custom method called!')
 *     }
 *   })
 * }
 *
 * // In another plugin, with your plugin as a dependency:
 * init({ customMethod }) {
 *   customMethod() // Logs: "Custom method called!"
 * }
 * ```
 */
type PluginDecorateApi<O extends PluginApiExtensionsOptions = PluginApiExtensionsOptions, S extends keyof PluginApiInLifecycleMap<O> = keyof PluginApiInLifecycleMap<O>> = (decorator: PluginApiDecorator<O, S>) => void;
/**
 * The decorator function that modifies the plugin API.
 *
 * @param plugin The plugin being decorated.
 * @param options The options the plugin passed.
 *
 * @see {@link PluginDecorateApi}
 */
type PluginApiDecorator<O extends PluginApiExtensionsOptions = PluginApiExtensionsOptions, S extends keyof PluginApiInLifecycleMap<O> = keyof PluginApiInLifecycleMap<O>> = (plugin: Plugin<O, S>, options: O) => void;
/**
 * The plugin API (very limited).
 * Available in the `preInit` phase.
 */
interface PreInitPluginApi<O extends PluginApiExtensionsOptions = PluginApiExtensionsOptions> {
  decorate: PluginDecorateApi<O, 'PreInit'>;
  unscoped: UnscopedPreInitPluginApi;
  cleanup: PluginCleanupApi;
  plugin: Plugin<O, 'PreInit'>;
}
/**
 * The plugin API (limited).
 * Available in the `init` phase.
 */
interface InitPluginApi<O extends PluginApiExtensionsOptions = PluginApiExtensionsOptions> extends PreInitPluginApi<O> {
  decorate: PluginDecorateApi<O, 'Init'>;
  unscoped: UnscopedInitPluginApi;
  plugin: Plugin<O, 'Init'>;
}
/**
 * The plugin API.
 * Available in the `start` and `stop` phase.
 */
interface PluginApi<O extends PluginApiExtensionsOptions = PluginApiExtensionsOptions> extends InitPluginApi<O> {
  decorate: PluginDecorateApi<O, 'Start'>;
  unscoped: UnscopedPluginApi;
  plugin: Plugin<O, 'Start'>;
}
/**
 * The plugin manifest.
 */
interface PluginManifest {
  /**
       * The unique identifier for the plugin.
       */
  id: string;
  /**
       * The name of the plugin.
       */
  name: string;
  /**
       * The author of the plugin.
       */
  author: string;
  /**
       * The description of the plugin.
       */
  description: string;
  /**
       * The icon of the plugin.
       */
  icon?: string;
  /**
       * The dependencies of the plugin.
       */
  dependencies?: PluginDependency[];
}
interface PluginDependency {
  /**
       * The ID of this dependency.
       */
  id: string;
}
interface PluginOptions<O extends PluginApiExtensionsOptions = PluginApiExtensionsOptions> extends PluginLifecycles<O> {
  SettingsComponent?: PluginSettingsComponent<O>;
}
/**
 * The plugin lifecycles.
 */
interface PluginLifecycles<O extends PluginApiExtensionsOptions = PluginApiExtensionsOptions> {
  /**
       * Runs as soon as possible with very limited APIs.
       * Before the index module (module 0)'s factory is run.
       *
       * @param api Plugin API (very limited).
       */
  preInit?: (this: Plugin<O, 'PreInit'>, api: PreInitPluginApi<O>) => any;
  /**
       * Runs as soon as all important modules are initialized.
       * After the index module (module 0)'s factory is run.
       *
       * @param api Plugin API (limited).
       */
  init?: (this: Plugin<O, 'Init'>, api: InitPluginApi<O>) => any;
  /**
       * Runs when the plugin can be started with all APIs available.
       *
       * @param api Plugin API.
       */
  start?: (this: Plugin<O, 'Start'>, api: PluginApi<O>) => any;
  /**
       * Runs when the plugin is stopped.
       *
       * @param api Plugin API.
       */
  stop?: (this: Plugin<O, 'Start'>, api: PluginApi<O>) => any;
}
interface Plugin<O extends PluginApiExtensionsOptions = PluginApiExtensionsOptions, S extends keyof PluginApiInLifecycleMap<O> = keyof PluginApiInLifecycleMap<O>> {
  manifest: PluginManifest;
  lifecycles: PluginLifecycles<O>;
  /**
       * @see {@link PluginFlags}
       */
  flags: number;
  /**
       * @see {@link PluginStatus}
       */
  status: number;
  /**
       * Errors encountered during the plugin lifecycles.
       */
  errors: unknown[];
  SettingsComponent?: PluginSettingsComponent<O>;
  /**
       * Disable the plugin.
       * This will also stop the plugin if it is running.
       */
  disable(this: Plugin<O, S>): Promise<void>;
  /**
       * Stop the plugin.
       */
  stop(this: Plugin<O, S>): Promise<void>;
  /**
       * The plugin API.
       *
       * Not recommended to use this directly.
       */
  api: PluginApiInLifecycleMap<O>[S];
}
/**
 * The plugin API in a specific stage.
 */
type PluginApiInLifecycleMap<O extends PluginApiExtensionsOptions = PluginApiExtensionsOptions> = {
  Register: undefined;
  PreInit: PreInitPluginApi<O>;
  Init: InitPluginApi<O>;
  Start: PluginApi<O>;
};
/**
 * The component that renders the plugin settings page.
 */
interface PluginSettingsComponent<O extends PluginApiExtensionsOptions = PluginApiExtensionsOptions> extends FunctionComponent<{
  api: PluginApi<O>;
}> {}
//#endregion
export { UnscopedPluginApi as _, PluginApiExtensionsOptions as a, PluginCleanupApi as c, PluginLifecycles as d, PluginManifest as f, UnscopedInitPluginApi as g, PreInitPluginApi as h, PluginApiDecorator as i, PluginDecorateApi as l, PluginSettingsComponent as m, Plugin as n, PluginApiInLifecycleMap as o, PluginOptions as p, PluginApi as r, PluginCleanup as s, InitPluginApi as t, PluginDependency as u, UnscopedPreInitPluginApi as v };