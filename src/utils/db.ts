import { Connection } from 'typeorm'
import { defaultSettings, Guild } from '../entity/Guild'
import { IMacro, Macro } from '../entity/Macro'

/**
 * Returns guild with the given id from the database
 */
export const getGuild = (guildId: string, connection: Connection) =>
	connection.getRepository(Guild).findOne({ guildId })

/**
 * Creates new guild
 */
export const createGuild = (guildId: string, connection: Connection) => {
	const guild = new Guild()
	guild.prefix = defaultSettings.prefix
	guild.guildId = guildId
	const repository = connection.getRepository(Guild)
	return repository.save(guild)
}

/**
 * Adds a macro to the given guild
 */
export const createMacro = (
	{ category, name, response, guildId }: IMacro,
	connection: Connection
) => {
	const macro = new Macro()
	macro.category = category
	macro.name = name
	macro.response = response
	macro.guildId = guildId
	const repository = connection.getRepository(Macro)
	return repository.save(macro)
}

/**
 * Returns a macro
 */
export const getMacro = (query: IMacro, connection: Connection) =>
	connection.getRepository(Macro).findOne({ ...query })
