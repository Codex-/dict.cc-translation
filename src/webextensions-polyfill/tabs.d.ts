/// <reference path="runtime.d.ts"/>

// todo: check mdn compatibility
declare module 'webextension-polyfill' {
    ////////////////////
    // Tabs
    ////////////////////
    /**
     * Use the tabs API to interact with the browser's tab system. You can use this API to create, modify, and rearrange tabs in the browser.
     * Permissions: The majority of the tabs API can be used without declaring any permission. However, the "tabs" permission is required in order to populate the url, title, and favIconUrl properties of Tab.
     */
    export namespace tabs {
        /**
         * Tab muted state and the reason for the last state change.
         */
        export interface MutedInfo {
            /** Whether the tab is prevented from playing sound (but hasn't necessarily recently produced sound). Equivalent to whether the muted audio indicator is showing. */
            muted: boolean;
            /**
             * Optional.
             * The reason the tab was muted or unmuted. Not set if the tab's mute state has never been changed.
             * "user": A user input action has set/overridden the muted state.
             * "capture": Tab capture started, forcing a muted state change.
             * "extension": An extension, identified by the extensionId field, set the muted state.
             */
            reason?: string;
            /**
             * Optional.
             * The ID of the extension that changed the muted state. Not set if an extension was not the reason the muted state last changed.
             */
            extensionId?: string;
        }

        export interface Tab {
            /**
             * Optional.
             * Either loading or complete.
             */
            status?: string;
            /** The zero-based index of the tab within its window. */
            index: number;
            /**
             * Optional.
             * The ID of the tab that opened this tab, if any. This property is only present if the opener tab still exists.
             */
            openerTabId?: number;
            /**
             * Optional.
             * The title of the tab. This property is only present if the extension's manifest includes the "tabs" permission.
             */
            title?: string;
            /**
             * Optional.
             * The URL the tab is displaying. This property is only present if the extension's manifest includes the "tabs" permission.
             */
            url?: string;
            /**
             * Whether the tab is pinned.
             */
            pinned: boolean;
            /**
             * Whether the tab is highlighted.
             */
            highlighted: boolean;
            /** The ID of the window the tab is contained within. */
            windowId: number;
            /**
             * Whether the tab is active in its window. (Does not necessarily mean the window is focused.)
             */
            active: boolean;
            /**
             * Optional.
             * The URL of the tab's favicon. This property is only present if the extension's manifest includes the "tabs" permission. It may also be an empty string if the tab is loading.
             */
            favIconUrl?: string;
            /**
             * Optional.
             * The ID of the tab. Tab IDs are unique within a browser session. Under some circumstances a Tab may not be assigned an ID, for example when querying foreign tabs using the sessions API, in which case a session ID may be present. Tab ID can also be set to tabs.TAB_ID_NONE for apps and devtools windows.
             */
            id?: number;
            /** Whether the tab is in an incognito window. */
            incognito: boolean;
            /**
             * Optional.
             * Whether the tab has produced sound over the past couple of seconds (but it might not be heard if also muted). Equivalent to whether the speaker audio indicator is showing.
             */
            audible?: boolean;
            /**
             * Optional.
             * Current tab muted state and the reason for the last state change.
             */
            mutedInfo?: MutedInfo;
            /**
             * Optional. The width of the tab in pixels.
             */
            width?: number;
            /**
             * Optional. The height of the tab in pixels.
             */
            height?: number;
            /**
             * Optional. The session ID used to uniquely identify a Tab obtained from the sessions API.
             */
            sessionId?: string;
        }

