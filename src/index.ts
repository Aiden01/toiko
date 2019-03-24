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
async function main() {
	let retries = 5
	while(retries) {
		try {
			/* tslint:disable */
			const connection = await createConnection({
				database: "toiko",
				entities: [__dirname + '/entity/*.ts'],
				host: 'db',
				password: "postgres",
				port: 5432,
				synchronize: true,
				type: 'postgres',
				username: "postgres",
			})
			await client.start(TOKEN, connection)
			console.log('Client is logged')
			break
		} catch(e) {
		  console.error(e)
		  retries--
		  console.log(`${retries} retries left.`)
		  await new Promise(resolve => setTimeout(resolve, 5000))
	    }
	} 

}

main()