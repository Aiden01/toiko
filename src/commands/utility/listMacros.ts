import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import { ToikoClient } from '../../client';
import { getMacrosInCategory } from '../../utils/command';
import { getAllMacros } from '../../utils/db';
import { buildEmbed } from '../../utils/embed';

export default class extends Command {
	constructor() {
		super('listmacros', {
			aliases: ['listmacros', 'macros'],
			category: 'utility',
			description: 'Lists all available macros',
		});
	}

	public async exec({
		guild,
		channel,
		author,
	}: Message): Promise<Message | Message[]> {
		const client = this.client as ToikoClient;
		try {
			const macros = await getAllMacros(guild.id, client.database);
			if (macros.length < 1) {
				return channel.send(
					`No macro available for this guild. Use ${
						this.handler.prefix
					}addmacro to add one.`
				);
			}
			const categories = [...new Set(macros.map(macro => macro.category))];
			const categoryFields = await Promise.all(
				categories.map(async category => {
					const categoryMacros = await getMacrosInCategory(
						{ guildId: guild.id, category },
						client.database
					);
					return {
						name: category,
						value: categoryMacros.map(macro => macro.name).join(', '),
					};
				})
			);

			const embed = await buildEmbed(author, client, {
				fields: categoryFields,
				title: 'Available macros',
			});

			return channel.send({ embed });
		} catch (e) {
			return channel.send(`An error occurred: ${e}`);
		}
	}
}
