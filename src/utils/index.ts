import { Command } from 'discord-akairo'
import { GuildMember, User } from 'discord.js'
import * as R from 'ramda'

/**
 * Returns mention string from a user
 */
export const getUserMention = (user: User | GuildMember) => `<@${user.id}>`

const moderatorPermissions = [
	'BAN_MEMBERS',
	'KICK_MEMBERS',
	'MANAGE_CHANNELS',
	'ADMINISTRATOR',
	'MANAGE_MESSAGES',
]

/**
 * Verifies if a user is moderator
 */
export const isModerator = ({ permissions }: GuildMember) =>
	permissions
		.toArray()
		.some(permission => moderatorPermissions.includes(permission))
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
