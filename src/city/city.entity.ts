import {Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {District} from "../district/district.entity";
import {Session} from "../session/session.entity";

@Entity()
export class City {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({unique: true})
    title: string;
    @OneToMany(() => District, district => district.city)
    districts: District[]

    @OneToMany(() => Session, session => session.cityTo)
    sessionTo: Session

    @OneToMany(() => Session, session => session.cityFrom)
    sessionFrom: Session
}