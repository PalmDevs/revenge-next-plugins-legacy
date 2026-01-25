import "../../../types-Ct0e6YQc.js";
import "../../../react-navigation-B-L1yoaO.js";
import { t as DiscordModules } from "../../../index-NLeEsMBb.js";
import { t as actions_d_exports } from "../actions.js";
import "../../../flux-Dx-lbzSG.js";
import "../../../import-tracker-Bhc-0jzq.js";
import "../../../dispatcher-BGR-QaRE.js";
import { s as index_d_exports } from "../../../index-u-_se7Vk.js";
import "../../../utils-BogNaqIL.js";
import { t as design_d_exports } from "../design.js";
import { t as index_d_exports$1 } from "../flux.js";
import { t as main_tabs_v2_d_exports } from "../modules/main_tabs_v2.js";
import { t as index_d_exports$2 } from "../modules/settings.js";
import { t as renderer_d_exports } from "../modules/settings/renderer.js";
import { t as native_d_exports } from "../native.js";
import "../../../index-CrguKj0G.js";
import { t as finders_d_exports } from "../utils/modules/finders.js";
import { t as subscriptions_d_exports } from "../utils/modules/metro/subscriptions.js";

//#region lib/discord/src/types/api.d.ts
interface PluginApiDiscord {
  actions: PluginApiDiscord.Actions;
  common: PluginApiDiscord.Common;
  design: PluginApiDiscord.Design;
  flux: PluginApiDiscord.Flux;
  modules: PluginApiDiscord.Modules;
  native: PluginApiDiscord.Native;
  utils: PluginApiDiscord.Utils;
}
declare namespace PluginApiDiscord {
  type Actions = typeof actions_d_exports;
  type Common = typeof index_d_exports;
  type Design = typeof design_d_exports;
  type Flux = typeof index_d_exports$1;
  type Native = typeof native_d_exports;
  interface Utils {
    finders: typeof finders_d_exports;
    metro: {
      subscriptions: typeof subscriptions_d_exports;
    };
  }
  interface Modules {
    mainTabsV2: typeof main_tabs_v2_d_exports;
    settings: typeof index_d_exports$2 & typeof renderer_d_exports;
  }
}
declare module '@revenge-mod/plugins/types' {
  interface UnscopedInitPluginApi {
    discord: PluginApiDiscord;
  }
  interface InitPluginApi {
    logger: DiscordModules.Logger;
  }
}
//#endregion
export { PluginApiDiscord };