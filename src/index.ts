import 'reflect-metadata'
import { TOKEN } from '../config.json'
import { ToikoClient } from './client'
import { connect } from './utils/db'

const client = new ToikoClient({
	ownerID: ['337364150080503809', '481284371312279573'],
})

connect({
	database: 'toiko',
	entities: [__dirname + '/entity/*.ts'],
	host: 'db',
	password: 'postgres',
	port: 5432,
	synchronize: true,
	type: 'postgres',
	username: 'postgres',
})
	.then(connection => client.start(TOKEN, connection))
	.then(() => console.log('Client is connected'))
	.catch(console.error)
