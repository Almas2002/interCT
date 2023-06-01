import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Place} from "./place.entity";
import {Bus} from "../bus/bus.entity";

@Entity()
export class Type {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({unique: true})
    title: string;
    @Column()
    cost: number;

    @OneToMany(() => Place, place => place.type)
    places: Place[]

    @OneToMany(() => Bus, bus => bus.type)
    buses: Bus[]

}