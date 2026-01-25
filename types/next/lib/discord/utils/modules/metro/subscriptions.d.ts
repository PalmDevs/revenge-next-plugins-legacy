import "../../../../../types-Ct0e6YQc.js";
import { n as ModuleFinishedImportingCallback } from "../../../../../import-tracker-Bhc-0jzq.js";

//#region lib/discord/src/utils/modules/metro/subscriptions.d.ts
declare namespace subscriptions_d_exports {
  export { onModuleFinishedImporting };
}
/**
 * Registers a callback to be called when a module with a specific import path is initialized.
 *
 * @see {@link initializedModuleHasBadExports} to avoid bad module exports.
 *
 * @param callback The callback to be called.
 * @returns A function that unregisters the callback.
 */
declare function onModuleFinishedImporting(callback: ModuleFinishedImportingCallback): () => void;
//#endregion
export { onModuleFinishedImporting, subscriptions_d_exports as t };