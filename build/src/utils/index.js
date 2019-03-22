"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var R = require("ramda");
/**
 * Returns the help embed for the given command
 */
exports.buildCommandHelp = function (_a) {
    var args = _a.args, description = _a.description, aliases = _a.aliases, userPermissions = _a.userPermissions, id = _a.id;
    var getArguments = R.isEmpty(args)
        ? R.always('None')
        : R.compose(R.join('\n'), R.map(R.prop('id')));
    return {
        description: description,
        fields: [
            {
                name: 'Aliases',
                value: aliases.join(', '),
            },
            { name: 'Arguments', value: getArguments(args) },
            {
                name: 'Required permissions',
                value: userPermissions ? userPermissions.toString() : 'None',
            },
        ],
        title: id,
    };
};
//# sourceMappingURL=index.js.map