import { Command } from 'discord-akairo'
import { Message } from 'discord.js'
import { ToikoClient } from '../../client'
import { getMacro, removeMacro } from '../../utils/db'

export default class extends Command {
	constructor() {
		super('removemacro', {
			aliases: ['removemacro', 'deletemacro'],
			args: [
				{ id: 'name', type: 'string' }
			],
			category: 'mod',
			description: {
				content: 'Removes the given macro',
				example: '$removemacro hello',
				usage: '$removemacro <macro>'
			},
			userPermissions: ['MANAGE_MESSAGES']
		})
	}

	public async exec({
		guild,
		channel,
	}: Message, { name }: any): Promise<Message | Message[]> {
		const client = this.client as ToikoClient
		name = name.toLowerCase()
		if (!name) {
			return channel.send('Invalid macro.')
		}
		try {
			const macro = await getMacro({ guildId: guild.id, name }, client.database)
			if (!macro) {
				return channel.send(`Macro ${name} not found.`)
			}

			await removeMacro({ guildId: guild.id, name }, client.database)

			return channel.send(`Macro **${name}** has been deleted.`)

		} catch (e) {
			return channel.send(`An error occurred: ${e}`)
		}
	}
}
