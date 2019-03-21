import { TOKEN } from '../config.json'
import { ToikoClient } from './client'

const client = new ToikoClient(
	{
		allowMention: true,
		commandDirectory: './dist/src/commands/',
		ownerID: '337364150080503809',
		prefix: '?',
	},
	{
		disableEveryone: true,
	}
)


client
	.start(TOKEN)
	/* tslint:disable */
	.then(() => console.log('Client is logged'))
