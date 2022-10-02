// ==UserScript==
// @name         URL Simplifier for amazon.com
// @namespace    https://jonthesquirrel.github.io
// @version      0.1
// @description  Simplifies Amazon URLs into their most minimal form.
// @author       jonthesquirrel
// @match        https://www.amazon.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=amazon.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const dp = [...window.location.href.matchAll(/https:\/\/www\.amazon\.com\/.*(dp\/.*?)\//gi)][0][1]
    const simplifiedURL = `https://amazon.com/${dp}`
    window.location.href = simplifiedURL
})();
