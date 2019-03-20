import { Command } from 'discord-akairo'
import { Message, RichEmbedOptions } from 'discord.js'
import * as R from 'ramda'
import { findCommand } from '../utils/index'

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
		const modules = [...this.client.commandHandler.modules.values()]
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
		const command = findCommand(commandName, modules)
		if (!command) {
			return channel.send(`Command ${commandName} not found.`)
		}

		return channel.send({ embed: this.commandUsageEmbed(command) })
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

	private commandUsageEmbed({
		id,
		userPermissions,
		aliases,
		description,
		args,
	}: Command): RichEmbedOptions {
		const argumentsStr = R.isEmpty(args)
			? 'None'
			: args.map(arg => arg.id).join(', ')
		return {
			description,
			fields: [
				{
					name: 'Aliases',
					value: aliases.join(', '),
				},
				{ name: 'Arguments', value: argumentsStr },
				{
					name: 'Required permissions',
					value: userPermissions ? userPermissions.toString() : 'None',
				},
			],
			title: id,
		}
	}
}
