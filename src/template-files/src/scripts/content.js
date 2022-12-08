"use strict";
/*
  This file is the content script of the extension.
  It is injected into the page when the extension is loaded.

  The content script has direct access to the DOM of the page
  and is responsible for injecting the React app into the page.

  The content script also has the responsibility of communicating with the React app.
  This communication is done using the ReactApp class from the messaging module.
*/
Object.defineProperty(exports, "__esModule", { value: true });
var ReactApp_1 = require("../messaging/ReactApp");
/*
  Global variables.
*/
var injectedDiv = null;
var injectedIframe = null;
var appVisible = false;
/*
  Function that injects the React app into the page.
*/
function injectReactApp() {
    var _a, _b;
    /*
      Return if the app is already injected.
    */
    if (injectedDiv) {
        return;
    }
    /*
      Creating the div element that will contain the React app iframe.
    */
    var div = document.createElement("div");
    div.setAttribute("id", "react-app-div");
    div.setAttribute("class", "opened");
    /*
      Creating the iframe element that will contain the React app.
    */
    var iframe = document.createElement("iframe");
    iframe.setAttribute("id", "react-app-iframe");
    iframe.setAttribute("scrolling", "no");
    iframe.setAttribute("src", chrome.runtime.getURL("index.html"));
    /*
      Injecting the custom CSS to the page.
    */
    var link = document.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("href", chrome.runtime.getURL("index.css"));
    (_a = document.querySelector("head")) === null || _a === void 0 ? void 0 : _a.appendChild(link);
    /*
      Appending the iframe to the div.
      Appending the div to the body.
    */
    div.appendChild(iframe);
    (_b = document.querySelector("body")) === null || _b === void 0 ? void 0 : _b.appendChild(div);
    /*
      Updating the global variables.
    */
    injectedDiv = div;
    injectedIframe = iframe;
    appVisible = true;
}
/*
  Adding a keydown event listener to the window.
  This event listener will be used to show/hide the app.
  The event listener will only be added if the window is the top window.
*/
if (window.self === window.top) {
    var KEY_BIND_1 = "Control";
    window.addEventListener("keyup", function (event) {
        if (event.key === KEY_BIND_1) {
            if (!injectedDiv) {
                injectReactApp();
                startConnection();
            }
            else {
                if (appVisible) {
                    injectedDiv.setAttribute("class", "closed");
                    appVisible = false;
                }
                else {
                    injectedDiv.setAttribute("class", "opened");
                    appVisible = true;
                }
            }
        }
    });
}
/************************************
  Make changes as you wish from here
  to communicate with the React app.
*/
function startConnection() {
    /*
      Instantiate a new ReactApp object.
      This object will be used to communicate with the React app.
    */
    var reactApp = new ReactApp_1.ReactApp(injectedIframe);
    reactApp.onMessage(function (message) {
        console.log("Message received from child iframe: ", message);
        /*
          Handle the message based on its type.
          Each message type should be handled in a different case.
    
          Create new message types in the messaging/messageTypes.ts file.
        */
        switch (message.type) {
            case "HELLO_REQUEST":
                reactApp.sendMessage({
                    type: "HELLO_RESPONSE",
                    content: {
                        message: "Hello from the parent window!",
                    },
                });
                break;
        }
    });
}
