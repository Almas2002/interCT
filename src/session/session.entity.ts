import {Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Bus} from "../bus/bus.entity";
import {City} from "../city/city.entity";
import {District} from "../district/district.entity";
import {SessionPlace} from "./session-place.entity";

@Entity()
export class Session {
    @PrimaryGeneratedColumn()
    id: number;
    @ManyToOne(() => Bus)
    bus: Bus;
    @Column()
    arrivalDate: Date
    @Column({type: "float"})
    arrivalTime: number;

    @ManyToOne(() => City, city => city.sessionTo)
    cityTo: City

    @ManyToOne(() => City, city => city.sessionFrom)
    cityFrom: City

    @ManyToMany(() => District, district => district.sessionsTo)
    @JoinTable({name: "sessions_district_to"})
    districtsTo: District[]

    @ManyToOne(() => District, district => district.sessionsFrom)
    districtFrom: District

    @Column({default: false})
    block: boolean

    @OneToMany(() => SessionPlace, place => place.session)
    places: SessionPlace[]
}