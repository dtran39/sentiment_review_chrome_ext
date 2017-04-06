// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Get the current URL.
 *
 * @param {function(string)} callback - called when the URL of the current tab
 *   is found.
 */
function getCurrentTabUrl(callback, ids) {
  // Query filter to be passed to chrome.tabs.query - see
  // https://developer.chrome.com/extensions/tabs#method-query
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    // chrome.tabs.query invokes the callback with a list of tabs that match the
    // query. When the popup is opened, there is certainly a window and at least
    // one tab, so we can safely assume that |tabs| is a non-empty array.
    // A window can only have one active tab at a time, so the array consists of
    // exactly one tab.
    var tab = tabs[0];

    // A tab is a plain object that provides information about the tab.
    // See https://developer.chrome.com/extensions/tabs#type-Tab
    var url = tab.url;

    // tab.url is only available if the "activeTab" permission is declared.
    // If you want to see the URL of other tabs (e.g. after removing active:true
    // from |queryInfo|), then the "tabs" permission is required to see their
    // "url" properties.
    console.assert(typeof url == 'string', 'tab.url should be a string');
    callback(url, ids);
    console.log(ids[0]);
  });

  // Most methods of the Chrome extension APIs are asynchronous. This means that
  // you CANNOT do something like this:
  //
  // var url;
  // chrome.tabs.query(queryInfo, function(tabs) {
  //   url = tabs[0].url;
  // });
  // alert(url); // Shows "undefined", because chrome.tabs.query is async.
}

function renderStatus(statusText) {
  document.getElementById('status').textContent = statusText;
}
function handleURL(url, ids) {
  var myRe = /[0-9A-Z]{10}/;
  var myArray = myRe.exec(url);
  var productId = myArray[0];
  // document.getElementById('status').textContent = productId;
  ids[0] = productId;
  return productId;
}
document.addEventListener('DOMContentLoaded', function() {
  var p = new Promise(function(resolve, reject) {
	// Do an async task async task and then...


  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    // chrome.tabs.query invokes the callback with a list of tabs that match the
    // query. When the popup is opened, there is certainly a window and at least
    // one tab, so we can safely assume that |tabs| is a non-empty array.
    // A window can only have one active tab at a time, so the array consists of
    // exactly one tab.
    var tab = tabs[0];

    // A tab is a plain object that provides information about the tab.
    // See https://developer.chrome.com/extensions/tabs#type-Tab
    var url = tab.url;
    // tab.url is only available if the "activeTab" permission is declared.
    // If you want to see the URL of other tabs (e.g. after removing active:true
    // from |queryInfo|), then the "tabs" permission is required to see their
    // "url" properties.
    console.assert(typeof url == 'string', 'tab.url should be a string');
    var myRe = /[0-9A-Z]{10}/;
    var myArray = myRe.exec(url);
    var productId = myArray[0];
    // // document.getElementById('status').textContent = productId;
    if(true) {
    		resolve(productId);
    	}
    	else {
    		reject('Failure!');
    	}
    });
  });
  p.then(function(data) {
    console.log(data);
    var newURL = "localhost:3000/review/" + data;
    chrome.tabs.create({ url: newURL });
  	/* do something with the result */
  }).catch(function(error) {
  	/* error :( */
    console.error(error);
  })


  //
  // var newURL = "http://www.youtube.com/watch?v=oHg5SJYRHA0";
  // chrome.tabs.create({ url: newURL });
});
