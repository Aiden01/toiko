import { AkairoClient, SequelizeProvider } from 'discord-akairo'
import { Message } from 'discord.js'
import { Model } from 'sequelize'
import { Database } from './db/index'
import { server } from './db/models/Server'

export class ToikoClient extends AkairoClient {
	public settings: SequelizeProvider
	constructor(options, clientOptions) {
		super(
			{
				...options,
				prefix: ({ guild }: Message) => {
					if (guild.id) {
						return this.settings.get(guild.id, 'prefix', '?')
					}
					return '?'
				},
			},
			clientOptions
		)
		this.settings = new SequelizeProvider(server as Model<any, any>, {
			dataColumn: 'settings',
			idColumn: 'guild_id',
		})
	}

	public start(token): Promise<string> {
		Database.sync()
		return this.settings.init().then(() => this.login(token))
	}
}
