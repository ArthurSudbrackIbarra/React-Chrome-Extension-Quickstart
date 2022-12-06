/*
  This file is the content script of the extension.
  It is injected into the page when the extension is loaded.

  The content script is responsible for injecting the React app into the page.

  The content script also has the responsibility of communicating with the React app.
  This communication is done using the Child class from the messaging module.
*/
import { ReactApp } from "./messaging/ReactApp";

/*
  Global variables.
*/
let injectedDiv: HTMLDivElement | null = null;
let injectedIframe: HTMLIFrameElement | null = null;
let appVisible: boolean = false;

/*
  Function that injects the React app into the page.
*/
function injectReactApp(): void {
  /*
    Return if the app is already injected.
  */
  if (injectedDiv) {
    return;
  }
  /*
    Creating the div element that will contain the React app iframe.
  */
  const div = document.createElement("div");
  div.setAttribute("id", "react-app-div");
  div.setAttribute("class", "opened");
  /*
    Creating the iframe element that will contain the React app.
  */
  const iframe = document.createElement("iframe");
  iframe.setAttribute("id", "react-app-iframe");
  iframe.setAttribute("scrolling", "no");
  iframe.setAttribute("src", chrome.runtime.getURL("index.html"));
  /*
    Injecting the custom CSS to the page.
  */
  const link = document.createElement("link");
  link.setAttribute("rel", "stylesheet");
  link.setAttribute("href", chrome.runtime.getURL("inject.css"));
  document.querySelector("head")?.appendChild(link);
  /*
    Appending the iframe to the div.
    Appending the div to the body.
  */
  div.appendChild(iframe);
  document.querySelector("body")?.appendChild(div);
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
  const KEY_BIND = "Control";
  window.addEventListener("keyup", (event) => {
    if (event.key === KEY_BIND) {
      if (!injectedDiv) {
        injectReactApp();
        startListening();
      } else {
        if (appVisible) {
          injectedDiv.setAttribute("class", "closed");
          appVisible = false;
        } else {
          injectedDiv.setAttribute("class", "opened");
          appVisible = true;
        }
      }
    }
  });
}

// ================================== //
// Make changes as you wish from here //
// to communicate with the React app. //
// ================================== //

function startListening(): void {
  /*
    Instantiate a new Child object.
    This object will be used to communicate with the React app.
  */
  const reactApp = new ReactApp(injectedIframe);
  reactApp.onMessage((message) => {
    console.log("Message received from child iframe: ", message);
    reactApp.sendMessage({
      type: "HELLO_RESPONSE",
      content: {
        message: "Hello from the parent window!",
      },
    });
  });
}

export {};
