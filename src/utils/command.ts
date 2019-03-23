import { Command } from 'discord-akairo'
import { Collection } from 'discord.js'

/**
 * Returns all the commands in a specific category
 */
export const getCommandsInCategory = (
	category: string,
	commands: Collection<string, Command>
) => commands.array().filter(command => command.categoryID === category)
