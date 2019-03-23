import { Command } from 'discord-akairo'
import { Message } from 'discord.js'
import { ToikoClient } from '../../client'
import { editMacro, getMacro } from '../../utils/db'

export default class extends Command {
	constructor() {
		super('editmacro', {
			aliases: ['editmacro'],
			args: [
                { id: 'name', type: 'string' },
                { id: 'newResponse', type: 'string', match: 'rest' }
			],
			category: 'mod',
			description: {
				content: 'Edits the given macro',
				example: '$editmacro hello hello world',
				usage: '$editmacro <macro> <new response>'
			},
			userPermissions: ['MANAGE_MESSAGES']
		})
	}

	public async exec({
		guild,
		channel,
	}: Message, { name, newResponse }: any): Promise<Message | Message[]> {
		const client = this.client as ToikoClient
		name = name.toLowerCase()
		if (!name || !newResponse) {
			return channel.send('Invalid macro or response.')
		}
		try {
			const macro = await getMacro({ guildId: guild.id, name }, client.database)
			if (!macro) {
				return channel.send(`Macro ${name} not found.`)
			}

			await editMacro({ guildId: guild.id, name }, newResponse, client.database)

			return channel.send(`Macro **${name}** has been edited.`)

		} catch (e) {
			return channel.send(`An error occurred: ${e}`)
		}
	}
}
