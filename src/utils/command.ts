import { Command } from 'discord-akairo';
import { Collection } from 'discord.js';
import { Connection } from 'typeorm';
import { IMacro, Macro } from '../entity/Macro';

/**
 * Returns all the commands in a specific category
 */
export const getCommandsInCategory = (
	category: string,
	commands: Collection<string, Command>
) => commands.array().filter(command => command.categoryID === category);

/**
 * Returns all macros in a specific category
 */
export const getMacrosInCategory = (query: IMacro, connection: Connection) =>
	connection.getRepository(Macro).find({ ...query });
