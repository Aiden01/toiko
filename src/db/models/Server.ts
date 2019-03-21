import { STRING } from 'sequelize'
import { Database } from '../index'

export const server = Database.define("servers", {
    guild_id: STRING,
    settings: STRING
}) as unknown