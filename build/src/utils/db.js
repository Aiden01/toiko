"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var Guild_1 = require("../entity/Guild");
/**
 * Returns guild with the given id from the database
 */
exports.getGuild = function (guildId, connection) {
    return connection.getRepository(Guild_1.Guild).findOne({ guildId: guildId });
};
/**
 * Creates new guild
 */
exports.createGuild = function (guildId, connection) {
    var guild = new Guild_1.Guild();
    guild = __assign({}, guild, Guild_1.defaultSettings, { guildId: guildId });
    var repository = connection.getRepository(Guild_1.Guild);
    return repository.save(guild);
};
//# sourceMappingURL=db.js.map