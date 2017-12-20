// todo: check mdn compatibility
declare module 'webextension-polyfill' {
    ////////////////////
    // Bookmarks
    ////////////////////
    /**
     * Use the browser.bookmarks API to create, organize, and otherwise manipulate bookmarks. Also see Override Pages, which you can use to create a custom Bookmark Manager page.
     * Permissions:  "bookmarks"
     */
    export namespace bookmarks {
        /** A node (either a bookmark or a folder) in the bookmark tree. Child nodes are ordered within their parent folder. */
        export interface BookmarkTreeNode {
            /** Optional. The 0-based position of this node within its parent folder.  */
            index?: number;
            /** Optional. When this node was created, in milliseconds since the epoch (new Date(dateAdded)).  */
            dateAdded?: number;
            /** The text displayed for the node. */
            title: string;
            /** Optional. The URL navigated to when a user clicks the bookmark. Omitted for folders.   */
            url?: string;
            /** Optional. When the contents of this folder last changed, in milliseconds since the epoch.   */
            dateGroupModified?: number;
            /** The unique identifier for the node. IDs are unique within the current profile, and they remain valid even after the browser is restarted.  */
            id: string;
            /** Optional. The id of the parent folder. Omitted for the root node.   */
            parentId?: string;
            /** Optional. An ordered list of children of this node.  */
            children?: BookmarkTreeNode[];
            /**
             * Optional.
             * Since Chrome 37.
            * Indicates the reason why this node is unmodifiable. The managed value indicates that this node was configured by the system administrator or by the custodian of a supervised user. Omitted if the node can be modified by the user and the extension (default).
            */
            unmodifiable?: any;
        }

        export interface BookmarkRemoveInfo {
            index: number;
            parentId: string;
        }

        export interface BookmarkMoveInfo {
            index: number;
            oldIndex: number;
            parentId: string;
            oldParentId: string;
        }

        export interface BookmarkChangeInfo {
            url?: string;
            title: string;
        }

        export interface BookmarkReorderInfo {
            childIds: string[];
        }

        export interface BookmarkRemovedEvent extends events.Event<(id: string, removeInfo: BookmarkRemoveInfo) => void> { }

        export interface BookmarkImportEndedEvent extends events.Event<() => void> { }

        export interface BookmarkMovedEvent extends events.Event<(id: string, moveInfo: BookmarkMoveInfo) => void> { }

        export interface BookmarkImportBeganEvent extends events.Event<() => void> { }

        export interface BookmarkChangedEvent extends events.Event<(id: string, changeInfo: BookmarkChangeInfo) => void> { }

        export interface BookmarkCreatedEvent extends events.Event<(id: string, bookmark: BookmarkTreeNode) => void> { }

        export interface BookmarkChildrenReordered extends events.Event<(id: string, reorderInfo: BookmarkReorderInfo) => void> { }

        export interface BookmarkSearchQuery {
            query?: string;
            url?: string;
            title?: string;
        }

        export interface BookmarkCreateArg {
            /** Optional. Defaults to the Other Bookmarks folder.  */
            parentId?: string;
            index?: number;
            title?: string;
            url?: string;
        }

        export interface BookmarkDestinationArg {
            parentId?: string;
            index?: number;
        }

        export interface BookmarkChangesArg {
            title?: string;
            url?: string;
        }

        /**
         * Searches for BookmarkTreeNodes matching the given query. Queries specified with an object produce BookmarkTreeNodes matching all specified properties.
         * @param query A string of words and quoted phrases that are matched against bookmark URLs and titles.
         */
        export function search(query: string): Promise<BookmarkTreeNode[]>;
        /**
         * Searches for BookmarkTreeNodes matching the given query. Queries specified with an object produce BookmarkTreeNodes matching all specified properties.
         * @param query An object with one or more of the properties query, url, and title specified. Bookmarks matching all specified properties will be produced.
         */
        export function search(query: BookmarkSearchQuery): Promise<BookmarkTreeNode[]>;
        /**
         * Retrieves the entire Bookmarks hierarchy.
         */
        export function getTree(): Promise<BookmarkTreeNode[]>;
        /**
         * Retrieves the recently added bookmarks.
         * @param numberOfItems The maximum number of items to return.
         */
        export function getRecent(numberOfItems: number): Promise<BookmarkTreeNode[]>;
        /**
         * Retrieves the specified BookmarkTreeNode.
         * @param id A single string-valued id
         */
        export function get(id: string): Promise<BookmarkTreeNode[]>;
        /**
         * Retrieves the specified BookmarkTreeNode.
         * @param idList An array of string-valued ids
         */
        export function get(idList: string[]): Promise<BookmarkTreeNode[]>;
        /**
         * Creates a bookmark or folder under the specified parentId. If url is NULL or missing, it will be a folder.
         */
        export function create(bookmark: BookmarkCreateArg): Promise<BookmarkTreeNode>;
        /**
         * Moves the specified BookmarkTreeNode to the provided location.
         */
        export function move(id: string, destination: BookmarkDestinationArg): Promise<BookmarkTreeNode>;
        /**
         * Updates the properties of a bookmark or folder. Specify only the properties that you want to change; unspecified properties will be left unchanged. Note: Currently, only 'title' and 'url' are supported.
         */
        export function update(id: string, changes: BookmarkChangesArg): Promise<BookmarkTreeNode>;
        /**
         * Removes a bookmark or an empty bookmark folder.
         */
        export function remove(id: string): Promise<void>;
        /**
         * Retrieves the children of the specified BookmarkTreeNode id.
         */
        export function getChildren(id: string): Promise<BookmarkTreeNode[]>;
        /**
         * Since Chrome 14.
         * Retrieves part of the Bookmarks hierarchy, starting at the specified node.
         * @param id The ID of the root of the subtree to retrieve.
         */
        export function getSubTree(id: string): Promise<BookmarkTreeNode[]>;
        /**
         * Recursively removes a bookmark folder.
         */
        export function removeTree(id: string): Promise<void>;

        /** Fired when a bookmark or folder is removed. When a folder is removed recursively, a single notification is fired for the folder, and none for its contents. */
        export var onRemoved: BookmarkRemovedEvent;
        /** Fired when a bookmark import session is ended. */
        export var onImportEnded: BookmarkImportEndedEvent;
        /** Fired when a bookmark import session is begun. Expensive observers should ignore onCreated updates until onImportEnded is fired. Observers should still handle other notifications immediately. */
        export var onImportBegan: BookmarkImportBeganEvent;
        /** Fired when a bookmark or folder changes. Note: Currently, only title and url changes trigger this. */
        export var onChanged: BookmarkChangedEvent;
        /** Fired when a bookmark or folder is moved to a different parent folder. */
        export var onMoved: BookmarkMovedEvent;
        /** Fired when a bookmark or folder is created. */
        export var onCreated: BookmarkCreatedEvent;
        /** Fired when the children of a folder have changed their order due to the order being sorted in the UI. This is not called as a result of a move(). */
        export var onChildrenReordered: BookmarkChildrenReordered;
    }
}