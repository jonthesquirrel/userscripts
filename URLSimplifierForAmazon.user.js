// ==UserScript==
// @name         URL Simplifier for Amazon
// @namespace    https://jonthesquirrel.github.io
// @version      0.1
// @description  Simplifies amazon.com URLs into their most minimal form.
// @author       jonthesquirrel
// @match        https://www.amazon.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=amazon.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const match = window.location.href.match(/\/dp\/([0-9a-z]+)/gi)

    if (!match) {
        return
    }

    if (/https:\/\/www\.amazon\.com\/dp\/([0-9a-z]+)$/gi.test(window.location.href)) {
        return
    }

    window.location.href = `https://amazon.com${match[0]}`
})();
