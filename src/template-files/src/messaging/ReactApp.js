"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactApp = void 0;
var BaseConnection_1 = require("./BaseConnection");
/*
  ConnectionInterface implementation to communicate with
  the child iframe containing the React App.
*/
var ReactApp = /** @class */ (function (_super) {
    __extends(ReactApp, _super);
    function ReactApp(child) {
        var _this = _super.call(this) || this;
        _this.child = null;
        _this.child = child;
        return _this;
    }
    /*
      Sends a message to an iframe element.
      The injected iframe is listening and will receive the message.
    */
    ReactApp.prototype.sendMessage = function (message) {
        if (!this.child) {
            return;
        }
        if (!this.child.contentWindow) {
            return;
        }
        this.child.contentWindow.postMessage(message, "*");
    };
    return ReactApp;
}(BaseConnection_1.BaseConnection));
exports.ReactApp = ReactApp;
