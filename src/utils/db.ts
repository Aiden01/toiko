import { Connection } from 'typeorm'
import { defaultSettings, Guild } from '../entity/Guild'

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
