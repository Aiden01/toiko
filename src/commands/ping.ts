import { Command } from 'discord-akairo'
import { Message } from 'discord.js'

export default class extends Command {
	constructor() {
		super('ping', {
			aliases: ['ping', 'p'],
			category: 'utility',
			description: 'Checks the ping of the bot',
		})
	}

	public exec({ channel }: Message): Promise<Message | Message[]> {
		return channel.send(`:ping_pong: Pong! ${Math.round(this.client.ping)}ms`)
	}
}
