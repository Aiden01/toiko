import { Command } from 'discord-akairo'
import { Message, RichEmbedOptions } from 'discord.js'
import { buildCommandHelp } from '../utils/embed'

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
		const modules = [...this.handler.modules.values()]
		if (!commandName) {
			// Send all available commands embed
			const commands = modules
				.map((cmd: Command) => `__${cmd.id}__ => ${cmd.description.content}`)
				.join('\n')

			return channel.send({
				embed: this.availableCommandsEmbed(commands),
			})
		}

		// Send information about the command
		const command = this.handler.findCommand(commandName)
		if (!command) {
			return channel.send(`Command ${commandName} not found.`)
		}
		const embed = await buildCommandHelp(command, author, this.client)
		return channel.send({
			embed,
		})
	}

	/**
	 * Returns the embed for all available commands
	 */
	private availableCommandsEmbed(commands: string): RichEmbedOptions {
		return {
			description:
				'Type ?help <command> to get more information about a command',
			fields: [
				{
					name: 'Available commands',
					value: commands,
				},
			],
			title: '(╯°□°）╯︵ ┻━┻',
		}
	}
}
