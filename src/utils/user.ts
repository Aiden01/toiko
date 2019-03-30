import { GuildMember, User } from 'discord.js';

/**
 * Returns mention string from a user
 */
export const getUserMention = (user: User | GuildMember) => `<@${user.id}>`;

const moderatorPermissions = [
	'BAN_MEMBERS',
	'KICK_MEMBERS',
	'MANAGE_CHANNELS',
	'ADMINISTRATOR',
	'MANAGE_MESSAGES',
];

/**
 * Verifies if a user is moderator
 */
export const isModerator = ({ permissions }: GuildMember) =>
	permissions
		.toArray()
		.some(permission => moderatorPermissions.includes(permission));
