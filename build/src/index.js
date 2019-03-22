"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var config_json_1 = require("../config.json");
var client_1 = require("./client");
var client = new client_1.ToikoClient({
    allowMention: true,
    commandDirectory: './dist/src/commands/',
    listenerDirectory: './dist/src/listeners/',
    ownerID: '337364150080503809',
    prefix: '?',
}, {
    disableEveryone: true,
});
/* tslint:disable */
typeorm_1.createConnection({
    database: config_json_1.POSTGRES_DATABASE,
    entities: [__dirname + '/entity/*.ts'],
    host: 'localhost',
    password: config_json_1.POSTGRES_PASSWORD,
    port: 3306,
    synchronize: true,
    type: 'postgres',
    username: config_json_1.POSTGRES_USER,
})
    .then(function (connection) {
    client
        .start(config_json_1.TOKEN, connection)
        .then(function () { return console.log('Client is logged'); });
})
    .catch(function (error) { return console.log(error); });
//# sourceMappingURL=index.js.map