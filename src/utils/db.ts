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
	let guild = new Guild()
	guild = { ...guild, ...defaultSettings, guildId }
	const repository = connection.getRepository(Guild)
	return repository.save(guild)
}
