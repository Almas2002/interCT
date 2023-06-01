import {Place} from "../place/place.entity";
import {Session} from "./session.entity";
import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";


@Entity()
export class SessionPlace {
    @PrimaryGeneratedColumn()
    id: number
    @ManyToOne(() => Place, place => place.session)
    place: Place
    @ManyToOne(() => Session, session => session.places)
    session: Session
    @Column({default: false})
    taken: boolean
}