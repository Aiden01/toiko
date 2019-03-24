import { Command } from 'discord-akairo'
import { Message, RichEmbedOptions } from 'discord.js'
import { getCommandsInCategory } from '../utils/command'
import { buildCommandHelp, buildEmbed } from '../utils/embed'

export default class extends Command {
	constructor() {
		super('help', {
			aliases: ['help', 'wut', 'what'],
			args: [{ id: 'command', type: 'string' }],
			description: 'Sends this help message',
		})
	}

	public async exec(
		{ channel, author }: Message,
		{ command: commandName }: any
	): Promise<Message | Message[]> {
		const handler = this.handler
		if (!commandName) {
			// Send all available commands embed
			const [, ...categories] = [...handler.categories.values()].map(
				category => category.id
			)
			const commands = categories.map(category => {
				const cmds = getCommandsInCategory(category, handler.modules)
				const commandsString = cmds
					.map(
						(cmd: Command) =>
							`${cmd.id} => ${cmd.description.content || cmd.description}`
					)
					.join('\n')

				return {
					name: `**${category}**`,
					value: commandsString,
				}
			})

			const commandsEmbed = await buildEmbed(author, this.client, {
				description:
					'tteeestt Type $help <command> to get more information about a command',
				fields: commands,
			})

			return channel.send({
				embed: commandsEmbed,
			})
		}

		// Send information about the command
		const command = handler.findCommand(commandName)
		if (!command) {
			return channel.send(`Command ${commandName} not found.`)
		}
		const embed = await buildCommandHelp(command, author, this.client)
		return channel.send({
			embed,
		})
	}
}
