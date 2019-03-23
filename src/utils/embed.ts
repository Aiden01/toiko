import { Command } from 'discord-akairo'
import { Client, GuildMember, User } from 'discord.js'
import * as R from 'ramda'

/**
 * Builds an embed with default fields
 */
export const buildEmbed = async (
	user: User | GuildMember,
	client: Client,
	restOptions
) => {
	const { displayAvatarURL, username } = await client.fetchUser(user.id)
	return {
		...restOptions,
		author: {
			iconURL: displayAvatarURL,
			name: username,
		},
		timestamp: new Date(),
	}
}
/**
 * Returns the help embed for the given command
 */
export const buildCommandHelp = ({
	args,
	description,
	aliases,
	userPermissions,
	id,
}: Command) => {
	const getArguments = R.isEmpty(args)
		? R.always('None')
		: R.compose(
				R.join('\n'),
				R.map(R.prop('id'))
		  )

	return {
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
	}
}
