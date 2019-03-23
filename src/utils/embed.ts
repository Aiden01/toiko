import { Command } from 'discord-akairo'
import { Client, GuildMember, RichEmbedOptions, User } from 'discord.js'
import * as R from 'ramda'
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
			iconURL: displayAvatarURL,
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
	{ args, description, aliases, userPermissions, id }: Command,
	user: User | GuildMember,
	client: Client
) => {
	const getArguments = R.isEmpty(args)
		? R.always('None')
		: R.compose(
				R.join('\n'),
				R.map(R.prop('id'))
		  )
	return buildEmbed(user, client, {
		description,
		fields: [
			{
				name: 'Aliases',
				value: aliases.join(', '),
			},
			{ name: 'Arguments', value: getArguments(args) },
			{
				name: 'Required permissions',
				value: userPermissions ? userPermissions.toString() : 'None',
			},
		],
		title: id,
	})
}
