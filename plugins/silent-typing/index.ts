import { onFluxEventDispatched } from '@revenge-mod/discord/flux'
import { PluginFlags, registerInternalPlugin } from '@revenge-mod/plugins/_'
import { noop } from '@revenge-mod/utils/callback'

registerInternalPlugin(
    {
        id: 'palmdevs.silent-typing',
        name: 'Silent Typing',
        description: 'Disables the typing indicator when you type.',
        author: 'Palm',
        icon: 'KeyboardIcon',
    },
    {
        start({ cleanup }) {
            cleanup(onFluxEventDispatched('TYPING_START_LOCAL', noop))
        },
    },
    PluginFlags.Enabled,
)
