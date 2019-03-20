import { Command } from 'discord-akairo'
import * as R from 'ramda'
/**
 * Finds a command by its id
 */
export const findCommand = (name: string, commands: Command[]) =>
	R.call(R.find(R.propEq('id', name)), commands)
