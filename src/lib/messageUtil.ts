/**
 * License: zlib/libpng
 * @author Santo Pfingsten
 * @see https://github.com/Lusito/dict.cc-translation
 */

// This file contains communication helpers

import * as browser from 'webextension-polyfill';

//fixme: types
export type Callback = (params: any, sender?: any, sendResponse?: any) => any;
// export type Callback = (params: any, sender?: browser.runtime.MessageSender, sendResponse?: (response:any)=>void) => any;

type CallbacksMap = { [s: string]: Callback };

let callbacks: CallbacksMap | null = null;

function init() {
    let callbacks: CallbacksMap = {};
    browser.runtime.onMessage.addListener(
        function (request, sender, sendResponse) {
            if (callbacks) {
                let callback = callbacks[request.action];
                if (callback) {
                    return callback(request.params, sender, sendResponse);
                }
            }
        });
    return callbacks;
}

export function send(name: string, params?: any, callback?: (value: any) => any) {
    let data = {
        action: name,
        params: params
    };
    let promise = browser.runtime.sendMessage(data);
    if (callback)
        promise.then(callback);
}

export function sendSelf(name: string, params: any) {
    if (callbacks) {
        let callback = callbacks[name];
        if (callback) {
            return callback(params);
        }
    }
}

export function sendToAllTabs(name: string, params: any) {
    if (browser.tabs) {
        let data = {
            action: name,
            params: params
        };
        browser.tabs.query({}).then(function (tabs) {
            for (let tab of tabs) {
                let id = tab.id;
                if (id)
                    browser.tabs.sendMessage(id, data);
            }
        });
    }
}

export function sendToTab(tab: browser.tabs.Tab, name: string, params: any, callback?: (value: any) => any) {
    let data = {
        action: name,
        params: params
    };
    if (tab.id) {
        let promise = browser.tabs.sendMessage(tab.id, data);
        if (callback)
            promise.then(callback);
    }
}

export function receive(name: string, callback: Callback) {
    callbacks = init();
    callbacks[name] = callback;
}
