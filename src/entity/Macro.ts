import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

export interface IMacro {
	guildId?: string
	category?: string
	name?: string
	response?: string
}

@Entity()
export class Macro extends BaseEntity {
	@PrimaryGeneratedColumn()
	public id: number

	@Column()
	public guildId: string

	@Column()
	public category: string

	@Column()
	public name: string

	@Column()
	public response: string
}
