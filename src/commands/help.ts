import { Command } from 'discord-akairo'
import { Message, RichEmbedOptions } from 'discord.js'

export default class extends Command {
  constructor() {
    super('help', {
      aliases: ['help', 'wut', 'what'],
      description: 'Sends this help message',
    })
  }

  public exec({ channel }: Message): Promise<Message | Message[]> {
    const commands = this.client.commandHandler.modules
      .map(command => `__${command.id}__ => ${command.description}`)
      .join('\n')

    const embed: RichEmbedOptions = {
      fields: [
        {
          name: 'Available commands',
          value: commands,
        },
      ],
      title: '(╯°□°）╯︵ ┻━┻',
    }
    return channel.send({ embed })
  }
}
