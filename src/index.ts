import { AkairoClient } from 'discord-akairo'
import { TOKEN } from '../config.json'

const client = new AkairoClient(
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
	.login(TOKEN)
	/* tslint:disable */
	.then(() => console.log('Client is logged'))
