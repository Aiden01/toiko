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
        return _super.call(this, 'set', {
            aliases: ['set'],
            args: [
                { id: 'settingName', type: 'lowercase' },
                { id: 'settingValue', match: 'rest' }
            ],
            channelRestriction: 'guild',
            description: 'Sets the given setting',
            userPermissions: ['MANAGE_GUILD']
        }) || this;
    }
    default_1.prototype.exec = function (_a, _b) {
        var guild = _a.guild, channel = _a.channel;
        var settingName = _b.settingName, settingValue = _b.settingValue;
        // const client = this.client as ToikoClient
        // client.settings.set(guild.id, settingName, settingValue)
        return channel.send('pass');
    };
    return default_1;
}(discord_akairo_1.Command));
exports.default = default_1;
//# sourceMappingURL=set.js.map