"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var discord_akairo_1 = require("discord-akairo");
var ToikoClient = /** @class */ (function (_super) {
    __extends(ToikoClient, _super);
    function ToikoClient(options, clientOptions) {
        return _super.call(this, options, clientOptions) || this;
    }
    ToikoClient.prototype.start = function (token, connection) {
        this.database = connection;
        return this.login(token);
    };
    return ToikoClient;
}(discord_akairo_1.AkairoClient));
exports.ToikoClient = ToikoClient;
//# sourceMappingURL=client.js.map