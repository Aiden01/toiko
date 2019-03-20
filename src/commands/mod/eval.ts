import { Command } from 'discord-akairo'
import { Message } from 'discord.js'

export default class extends Command {
	constructor() {
		super('eval', {
			aliases: ['eval', 'run'],
			args: [{ id: 'code', match: 'rest' }],
			category: 'mod',
			description: 'Evaluates the given code',
		})
	}

	public condition({ author }: Message): boolean {
		return this.client.ownerID.includes(author.id)
	}

	public exec(
		{ channel }: Message,
		{ code }: any
	): Promise<Message | Message[]> {
		/* tslint:disable */
		const result = eval(code)
		return channel.send(`Result: \n${result}`, { code: true })
	}
}
