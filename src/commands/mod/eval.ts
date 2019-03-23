import { Command } from 'discord-akairo';

export default class extends Command {
    constructor() {
        super('eval', {
            aliases: ['eval'],
            args: [
                { id: 'code', match: 'rest', type: 'string' }
            ],
            description: {
				content: 'Evaluates the given javascript code.',
				examples: ['', '2 + 2', 'console.log("Hello, world")'],
				usage: '[code]',
            },
            ownerOnly: true,
        })
    }
}