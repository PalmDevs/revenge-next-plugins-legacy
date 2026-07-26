import { Design } from '@revenge-mod/discord/design'
import { getModuleWithImportedPath } from '@revenge-mod/discord/utils/modules/finders'
import {
    getModules,
    lookupModule,
    waitForModules,
} from '@revenge-mod/modules/finders'
import {
    createFilterGenerator,
    FilterFlag,
    FilterScopes,
    withName,
    withProps,
} from '@revenge-mod/modules/finders/filters'
import { after, before, instead } from '@revenge-mod/patcher'
import { registerInternalPlugin } from '@revenge-mod/plugins/_'
import { afterJSX } from '@revenge-mod/react/jsx-runtime'
import { proxify } from '@revenge-mod/utils/proxy'
import { findInReactFiber } from '@revenge-mod/utils/react'
import { cloneElement } from 'react'
import type {
    Filter,
    FilterGenerator,
} from '@revenge-mod/modules/finders/filters'
import type {
    ComponentType,
    FC,
    FunctionComponent,
    MemoExoticComponent,
    ReactElement,
} from 'react'

type BasicNavigationObject = {
    navigate(screen: string): void
}

const ScreenName = 'palmdevs.messages-tab.messages'

let navigation: BasicNavigationObject
let MessagesComponent: MemoExoticComponent<FC> | undefined

type FastListElement = ReactElement<{
    sections: number[]
    itemSize: (section: number, row: number) => number
    renderItem: (section: number, row: number) => any
}>

type RouterUtils = {
    transitionTo: (path: string, opts?: any) => void
    transitionToGuild: (guildId: string) => void
}

registerInternalPlugin(
    {
        name: 'Messages Tab',
        author: 'Palm',
        description: 'Brings the messages tab back',
        id: 'palmdevs.messages-tab',
        icon: 'ChatIcon',
    },
    {
        init({ cleanup }) {
            cleanup(
                // Patch navigator and grab navigation object
                waitForModules(
                    withProps('createBottomTabNavigator'),
                    NavigationBottomTabs => {
                        after(
                            NavigationBottomTabs,
                            'createBottomTabNavigator',
                            patchTabNavigator,
                        )
                    },
                ),
                // Redirect /channels/@me to our screen
                getModules(
                    withProps<RouterUtils>('transitionTo'),
                    patchRouterUtils,
                ),
                // Get the Messages page component and patch it
                getModuleWithImportedPath<{
                    default: typeof MessagesComponent
                }>(
                    'modules/main_tabs_v2/native/tabs/messages/Messages.tsx',
                    module => (MessagesComponent = module.default),
                ),
                // Hide Messages button (and divider) at the top of GuildsBar
                getModules(
                    byMemoizedAutoNamedComponent<FunctionComponent>(
                        'GuildsBar',
                    ),
                    patchGuildsBar,
                ),
            )
        },
        stop({ plugin }) {
            plugin.requireReload()
        },
    },
    0,
    0,
)

function MessagesTabScreen() {
    // The page uses data from QuestDockExternalCoordination, so if it's not loaded we can't render it
    const [QDEC] = lookupModule(
        withProps('QuestDockExternalCoordinationContextProvider'),
    )

    if (!MessagesComponent || !QDEC) {
        return (
            <Design.Text color="text-feedback-critical">
                Required components not found.{' '}
                {`Status: QuestDockExternalCoordinationContextProvider - ${QDEC ? 'found' : 'not found'}, MessagesComponent - ${MessagesComponent ? 'found' : 'not found'}`}
            </Design.Text>
        )
    }

    return (
        <QDEC.QuestDockExternalCoordinationContextProvider>
            <MessagesComponent />
        </QDEC.QuestDockExternalCoordinationContextProvider>
    )
}

