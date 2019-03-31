import 'reflect-metadata';
import { ToikoClient } from './client';
import { connect } from './utils/db';
import { loadConfig, getConfig } from './utils/config';

(async function main() {
	try {
		await loadConfig('.env');
		const client = new ToikoClient({
			ownerID: ['337364150080503809', '481284371312279573'],
		});
		const connection = await connect({
			database: getConfig('DATABASE_NAME'),
			entities: [__dirname + '/entity/*.ts'],
			host: getConfig('DATABASE_HOST', 'localhost'),
			password: getConfig('DATABASE_PASSWORD'),
			port: getConfig('DATABASE_PORT', 5432),
			synchronize: true,
			type: 'postgres',
			username: getConfig('DATABASE_USERNAME'),
		});
		await client.start(getConfig('TOKEN'), connection);
		console.log('Client is connected');
	} catch (e) {
		console.error(e);
	}
})();
