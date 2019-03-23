import { Command } from 'discord-akairo';
import { Message } from 'discord.js'
import * as util from 'util'

export default class extends Command {
    constructor() {
        super('eval', {
            aliases: ['eval'],
            args: [
                { id: 'code', match: 'rest', type: 'string' }
            ],
            description: {
				content: 'Evaluates the given javascript code.',
				example: '1 + 1',
				usage: '<code>',
            },
            quoted: false
        })
    }

    public exec({ channel, author }: Message, { code }: any): Promise<Message | Message[]> {
        if (!this.client.ownerID.includes(author.id)) {
            return
        }
        if (!code) {
            return channel.send('Invalid code')
        }

        try {
            /* tslint:disable */
            const result = eval(code)
            return channel.send(util.inspect(result).slice(0, 1800), { code: 'js' })
        } catch(e) {
            return channel.send(`An error occurred: ${e}`)
        }

    }

}