        /**
         * Defines how zoom changes in a tab are handled and at what scope.
         */
        export interface ZoomSettings {
            /**
             * Optional.
             * Defines how zoom changes are handled, i.e. which entity is responsible for the actual scaling of the page; defaults to "automatic".
             * "automatic": Zoom changes are handled automatically by the browser.
             * "manual": Overrides the automatic handling of zoom changes. The onZoomChange event will still be dispatched, and it is the responsibility of the extension to listen for this event and manually scale the page. This mode does not support per-origin zooming, and will thus ignore the scope zoom setting and assume per-tab.
             * "disabled": Disables all zooming in the tab. The tab will revert to the default zoom level, and all attempted zoom changes will be ignored.
             */
            mode?: string;
            /**
             * Optional.
             * Defines whether zoom changes will persist for the page's origin, or only take effect in this tab; defaults to per-origin when in automatic mode, and per-tab otherwise.
             * "per-origin": Zoom changes will persist in the zoomed page's origin, i.e. all other tabs navigated to that same origin will be zoomed as well. Moreover, per-origin zoom changes are saved with the origin, meaning that when navigating to other pages in the same origin, they will all be zoomed to the same zoom factor. The per-origin scope is only available in the automatic mode.
             * "per-tab": Zoom changes only take effect in this tab, and zoom changes in other tabs will not affect the zooming of this tab. Also, per-tab zoom changes are reset on navigation; navigating a tab will always load pages with their per-origin zoom factors.
             */
            scope?: string;
            /**
             * Optional.
             * Used to return the default zoom level for the current tab in calls to tabs.getZoomSettings.
             */
            defaultZoomFactor?: number;
        }

        export interface InjectDetails {
            /**
             * Optional.
             * If allFrames is true, implies that the JavaScript or CSS should be injected into all frames of current page. By default, it's false and is only injected into the top frame.
             */
            allFrames?: boolean;
            /**
             * Optional. JavaScript or CSS code to inject.
             * Warning: Be careful using the code parameter. Incorrect use of it may open your extension to cross site scripting attacks.
             */
            code?: string;
            /**
             * Optional. The soonest that the JavaScript or CSS will be injected into the tab.
             * One of: "document_start", "document_end", or "document_idle"
             */
            runAt?: string;
            /** Optional. JavaScript or CSS file to inject. */
            file?: string;
            /**
             * Optional.
             * The frame where the script or CSS should be injected. Defaults to 0 (the top-level frame).
             */
            frameId?: number;
            /**
             * Optional.
             * If matchAboutBlank is true, then the code is also injected in about:blank and about:srcdoc frames if your extension has access to its parent document. Code cannot be inserted in top-level about:-frames. By default it is false.
             */
            matchAboutBlank?: boolean;
        }

        export interface CreateProperties {
            /** Optional. The position the tab should take in the window. The provided value will be clamped to between zero and the number of tabs in the window. */
            index?: number;
            /**
             * Optional.
             * The ID of the tab that opened this tab. If specified, the opener tab must be in the same window as the newly created tab.
             */
            openerTabId?: number;
            /**
             * Optional.
             * The URL to navigate the tab to initially. Fully-qualified URLs must include a scheme (i.e. 'http://www.google.com', not 'www.google.com'). Relative URLs will be relative to the current page within the extension. Defaults to the New Tab Page.
             */
            url?: string;
            /**
             * Optional. Whether the tab should be pinned. Defaults to false
             */
            pinned?: boolean;
            /** Optional. The window to create the new tab in. Defaults to the current window. */
            windowId?: number;
            /**
             * Optional.
             * Whether the tab should become the active tab in the window. Does not affect whether the window is focused (see windows.update). Defaults to true.
             */
            active?: boolean;
        }

        export interface MoveProperties {
            /** The position to move the window to. -1 will place the tab at the end of the window. */
            index: number;
            /** Optional. Defaults to the window the tab is currently in. */
            windowId?: number;
        }

        export interface UpdateProperties {
            /**
             * Optional. Whether the tab should be pinned.
             */
            pinned?: boolean;
            /**
             * Optional. The ID of the tab that opened this tab. If specified, the opener tab must be in the same window as this tab.
             */
            openerTabId?: number;
            /** Optional. A URL to navigate the tab to. */
            url?: string;
            /**
             * Optional. Adds or removes the tab from the current selection.
             */
            highlighted?: boolean;
            /**
             * Optional. Whether the tab should be active. Does not affect whether the window is focused (see windows.update).
             */
            active?: boolean;
            /**
             * Optional. Whether the tab should be muted.
             */
            muted?: boolean;
        }

