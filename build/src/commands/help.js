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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var discord_akairo_1 = require("discord-akairo");
var R = require("ramda");
var index_1 = require("../utils/index");
var default_1 = /** @class */ (function (_super) {
    __extends(default_1, _super);
    function default_1() {
        return _super.call(this, 'help', {
            aliases: ['help', 'wut', 'what'],
            args: [{ id: 'command', type: 'string' }],
            description: 'Sends this help message',
        }) || this;
    }
    default_1.prototype.exec = function (_a, _b) {
        var channel = _a.channel;
        var commandName = _b.command;
        var commandHandler = this.client.commandHandler;
        var modules = __spread(commandHandler.modules.values());
        if (!commandName) {
            // Send all available commands embed
            var getCommands = R.pipe(R.map(function (cmd) { return "__" + cmd.id + "__ => " + cmd.description; }), R.join('\n'));
            return channel.send({
                embed: this.availableCommandsEmbed(getCommands(modules)),
            });
        }
        // Send information about the command
        var command = commandHandler.findCommand(commandName);
        if (!command) {
            return channel.send("Command " + commandName + " not found.");
        }
        return channel.send({ embed: index_1.buildCommandHelp(command) });
    };
    /**
     * Returns the embed for all available commands
     */
    default_1.prototype.availableCommandsEmbed = function (commands) {
        return {
            description: 'Type ?help <command> to get more information about a command',
            fields: [
                {
                    name: 'Available commands',
                    value: commands,
                },
            ],
            title: '(╯°□°）╯︵ ┻━┻',
        };
    };
    return default_1;
}(discord_akairo_1.Command));
exports.default = default_1;
//# sourceMappingURL=help.js.map