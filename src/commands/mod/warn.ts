import { Command } from "discord-akairo";
import { Message, RichEmbedOptions } from 'discord.js'
import { buildEmbed } from "../../utils/embed";
import { getUserMention, isModerator } from "../../utils/user";


export default class extends Command {
    constructor() {
        super('warn', {
            aliases: ['warn'],
            args: [
                { type: 'member', id: 'target' },
                { type: 'string', id: 'reason', match: 'rest' }
            ],
            category: 'mod',
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

        if (isModerator(target)) {
            return channel.send('Cannot warn a moderator.')
        }

        const embed: RichEmbedOptions = await buildEmbed(target, this.client, {
            description: 'If you think this is an error, please contact the mods or admins.',
            fields: [{ name: 'Reason', value: reason }],
            title: 'You have been warned.',
        })
        

        try {
            await target.send({ embed })
        } catch (e) {
            /* tslint:disable */
            console.error(e)
        }

        return channel.send(`${getUserMention(target)} has been warned.`)

    }

}