        export interface CaptureVisibleTabOptions {
            /**
             * Optional.
             * When format is "jpeg", controls the quality of the resulting image. This value is ignored for PNG images. As quality is decreased, the resulting image will have more visual artifacts, and the number of bytes needed to store it will decrease.
             */
            quality?: number;
            /**
             * Optional. The format of an image.
             * One of: "jpeg", or "png"
             */
            format?: string;
        }

        export interface ReloadProperties {
            /** Optional. Whether using any local cache. Default is false. */
            bypassCache?: boolean;
        }

        export interface ConnectInfo {
            /** Optional. Will be passed into onConnect for content scripts that are listening for the connection event. */
            name?: string;
            /**
             * Open a port to a specific frame identified by frameId instead of all frames in the tab.
             */
            frameId?: number;
        }

        export interface MessageSendOptions {
            /** Optional. Send a message to a specific frame identified by frameId instead of all frames in the tab. */
            frameId?: number;
        }

        export interface HighlightInfo {
            /** One or more tab indices to highlight. */
            tabs: number | number[];
            /** Optional. The window that contains the tabs. */
            windowId?: number;
        }

        export interface QueryInfo {
            /**
             * Optional. Whether the tabs have completed loading.
             * One of: "loading", or "complete"
             */
            status?: string;
            /**
             * Optional. Whether the tabs are in the last focused window.
             */
            lastFocusedWindow?: boolean;
            /** Optional. The ID of the parent window, or windows.WINDOW_ID_CURRENT for the current window. */
            windowId?: number;
            /**
             * Optional. The type of window the tabs are in.
             * One of: "normal", "popup", "panel", "app", or "devtools"
             */
            windowType?: string;
            /** Optional. Whether the tabs are active in their windows. */
            active?: boolean;
            /**
             * Optional. The position of the tabs within their windows.
             */
            index?: number;
            /** Optional. Match page titles against a pattern. */
            title?: string;
            /** Optional. Match tabs against one or more URL patterns. Note that fragment identifiers are not matched. */
            url?: string | string[];
            /**
             * Optional. Whether the tabs are in the current window.
             */
            currentWindow?: boolean;
            /** Optional. Whether the tabs are highlighted. */
            highlighted?: boolean;
            /** Optional. Whether the tabs are pinned. */
            pinned?: boolean;
            /**
             * Optional. Whether the tabs are audible.
             */
            audible?: boolean;
            /**
             * Optional. Whether the tabs are muted.
             */
            muted?: boolean;
        }

        export interface TabHighlightInfo {
            windowId: number;
            tabIds: number[];
        }

        export interface TabRemoveInfo {
            /**
             * The window whose tab is closed.
             */
            windowId: number;
            /** True when the tab is being closed because its window is being closed. */
            isWindowClosing: boolean;
        }

        export interface TabAttachInfo {
            newPosition: number;
            newWindowId: number;
        }

        export interface TabChangeInfo {
            /** Optional. The status of the tab. Can be either loading or complete. */
            status?: string;
            /**
             * The tab's new pinned state.
             */
            pinned?: boolean;
            /** Optional. The tab's URL if it has changed. */
            url?: string;
            /**
             * The tab's new audible state.
             */
            audible?: boolean;
            /**
             * The tab's new muted state and the reason for the change.
             */
            mutedInfo?: MutedInfo;
            /**
             * The tab's new favicon URL.
             */
            favIconUrl?: string;
            /**
             * The tab's new title.
             */
            title?: string;
        }

        export interface TabMoveInfo {
            toIndex: number;
            windowId: number;
            fromIndex: number;
        }

        export interface TabDetachInfo {
            oldWindowId: number;
            oldPosition: number;
        }

