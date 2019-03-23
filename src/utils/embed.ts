import { Command } from 'discord-akairo'
import { Client, GuildMember, RichEmbedOptions, User } from 'discord.js'
import { EMBEDS_COLOR } from '../../config.json'

/**
 * Builds an embed with default fields
 */
export const buildEmbed = async (
	user: User | GuildMember,
	client: Client,
	restOptions: RichEmbedOptions
) => {
	const { displayAvatarURL, username } = await client.fetchUser(user.id)

	return {
		...restOptions,
		author: {
			icon_url: displayAvatarURL,
			name: username,
		},
		color: parseInt(EMBEDS_COLOR.slice(1), 16),
		timestamp: new Date(),
	}
}
/**
 * Returns the help embed for the given command
 */
export const buildCommandHelp = (
	{ description, aliases, userPermissions, id }: Command,
	user: User | GuildMember,
	client: Client
) => {
	return buildEmbed(user, client, {
		description: description.content,
		fields: [
			{
				name: 'Aliases',
				value: aliases.join(', '),
			},
			{
				name: 'Required permissions',
				value: userPermissions ? userPermissions.toString() : 'None',
			},
			{
				name: 'Example',
				value: description.example || 'Not available',
			},
			{
				name: 'Usage',
				value: description.usage || 'Not available',
			},
		],
		title: id,
	})
}
