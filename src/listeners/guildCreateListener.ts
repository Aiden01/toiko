import { Listener } from 'discord-akairo'
import { Guild } from 'discord.js'
import { ToikoClient } from '../client'
import { createGuild } from '../utils/db'

export default class extends Listener {
	constructor() {
		super('guildCreate', {
			emitter: 'client',
			event: 'guildCreate',
		})
	}

	public async exec({ id }: Guild) {
		const client = this.client as ToikoClient
		try {
			const guild = await createGuild(id, client.database)
			/* tslint:disable */
			console.log(`Guild created successfully: ${guild}`)
		} catch (e) {
			/* tslint:disable */
			console.error(`An error occurred while creating the guild ${e}`)
		}
	}
}
