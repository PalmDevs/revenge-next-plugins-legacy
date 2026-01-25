import { i as AnyObject } from "../../types-Ct0e6YQc.js";
import { Storage, StorageOptions, t as index_d_exports } from "../storage.js";

//#region lib/storage/src/types.d.ts
declare module '@revenge-mod/plugins/types' {
  interface UnscopedPreInitPluginApi {
    storage: typeof index_d_exports;
  }
  interface PluginApiExtensionsOptions {
    storage?: AnyObject;
  }
  interface PluginOptions<O extends PluginApiExtensionsOptions> {
    storage?: Omit<StorageOptions<NonNullable<O['storage']>>, 'directory'>;
  }
  interface InitPluginApi<O extends PluginApiExtensionsOptions> {
    /**
             * The plugin storage.
             */
    storage: Storage<NonNullable<O['storage']>>;
  }
}