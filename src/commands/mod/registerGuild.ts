import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import { ToikoClient } from '../../client';
import { createGuild, getGuild } from '../../utils/db';

export default class extends Command {
	constructor() {
		super('registerGuild', {
			aliases: ['registerGuild'],
			category: 'mod',
			description: {
				content: 'Registers the guild in the database',
			},
			userPermissions: ['MANAGE_GUILD'],
		});
	}

	public async exec({ guild, channel }: Message): Promise<Message | Message[]> {
		const client = this.client as ToikoClient;
		try {
			const server = await getGuild(guild.id, client.database);
			if (server) {
				return channel.send('Your guild is already registered.');
			}
			await createGuild(guild.id, client.database);
			return channel.send(`The guild is now registered.`);
		} catch (e) {
			return channel.send(`An error occurred: ${e}`);
		}
	}
}
