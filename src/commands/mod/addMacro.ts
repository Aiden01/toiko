import { Command } from 'discord-akairo'
import { Message } from 'discord.js'
import { ToikoClient } from '../../client'
import { createMacro } from '../../utils/db'

export default class extends Command {
	constructor() {
		super('addmacro', {
			aliases: ['addMacro', 'newmacro'],
			args: [
				{ id: 'name', type: 'string' },
				{ id: 'category', type: 'string' },
				{ id: 'response', type: 'string', match: 'rest' },
			],
			category: 'mod',
			description: {
				content: 'Adds a macro',
				example: '$addmacro ping fun Hello! Ping pong!',
				usage: '$addmacro <name> <category> <response>',
			},
			userPermissions: ['MANAGE_MESSAGES'],
		})
	}

	public async exec(
		{ guild, channel }: Message,
		{ category, name, response }: any
	): Promise<Message | Message[]> {
		const client = this.client as ToikoClient
		if (!category || !name || !response) {
			return channel.send(
				'Insufficient arguments. Type $help addmacro for more information.'
			)
		}
		try {
			await createMacro(
				{
					category: category.toLowerCase(),
					guildId: guild.id,
					name: name.toLowerCase(),
					response,
				},
				client.database
			)
			return channel.send(
				`Macro **${name}** created successfully in category **${category}**.`
			)
		} catch (e) {
			return channel.send(`An error occurred: ${e}`)
		}
	}
}
