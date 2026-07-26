import { getModules, lookupModule } from '@revenge-mod/modules/finders'
import {
    createFilterGenerator,
    FilterFlag,
} from '@revenge-mod/modules/finders/filters'
import { after, before } from '@revenge-mod/patcher'
import { PluginFlags, registerInternalPlugin } from '@revenge-mod/plugins/_'
import { findInReactFiber, useReRender } from '@revenge-mod/utils/react'
import { SettingsComponent } from './settings'
import type {
    Filter,
    FilterGenerator,
    FilterScopes,
} from '@revenge-mod/modules/finders/filters'
import type {
    ComponentType,
    FC,
    ForwardRefRenderFunction,
    MemoExoticComponent,
    NamedExoticComponent,
    ReactElement,
    RefObject,
} from 'react'

export interface Settings {
    hide: {
        app: boolean
        thread: boolean
        gift: boolean
        voice: boolean
    }
    collapse: {
        actions: boolean
        send: boolean
    }
}

registerInternalPlugin<{ jsonStorage: Settings }>(
    {
        id: 'palmdevs.better-chat-buttons',
        name: 'Better Chat Buttons',
        description:
            'Hiding all annoying chat buttons, or making them never collapse, all configurable.',
        author: 'PalmDevs',
        icon: 'ChatCheckIcon',
    },
    {
        jsonStorage: {
            load: true,
            default: {
                collapse: {
                    actions: false,
                    send: false,
                },
                hide: {
                    gift: true,
                    app: true,
                    thread: true,
                    voice: true,
                },
            },
        },
        async start({ cleanup, jsonStorage: storage }) {
            let reRenderActions: ReturnType<typeof useReRender>
            let shouldHideActions = false

            cleanup(
                getModules(
                    byMemoizedNamedForwardRefExoticComponent<
                        SendButtonRef,
                        {
                            hasPendingAttachments: boolean
                            canSendVoiceMessage: boolean
                        }
                    >('ChatInputSendButton'),
                    ChatInputSendButton => {
                        const [ChatInputActions] = lookupModule(
                            byMemoizedNamedForwardRefExoticComponent<
                                ActionsRef,
                                {
                                    canStartThreads: boolean
                                    isAppLauncherEnabled: boolean
                                    shouldShowGiftButton: boolean
                                }
                            >('ChatInputActions'),
                        )

                        let patchedOnDismissActions: ActionsRef['onDismissActions']

                        cleanup(
                            after(ChatInputSendButton.type, 'render', tree => {
                                const node = findInReactFiber(
                                    tree as ReactElement,
                                    (
                                        tree,
                                    ): tree is {
                                        props: {
                                            items: Array<{
                                                isOnCooldown: boolean
                                                sendEnabled: boolean
                                                sendVoiceMessageEnabled: boolean
                                            }>
                                        }
                                    } => Array.isArray(tree.props?.items),
                                )

                                if (!node) return tree

                                const {
                                    props: {
                                        items: [item],
                                    },
                                } = node

                                if (item.sendVoiceMessageEnabled)
                                    item.sendVoiceMessageEnabled =
                                        !settings.hide.voice

                                const { sendEnabled } = item

                                if (reRenderActions) {
                                    shouldHideActions = sendEnabled
                                    reRenderActions()
                                }

                                if (settings.collapse.send) {
                                    if (!sendEnabled) return null
                                }

                                return tree
                            }),

                            before(ChatInputActions!.type, 'render', args => {
                                const [props] = args

                                if (props.isAppLauncherEnabled)
                                    props.isAppLauncherEnabled =
                                        !settings.hide.app
                                if (props.canStartThreads)
                                    props.canStartThreads =
                                        !settings.hide.thread
                                props.shouldShowGiftButton = !settings.hide.gift

                                return args
                            }),
                            before(ChatInputActions!.type, 'render', args => {
                                const ref = args[1] as
                                    | RefObject<ActionsRef | null>
                                    | undefined // When using DevTools, the ref is undefined

                                if (ref) {
                                    // Ref is only available after the first render
                                    requestAnimationFrame(() => {
                                        const { current } = ref
                                        if (!current) return

                                        const { onDismissActions } = current

                                        if (
                                            onDismissActions ===
                                            patchedOnDismissActions
                                        )
                                            return

                                        patchedOnDismissActions =
                                            current.onDismissActions = () =>
                                                (settings.collapse.actions
                                                    ? onDismissActions
                                                    : current.onShowActions
                                                ).call(current)

                                        cleanup(() => {
                                            current.onDismissActions =
                                                onDismissActions
                                        })
                                    })
                                }

                                return args
                            }),
                        )
                    },
                ),
                // New ChatInput redesign
                getModules(
                    byMemoizedNamedComponent<
                        FC<{
                            shouldShowGiftButton: boolean
                        }>
                    >('ChatInputRightActions'),
                    ChatInputRightActions => {
                        cleanup(
                            before(
                                ChatInputRightActions.type,
                                'render',
                                args => {
                                    const [props] = args

                                    props.shouldShowGiftButton =
                                        !settings.hide.gift

                                    return args
                                },
                            ),
                            after(
                                ChatInputRightActions.type,
                                'render',
                                tree => {
                                    if (
                                        settings.collapse.actions &&
                                        shouldHideActions
                                    )
                                        return null
                                    return tree
                                },
                            ),
                        )

                        // No cleanup to prevent breaking rules of React hooks
                        before(ChatInputRightActions.type, 'render', args => {
                            reRenderActions = useReRender()
                            return args
                        })
                    },
                ),
            )

            const settings = await storage.get()
        },
        SettingsComponent,
    },
    PluginFlags.Enabled,
)

interface ActualNamedExoticComponent<T extends ComponentType<any>, P = object>
    extends NamedExoticComponent<P> {
    render: T
}

interface ForwardRefExoticComponent<T, P = object>
    extends NamedExoticComponent<P> {
    render: ForwardRefRenderFunction<T, P>
}

type ByMemoizedNamedForwardRefExoticComponent = FilterGenerator<
    <T, P = object>(
        name: string,
    ) => Filter<{
        Result: MemoExoticComponent<ForwardRefExoticComponent<T, P>>
        RequiresExports: true
        Scopes: [typeof FilterScopes.Initialized]
    }>
>

type ByMemoizedNamedComponent = FilterGenerator<
    <T extends ComponentType<any>, P = object>(
        name: string,
    ) => Filter<{
        Result: MemoExoticComponent<ActualNamedExoticComponent<T, P>>
        RequiresExports: true
        Scopes: [typeof FilterScopes.Initialized]
    }>
>

const byMemoizedNamedComponent = createFilterGenerator(
    ([name], _, exports) => exports.type?.displayName === name,
    ([name]) => `byMemoizedNamedComponent(${name})`,
    FilterFlag.RequiresExports,
) as ByMemoizedNamedComponent

const byMemoizedNamedForwardRefExoticComponent = createFilterGenerator(
    ([name], _, exports) =>
        exports.type?.render?.length === 2 && exports.type.displayName === name,
    ([name]) => `byMemoizedNamedForwardRefExoticComponent(${name})`,
    FilterFlag.RequiresExports,
) as ByMemoizedNamedForwardRefExoticComponent

interface ActionsRef {
    onDismissActions(): void
    onShowActions(): void
}

interface SendButtonRef {
    setHasText(hasText: boolean): void
}
