"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseConnection = void 0;
/*
  Class with definitions that are common
  to both the parent window and the child iframe.
*/
var BaseConnection = /** @class */ (function () {
    function BaseConnection() {
        this._onMessage = null;
        this._windowMessageListener = null;
    }
    /*
      Sets the onMessage callback.
      The callback will be called when a message is received.
    */
    BaseConnection.prototype.onMessage = function (_onMessage) {
        var _this = this;
        this._onMessage = _onMessage;
        if (this._windowMessageListener) {
            window.removeEventListener("message", this._windowMessageListener);
        }
        if (!_onMessage) {
            return;
        }
        this._windowMessageListener = function (event) {
            if (_this._onMessage) {
                _this._onMessage(event.data);
            }
        };
        window.addEventListener("message", this._windowMessageListener);
    };
    return BaseConnection;
}());
exports.BaseConnection = BaseConnection;
