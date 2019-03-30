import { Connection, ConnectionOptions, createConnection } from 'typeorm';
import { defaultSettings, Guild } from '../entity/Guild';
import { IMacro, Macro } from '../entity/Macro';

/**
 * Creates connection to the database
 */
export const connect = async (options: ConnectionOptions) => {
	let retries = 5;
	let connection: Connection;
	while (retries) {
		try {
			connection = await createConnection(options);
		} catch (e) {
			/* tslint:disable */
			console.error(e);
			retries--;
			console.log(`${retries} retries left.`);
			await new Promise(resolve => setTimeout(resolve, 5000));
		}
	}
	return connection;
};

/**
 * Returns guild with the given id from the database
 */
export const getGuild = (guildId: string, connection: Connection) =>
	connection.getRepository(Guild).findOne({ guildId });

/**
 * Creates new guild
 */
export const createGuild = (guildId: string, connection: Connection) => {
	const guild = new Guild();
	guild.prefix = defaultSettings.prefix;
	guild.guildId = guildId;
	const repository = connection.getRepository(Guild);
	return repository.save(guild);
};

/**
 * Adds a macro to the given guild
 */
export const createMacro = (
	{ category, name, response, guildId }: IMacro,
	connection: Connection
) => {
	const macro = new Macro();
	macro.category = category;
	macro.name = name;
	macro.response = response;
	macro.guildId = guildId;
	const repository = connection.getRepository(Macro);
	return repository.save(macro);
};

/**
 * Returns a macro
 */
export const getMacro = (query: IMacro, connection: Connection) =>
	connection.getRepository(Macro).findOne({ ...query });

/**
 * Returns all macros of the given guild
 */
export const getAllMacros = (guildId: string, connection: Connection) =>
	connection.getRepository(Macro).find({ guildId });

/**
 * Removes a macro
 */
export const removeMacro = (query: IMacro, connection: Connection) =>
	connection.getRepository(Macro).delete({ ...query });

/**
 * Edits a macro
 */
export const editMacro = (
	query: IMacro,
	response: string,
	connection: Connection
) => connection.getRepository(Macro).update({ ...query }, { response });
