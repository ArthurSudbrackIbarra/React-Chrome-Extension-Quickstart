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
exports.ParentWindow = void 0;
var BaseConnection_1 = require("./BaseConnection");
/*
  ConnectionInterface implementation to
  communicate with the parent window.
*/
var ParentWindow = /** @class */ (function (_super) {
    __extends(ParentWindow, _super);
    function ParentWindow() {
        return _super.call(this) || this;
    }
    /*
      Sends a message to the parent window.
      The parent window is listening and will receive the message.
    */
    ParentWindow.prototype.sendMessage = function (message) {
        if (!window.parent) {
            return;
        }
        window.parent.postMessage(message, "*");
    };
    return ParentWindow;
}(BaseConnection_1.BaseConnection));
exports.ParentWindow = ParentWindow;
