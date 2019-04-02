import {
	AkairoClient,
	AkairoOptions,
	CommandHandler,
	ListenerHandler,
} from 'discord-akairo';
import * as path from 'path';
import { Connection } from 'typeorm';
import { getConfig } from './utils/config';

export class ToikoClient extends AkairoClient {
	public database: Connection;
	public commandHandler: CommandHandler;
	public listenerHandler: ListenerHandler;

	constructor(options: AkairoOptions) {
		super(options, {
			disableEveryone: true,
		});
		this.commandHandler = new CommandHandler(this, {
			allowMention: true,
			commandUtil: true,
			directory: path.join(__dirname, 'commands'),
			handleEdits: true,
			prefix: getConfig('PREFIX', '$'),
		});

		this.listenerHandler = new ListenerHandler(this, {
			directory: path.join(__dirname, 'listeners'),
		});
		this.setup();
	}

	public start(token: string, connection: Connection): Promise<string> {
		this.database = connection;
		return this.login(token);
	}

	private setup() {
		this.commandHandler.useListenerHandler(this.listenerHandler);
		this.listenerHandler.setEmitters({
			commandHandler: this.commandHandler,
			listenerHandler: this.listenerHandler,
		});

		this.commandHandler.loadAll();
		this.listenerHandler.loadAll();
	}
}
