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
var default_1 = /** @class */ (function (_super) {
    __extends(default_1, _super);
    function default_1() {
        return _super.call(this, 'wrap', {
            aliases: ['wrap', 'format'],
            args: [{ id: 'lang', type: 'lowercase' }, { id: 'code', match: 'rest' }],
            category: 'utility',
            description: 'Wraps code inside a code block',
        }) || this;
    }
    default_1.prototype.exec = function (_a, _b) {
        var channel = _a.channel;
        var code = _b.code, lang = _b.lang;
        return channel.send(code, { code: lang });
    };
    return default_1;
}(discord_akairo_1.Command));
exports.default = default_1;
//# sourceMappingURL=wrap.js.map