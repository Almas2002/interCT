import {Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {City} from "../city/city.entity";
import {Session} from "../session/session.entity";

@Entity()
export class District {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    title: string;
    @ManyToOne(() => City, city => city)
    city: City

    @OneToMany(() => Session, session => session.districtFrom)
    sessionsFrom: Session[]

    @ManyToMany(() => Session, session => session.districtsTo)
    sessionsTo: Session[]
}