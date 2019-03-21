import 'reflect-metadata'
import { createConnection } from "typeorm";
import { POSTGRES_DATABASE, POSTGRES_PASSWORD, POSTGRES_USER, TOKEN } from '../config.json'
import { ToikoClient } from './client'

const client = new ToikoClient(
	{
		allowMention: true,
		commandDirectory: './dist/src/commands/',
		ownerID: '337364150080503809',
		prefix: '?',
	},
	{
		disableEveryone: true,
	}
)
/* tslint:disable */
createConnection({
	database: POSTGRES_DATABASE,
	entities: [__dirname + '/entity/*.ts'],
	host: 'localhost',
	password: POSTGRES_PASSWORD,
	port: 3306,
	synchronize: true,
	type: 'postgres',
	username: POSTGRES_USER,
})
	.then(connection => {
		client
			.start(TOKEN, connection)
			.then(() => console.log('Client is logged'))
	})

	.catch(error => console.log(error))
