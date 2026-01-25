import { i as react_navigation_d_exports } from "../../react-navigation-B-L1yoaO.js";
import { t as browserify_d_exports } from "./browserify.js";
import { t as react_native_clipboard_d_exports } from "./react-native-clipboard.js";
import { t as shopify_d_exports } from "./shopify.js";

//#region lib/externals/src/types.d.ts
interface PluginApiExternals {
  Browserify: typeof browserify_d_exports;
  ReactNativeClipboard: typeof react_native_clipboard_d_exports;
  ReactNavigation: typeof react_navigation_d_exports;
  Shopify: typeof shopify_d_exports;
}
declare module '@revenge-mod/plugins/types' {
  interface UnscopedInitPluginApi {
    externals: PluginApiExternals;
  }
}
//#endregion
export { PluginApiExternals };