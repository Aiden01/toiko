import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

export const defaultSettings = {
	prefix: '?',
}

@Entity()
export class Guild {
	@PrimaryGeneratedColumn()
	public id: number

	@Column()
	public guildId: string

	@Column()
	public prefix: string
}
