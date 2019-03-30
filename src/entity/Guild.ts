import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export const defaultSettings = {
	prefix: '?',
};

@Entity()
export class Guild extends BaseEntity {
	@PrimaryGeneratedColumn()
	public id: number;

	@Column()
	public guildId: string;

	@Column()
	public prefix: string;
}
