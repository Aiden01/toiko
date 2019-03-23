import 'reflect-metadata'
import { createConnection } from 'typeorm'
import {
	POSTGRES_DATABASE,
	POSTGRES_PASSWORD,
	POSTGRES_USER,
	TOKEN,
} from '../config.json'
import { ToikoClient } from './client'

const client = new ToikoClient({ ownerID: ['337364150080503809'] })
/* tslint:disable */
createConnection({
	database: POSTGRES_DATABASE,
	entities: [__dirname + '/entity/*.ts'],
	host: 'localhost',
	password: POSTGRES_PASSWORD,
	port: 5432,
	synchronize: true,
	type: 'postgres',
	username: POSTGRES_USER,
})
	.then(connection => {
		client.start(TOKEN, connection).then(() => console.log('Client is logged'))
	})

	.catch(error => console.log(error))
