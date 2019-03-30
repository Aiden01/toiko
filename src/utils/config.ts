import { config, parse, DotenvParseOutput } from 'dotenv';
import * as fs from 'fs';
import { promisify } from 'util';
const readFile = promisify(fs.readFile);

let CONFIG: DotenvParseOutput = null;

/**
 * Loads the config file
 */
/* tslint:disable */
export const loadConfig = (path: string) =>
	readFile(path)
		.then(buffer => (CONFIG = parse(buffer)))
		.catch(e => console.error(`Error while loading the config ${e}`));

/**
 * Returns a config value
 */
export const getConfig = (key: string, defaultValue?: any) =>
	CONFIG[key] || defaultValue;