        export interface TabActiveInfo {
            /** The ID of the tab that has become active. */
            tabId: number;
            /** The ID of the window the active tab changed inside of. */
            windowId: number;
        }

        export interface TabWindowInfo {
            /** The ID of the window of where the tab is located. */
            windowId: number;
        }

        export interface ZoomChangeInfo {
            tabId: number;
            oldZoomFactor: number;
            newZoomFactor: number;
            zoomSettings: ZoomSettings;
        }

        export interface TabHighlightedEvent extends events.Event<(highlightInfo: HighlightInfo) => void> { }

        export interface TabRemovedEvent extends events.Event<(tabId: number, removeInfo: TabRemoveInfo) => void> { }

        export interface TabUpdatedEvent extends events.Event<(tabId: number, changeInfo: TabChangeInfo, tab: Tab) => void> { }

        export interface TabAttachedEvent extends events.Event<(tabId: number, attachInfo: TabAttachInfo) => void> { }

        export interface TabMovedEvent extends events.Event<(tabId: number, moveInfo: TabMoveInfo) => void> { }

        export interface TabDetachedEvent extends events.Event<(tabId: number, detachInfo: TabDetachInfo) => void> { }

        export interface TabCreatedEvent extends events.Event<(tab: Tab) => void> { }

        export interface TabActivatedEvent extends events.Event<(activeInfo: TabActiveInfo) => void> { }

        export interface TabReplacedEvent extends events.Event<(addedTabId: number, removedTabId: number) => void> { }

        export interface TabSelectedEvent extends events.Event<(tabId: number, selectInfo: TabWindowInfo) => void> { }

        export interface TabZoomChangeEvent extends events.Event<(ZoomChangeInfo: ZoomChangeInfo) => void> { }

