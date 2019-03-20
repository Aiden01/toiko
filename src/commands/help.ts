import { Command } from 'discord-akairo'
import { Message, RichEmbedOptions } from 'discord.js'
import * as R from 'ramda'
import { buildCommandHelp } from '../utils/index'

export default class extends Command {
	constructor() {
		super('help', {
			aliases: ['help', 'wut', 'what'],
			args: [{ id: 'command', type: 'string' }],
			description: 'Sends this help message',
		})
	}

	public exec(
		{ channel }: Message,
		{ command: commandName }: any
	): Promise<Message | Message[]> {
		const commandHandler = this.client.commandHandler
		const modules = [...commandHandler.modules.values()]
		if (!commandName) {
			// Send all available commands embed
			const getCommands = R.pipe(
				R.map((cmd: Command) => `__${cmd.id}__ => ${cmd.description}`),
				R.join('\n')
			)

			return channel.send({
				embed: this.availableCommandsEmbed(getCommands(modules)),
			})
		}

		// Send information about the command
		const command = commandHandler.findCommand(commandName)
		if (!command) {
			return channel.send(`Command ${commandName} not found.`)
		}

		return channel.send({ embed: buildCommandHelp(command) })
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
