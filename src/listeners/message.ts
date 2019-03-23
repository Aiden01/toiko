import { Listener } from 'discord-akairo'
import { Message } from 'discord.js'
import { ToikoClient } from '../client'
import { getMacro } from '../utils/db'

export default class extends Listener {
	constructor() {
		super('message', {
			emitter: 'client',
			event: 'message',
		})
	}

	public async exec(message: Message) {
		const { guild, author, channel } = message
		if (author.bot) {
			return
		}
		const client = this.client as ToikoClient
		try {
			const { command, alias }: any = client.commandHandler.parseWithPrefix(
				message,
				client.commandHandler.prefix as string
			)
			if (command) {
				return
			}
			const macro = await getMacro(
				{ guildId: guild.id, name: alias.toLowerCase() },
				client.database
			)
			if (!macro) {
				return
			}

			return channel.send(macro.response)
		} catch (e) {
			/* tslint:disable */
			console.error(`An error occurred while getting the macro: ${e}`)
		}
	}
}