        /**
         * Injects JavaScript code into a page. For details, see the programmatic injection section of the content scripts doc.
         * @param details Details of the script or CSS to inject. Either the code or the file property must be set, but both may not be set at the same time.
         */
        export function executeScript(details: InjectDetails): Promise<any[]>;
        /**
         * Injects JavaScript code into a page. For details, see the programmatic injection section of the content scripts doc.
         * @param tabId Optional. The ID of the tab in which to run the script; defaults to the active tab of the current window.
         * @param details Details of the script or CSS to inject. Either the code or the file property must be set, but both may not be set at the same time.
         */
        export function executeScript(tabId: number, details: InjectDetails): Promise<any[]>;
        /** Retrieves details about the specified tab. */
        export function get(tabId: number): Promise<Tab>;
        /** Gets the tab that this script call is being made from. May be undefined if called from a non-tab context (for example: a background page or popup view). */
        export function getCurrent(): Promise<Tab>;
        /**
         * Creates a new tab.
         */
        export function create(createProperties: CreateProperties): Promise<Tab>;
        /**
         * Moves one or more tabs to a new position within its window, or to a new window. Note that tabs can only be moved to and from normal (window.type === "normal") windows.
         * @param tabId The tab to move.
         */
        export function move(tabId: number, moveProperties: MoveProperties): Promise<Tab>;
        /**
         * Moves one or more tabs to a new position within its window, or to a new window. Note that tabs can only be moved to and from normal (window.type === "normal") windows.
         * @param tabIds The tabs to move.
         */
        export function move(tabIds: number[], moveProperties: MoveProperties): Promise<Tab[]>;
        /**
         * Modifies the properties of a tab. Properties that are not specified in updateProperties are not modified.
         */
        export function update(updateProperties: UpdateProperties): Promise<Tab>;
        /**
         * Modifies the properties of a tab. Properties that are not specified in updateProperties are not modified.
         * @param tabId Defaults to the selected tab of the current window.
         */
        export function update(tabId: number, updateProperties: UpdateProperties): Promise<Tab>;
        /**
         * Closes a tab.
         * @param tabId The tab to close.
         */
        export function remove(tabId: number): Promise<void>;
        /**
         * Closes several tabs.
         * @param tabIds The list of tabs to close.
         */
        export function remove(tabIds: number[]): Promise<void>;
        /**
         * Captures the visible area of the currently active tab in the specified window. You must have <all_urls> permission to use this method.
         */
        export function captureVisibleTab(): Promise<string>;
        /**
         * Captures the visible area of the currently active tab in the specified window. You must have <all_urls> permission to use this method.
         * @param windowId Optional. The target window. Defaults to the current window.
         */
        export function captureVisibleTab(windowId: number): Promise<string>;
        /**
         * Captures the visible area of the currently active tab in the specified window. You must have <all_urls> permission to use this method.
         * @param options Optional. Details about the format and quality of an image.
         */
        export function captureVisibleTab(options: CaptureVisibleTabOptions): Promise<string>;
        /**
         * Captures the visible area of the currently active tab in the specified window. You must have <all_urls> permission to use this method.
         * @param windowId Optional. The target window. Defaults to the current window.
         * @param options Optional. Details about the format and quality of an image.
         */
        export function captureVisibleTab(windowId: number, options: CaptureVisibleTabOptions): Promise<string>;
        /**
         * Reload a tab.
         * @param tabId The ID of the tab to reload; defaults to the selected tab of the current window.
         */
        export function reload(tabId: number, reloadProperties?: ReloadProperties): Promise<void>;
        /**
         * Reload the selected tab of the current window.
         */
        export function reload(reloadProperties: ReloadProperties): Promise<void>;
        /**
         * Reload the selected tab of the current window.
         */
        export function reload(): Promise<void>;
        /**
         * Duplicates a tab.
         * @param tabId The ID of the tab which is to be duplicated.
         */
        export function duplicate(tabId: number): Promise<Tab>;
        /**
         * Sends a single message to the content script(s) in the specified tab, with an optional callback to run when a response is sent back. The runtime.onMessage event is fired in each content script running in the specified tab for the current extension.
         */
        export function sendMessage(tabId: number, message: any): Promise<any>;
        /**
         * Sends a single message to the content script(s) in the specified tab, with an optional callback to run when a response is sent back. The runtime.onMessage event is fired in each content script running in the specified tab for the current extension.
         */
        export function sendMessage(tabId: number, message: any, options: MessageSendOptions): Promise<any>;
        /**
         * Sends a single request to the content script(s) in the specified tab, with an optional callback to run when a response is sent back. The extension.onRequest event is fired in each content script running in the specified tab for the current extension.
         */
        export function sendRequest(tabId: number, request: any): Promise<any>;
        /** Connects to the content script(s) in the specified tab. The runtime.onConnect event is fired in each content script running in the specified tab for the current extension. */
        export function connect(tabId: number, connectInfo?: ConnectInfo): runtime.Port;
        /**
         * Injects CSS into a page. For details, see the programmatic injection section of the content scripts doc.
         * @param details Details of the script or CSS to inject. Either the code or the file property must be set, but both may not be set at the same time.
         */
        export function insertCSS(details: InjectDetails): Promise<void>;
        /**
         * Injects CSS into a page. For details, see the programmatic injection section of the content scripts doc.
         * @param tabId Optional. The ID of the tab in which to insert the CSS; defaults to the active tab of the current window.
         * @param details Details of the script or CSS to inject. Either the code or the file property must be set, but both may not be set at the same time.
         */
        export function insertCSS(tabId: number, details: InjectDetails): Promise<void>;
        /**
         * Highlights the given tabs.
         */
        export function highlight(highlightInfo: HighlightInfo): Promise<windows.Window>;
        /**
         * Gets all tabs that have the specified properties, or all tabs if no properties are specified.
         */
        export function query(queryInfo: QueryInfo): Promise<Tab[]>;
        /**
         * Detects the primary language of the content in a tab.
         */
        export function detectLanguage(): Promise<string>;
        /**
         * Detects the primary language of the content in a tab.
         * @param tabId Optional. Defaults to the active tab of the current window.
         */
        export function detectLanguage(tabId: number): Promise<string>;
        /**
         * Zooms a specified tab.
         * @param zoomFactor The new zoom factor. Use a value of 0 here to set the tab to its current default zoom factor. Values greater than zero specify a (possibly non-default) zoom factor for the tab.
         */
        export function setZoom(zoomFactor: number): Promise<void>;
        /**
         * Zooms a specified tab.
         * @param tabId Optional. The ID of the tab to zoom; defaults to the active tab of the current window.
         * @param zoomFactor The new zoom factor. Use a value of 0 here to set the tab to its current default zoom factor. Values greater than zero specify a (possibly non-default) zoom factor for the tab.
         */
        export function setZoom(tabId: number, zoomFactor: number): Promise<void>;
        /**
         * Gets the current zoom factor of a specified tab.
         */
        export function getZoom(): Promise<number>;
        /**
         * Gets the current zoom factor of a specified tab.
         * @param tabId Optional. The ID of the tab to get the current zoom factor from; defaults to the active tab of the current window.
         */
        export function getZoom(tabId: number): Promise<number>;
        /**
         * Sets the zoom settings for a specified tab, which define how zoom changes are handled. These settings are reset to defaults upon navigating the tab.
         * @param zoomSettings Defines how zoom changes are handled and at what scope.
         */
        export function setZoomSettings(zoomSettings: ZoomSettings): Promise<void>;
        /**
         * Sets the zoom settings for a specified tab, which define how zoom changes are handled. These settings are reset to defaults upon navigating the tab.
         * @param tabId Optional. The ID of the tab to change the zoom settings for; defaults to the active tab of the current window.
         * @param zoomSettings Defines how zoom changes are handled and at what scope.
         */
        export function setZoomSettings(tabId: number, zoomSettings: ZoomSettings): Promise<void>;
        /**
         * Gets the current zoom settings of a specified tab.
         * Paramater zoomSettings: The tab's current zoom settings.
         */
        export function getZoomSettings(): Promise<ZoomSettings>;
        /**
         * Gets the current zoom settings of a specified tab.
         * @param tabId Optional. The ID of the tab to get the current zoom settings from; defaults to the active tab of the current window.
         * Paramater zoomSettings: The tab's current zoom settings.
         */
        export function getZoomSettings(tabId: number): Promise<ZoomSettings>;

