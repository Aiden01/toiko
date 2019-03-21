import { Sequelize } from 'sequelize'
import {
	POSTGRES_DATABASE,
	POSTGRES_PASSWORD,
	POSTGRES_USER,
} from '../../config.json'

export const Database = new Sequelize(
	`postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:5432/${POSTGRES_DATABASE}`
)
