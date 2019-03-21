import { AkairoClient } from 'discord-akairo'
import { Message } from 'discord.js'
import { Connection } from 'typeorm';

export class ToikoClient extends AkairoClient {
	public database: Connection
	constructor(options, clientOptions) {
		super(
			{
				...options,
				// prefix: ({ guild }: Message) => {
				// 	if (guild.id) {
				// 		return this.settings.get(guild.id, 'prefix', '?')
				// 	}
				// 	return '?'
				// },
			},
			clientOptions
		)
		
	}

	public start(token: string, connection: Connection): Promise<string> {
		this.database = connection
		return this.login(token)
	}
}