        /**
         * Fired when the highlighted or selected tabs in a window changes.
         */
        export var onHighlighted: TabHighlightedEvent;
        /** Fired when a tab is closed. */
        export var onRemoved: TabRemovedEvent;
        /** Fired when a tab is updated. */
        export var onUpdated: TabUpdatedEvent;
        /** Fired when a tab is attached to a window, for example because it was moved between windows. */
        export var onAttached: TabAttachedEvent;
        /**
         * Fired when a tab is moved within a window. Only one move event is fired, representing the tab the user directly moved. Move events are not fired for the other tabs that must move in response. This event is not fired when a tab is moved between windows. For that, see tabs.onDetached.
         */
        export var onMoved: TabMovedEvent;
        /** Fired when a tab is detached from a window, for example because it is being moved between windows. */
        export var onDetached: TabDetachedEvent;
        /** Fired when a tab is created. Note that the tab's URL may not be set at the time this event fired, but you can listen to onUpdated events to be notified when a URL is set. */
        export var onCreated: TabCreatedEvent;
        /**
         * Fires when the active tab in a window changes. Note that the tab's URL may not be set at the time this event fired, but you can listen to onUpdated events to be notified when a URL is set.
         */
        export var onActivated: TabActivatedEvent;
        /**
         * Fired when a tab is replaced with another tab due to prerendering or instant.
         */
        export var onReplaced: TabReplacedEvent;
        /**
         * Fired when a tab is zoomed.
         */
        export var onZoomChange: TabZoomChangeEvent;

        /**
         * An ID which represents the absence of a browser tab.
         */
        export var TAB_ID_NONE: -1;
    }
}