import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Guild {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public guildId: string;

    @Column()
    public prefix: string;

}
