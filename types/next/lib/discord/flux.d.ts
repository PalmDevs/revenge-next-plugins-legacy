import { M as Filter, P as FilterGenerator, q as FilterScopes } from "../../types-Ct0e6YQc.js";
import "../../react-navigation-B-L1yoaO.js";
import { t as DiscordModules } from "../../index-NLeEsMBb.js";
import { n as onAnyFluxEventDispatched, r as onFluxEventDispatched, t as FluxEventDispatchPatch } from "../../dispatcher-BGR-QaRE.js";

//#region lib/discord/src/flux/stores.d.ts
/**
 * A proxy that allows you to access Flux stores by their name, including uninitialized stores.
 *
 * Use `Reflect.ownKeys()` on this proxy to get a list of all initialized stores.
 *
 * @see {@link getStore} for a way to get stores lazily.
 */
declare const Stores: Record<string, DiscordModules.Flux.Store<object>>;
/**
 * Gets a Flux store by its name, and calls the provided callback with the store.
 *
 * @param name The name of the store to get.
 * @param callback A callback that will be called with the store once it is found.
 * @returns A function that can be used to cancel the wait for the store.
 */
declare function getStore<T>(name: string, callback: (store: DiscordModules.Flux.Store<T>) => void): () => void;
type WithStore = FilterGenerator<(<T>() => Filter<{
  Result: DiscordModules.Flux.Store<T>;
  RequiresExports: boolean;
  Scopes: [typeof FilterScopes.Uninitialized, typeof FilterScopes.Initialized];
}>)>;
/**
 * A dynamic filter that matches all Flux stores.
 */
declare const withStore: WithStore;
type WithStoreName = FilterGenerator<(<T>(name: string) => Filter<{
  Result: DiscordModules.Flux.Store<T>;
  RequiresExports: true;
  Scopes: [typeof FilterScopes.Uninitialized, typeof FilterScopes.Initialized];
}>)>;
/**
 * A with-exports filter that matches a Flux store by its name.
 */
declare const withStoreName: WithStoreName;
declare namespace index_d_exports {
  export { FluxEventDispatchPatch, Stores, WithStore, WithStoreName, getStore, onAnyFluxEventDispatched, onFluxEventDispatched, withStore, withStoreName };
}
//#endregion
export { FluxEventDispatchPatch, Stores, WithStore, WithStoreName, getStore, onAnyFluxEventDispatched, onFluxEventDispatched, index_d_exports as t, withStore, withStoreName };