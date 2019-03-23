import { Command } from 'discord-akairo'

import { Message } from 'discord.js'

export default class extends Command {
	constructor() {
		super('wrap', {
			aliases: ['wrap', 'format'],
			args: [{ id: 'lang', type: 'lowercase' }, { id: 'code', match: 'rest' }],
			category: 'utility',
			description: 'Wraps code inside a code block',
		})
	}

	public exec({ channel }: Message, { code, lang }: any) {
		return channel.send(code, { code: lang })
	}
}