function patchGuildsBar(GuildsBar: FunctionComponent) {
    afterJSX(GuildsBar, el => {
        after(el.type as MemoExoticComponent<any>, 'type', tree => {
            const node = findInReactFiber(
                tree as ReactElement,
                n => n.type?.name === 'FastList',
            ) as FastListElement | undefined

            if (!node) return tree

            const removals: Array<[section: number, row: number]> = []
            const {
                sections,
                renderItem: origRenderItem,
                itemSize: origItemSize,
            } = node.props

            // Iterate through all sections and rows
            for (let section = 0; section < sections.length; section++) {
                const rowCount = sections[section]

                for (let row = 0; row < rowCount; row++) {
                    const renderedItem = origRenderItem(section, row)

                    switch (renderedItem?.type?.type?.name) {
                        case 'GuildsBarMessages':
                        case 'GuildsBarSeparator':
                            removals.push([section, row])
                    }
                }
            }

            // instead(node.props, 'itemSize', ([section, row], orig) => {
            //     if (removals.some(([s, r]) => s === section && r === row)) {
            //         return 0
            //     }
            //     return orig(section, row)
            // })

            // instead(node.props, 'renderItem', ([section, row], orig) => {
            //     if (removals.some(([s, r]) => s === section && r === row)) {
            //         return null
            //     }
            //     return orig(section, row)
            // })

            return cloneElement(node, {
                itemSize: (section: number, row: number) => {
                    if (removals.some(([s, r]) => s === section && r === row))
                        return 0
                    return origItemSize(section, row)
                },
                renderItem: (section: number, row: number) => {
                    if (removals.some(([s, r]) => s === section && r === row))
                        return null
                    return origRenderItem(section, row)
                },
            })
        })

        return el
    })
}

function patchRouterUtils(RouterUtils: RouterUtils) {
    instead(RouterUtils, 'transitionTo', ([path, opts], orig) => {
        if (path.startsWith('/channels/@me')) {
            // If we don't have the Messages component yet, just do the normal navigation
            if (!MessagesComponent) return orig(path, opts)

            if (opts?.navigationReplace) navigation?.navigate(ScreenName)
            if (opts?.openChannel)
                orig(path, {
                    ...opts,
                    navigationReplace: false,
                })
        } else orig(path, opts)
    })
}

function patchTabNavigator(Tab: any) {
    let cannotPatch = false

    before(Tab, 'Navigator', args => {
        if (cannotPatch) return args

        // We use lookupModule here because if we are in the Navigator,
        // these modules are almost certainly already loaded.
        const [useTabBarTabOptions] = lookupModule(
            withName<
                () => {
                    messages: (opts: {
                        navigation: BasicNavigationObject
                    }) => unknown
                }
            >('useTabBarTabOptions'),
        )

        // If not loaded, we must ensure React gets a correct hook queue, so we fast-fail
        if (!useTabBarTabOptions) {
            cannotPatch = true
            return args
        }

        const props = args[0]
        const screens = props.children.props.children

        // Hook the TabBar to grab the navigation object
        const origTabBar = props.tabBar
        props.tabBar = (tbProps: { navigation: BasicNavigationObject }) => {
            navigation = tbProps.navigation
            return origTabBar(tbProps)
        }

        // biome-ignore lint/correctness/useHookAtTopLevel: Intentional
        const opts = useTabBarTabOptions()

        // If we don't already have a Messages tab, add ours in
        if (!screens.some((s: any) => s?.props?.name === ScreenName)) {
            screens.splice(
                1,
                0,
                <Tab.Screen
                    options={opts.messages({
                        navigation: proxify(() => navigation),
                    })}
                    name={ScreenName}
                    component={MessagesTabScreen}
                />,
            )
        }
        return args
    })

    return Tab
}

type ByMemoizedAutoNamedComponent = FilterGenerator<
    <T extends ComponentType<any> = ComponentType<object>>(
        name: string,
    ) => Filter<{
        Result: MemoExoticComponent<T>
        RequiresExports: true
        Scopes: [typeof FilterScopes.Initialized]
    }>
>

const byMemoizedAutoNamedComponent = createFilterGenerator(
    ([name], _, exports) => exports.type?.name === name,
    ([name]) => `byMemoizedAutoNamedComponent(${name})`,
    FilterFlag.RequiresExports,
    FilterScopes.Initialized,
) as ByMemoizedAutoNamedComponent
