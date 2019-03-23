import { Command } from "discord-akairo";
import { Message, RichEmbedOptions } from 'discord.js'
import { getUserMention } from "../../utils";


export default class extends Command {
    constructor() {
        super('warn', {
            aliases: ['warn'],
            args: [
                { type: 'user', id: 'target' },
                { type: 'string', id: 'reason', match: 'rest' }
            ],
            category: 'mod',
            channelRestriction: 'guild',
            description: 'Warns a user',
            userPermissions: ['MANAGE_MESSAGES'],
        })
    }

    public async exec({ channel }: Message, { target, reason }: any): Promise<Message | Message[]> {
        if (!target) {
            return channel.send('The user is invalid.')
        }

        if (!reason) {
            return channel.send('Please, specify a reason.')
        }

        const embed: RichEmbedOptions = {
            description: 'If you think this is an error, please contact the mods or admins.',
            fields: [{ name: 'Reason', value: reason }],
            timestamp: new Date(),
            title: 'You have been warned.',
        }

        try {
            await target.send({ embed })
        } catch (e) {
            /* tslint:disable */
            console.error(e)
        }

        return channel.send(`${getUserMention(target)} has been warned.`)

    }

}