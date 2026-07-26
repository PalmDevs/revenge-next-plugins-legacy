import type {
    PluginApiExtensionsOptions,
    PluginManifest,
    PluginOptions,
} from './next/lib/plugins/types'

export interface InternalPluginManifest
    extends Omit<PluginManifest, 'format' | 'version'> {}

// Internal import
export function registerInternalPlugin<O extends PluginApiExtensionsOptions>(
    manifest: InternalPluginManifest,
    options: PluginOptions<O>,
    flags: number,
    iflags: number = 0,
): string

export const PluginFlags = {
    Enabled: 1 << 0,
}
