import { AkairoClient } from 'discord-akairo'
import { Connection } from 'typeorm';

export class ToikoClient extends AkairoClient {
	public database: Connection

	public start(token: string, connection: Connection): Promise<string> {
		this.database = connection
		return this.login(token)
	}
}
