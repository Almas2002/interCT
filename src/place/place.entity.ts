import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Type} from "./type.entity";
import {SessionPlace} from "../session/session-place.entity";

@Entity()
export class Place {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    column: number;
    @Column()
    row: number;
    @Column()
    floor: number;
    @ManyToOne(() => Type, type => type.places)
    type: Type

    @OneToMany(() => SessionPlace, session => session.session)
    session: SessionPlace
}