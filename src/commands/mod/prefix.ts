import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import { ToikoClient } from '../../client';
import { getGuild } from '../../utils/db';

export default class extends Command {
	constructor() {
		super('prefix', {
			aliases: ['prefix', 'setprefix'],
			args: [{ id: 'prefix', type: 'string' }],
			category: 'mod',
			description: {
				content: 'Sets the prefix for the bot',
				example: 'prefix !',
				usage: 'prefix <new prefix>',
			},
			userPermissions: ['MANAGE_GUILD'],
		});
	}

	public async exec(
		{ guild, channel }: Message,
		{ prefix }: any
	): Promise<Message | Message[]> {
		const client = this.client as ToikoClient;
		if (!prefix) {
			return channel.send(
				`Insufficient arguments. Type ${
					this.handler.prefix
				}help prefix for more information.`
			);
		}
		try {
			const server = await getGuild(guild.id, client.database);
			if (!server) {
				return channel.send("Your guild wasn't found in the database.");
			}
			server.prefix = prefix;
			await server.save();
			return channel.send(`The prefix is now ${server.prefix}`);
		} catch (e) {
			return channel.send(`An error occurred: ${e}`);
		}
	}
}
