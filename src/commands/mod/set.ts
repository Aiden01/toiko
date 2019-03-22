import { Command } from "discord-akairo";
import { Message } from 'discord.js'
import { ToikoClient } from "../../client";

export default class extends Command {
    constructor() {
        super('set', {
            aliases: ['set'],
            args: [
                { id: 'settingName', type: 'lowercase' },
                { id: 'settingValue', match: 'rest' }
            ],
            channelRestriction: 'guild',
            description: 'Sets the given setting',
            userPermissions: ['MANAGE_GUILD']
        })

    }
    public exec({ guild, channel }: Message, { settingName, settingValue }: any): Promise<Message | Message[]> {
        // const client = this.client as ToikoClient
        // client.settings.set(guild.id, settingName, settingValue)
        return channel.send('pass')

    }
}