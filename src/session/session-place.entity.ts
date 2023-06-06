import {Place} from "../place/place.entity";
import {Session} from "./session.entity";
import {Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Ticket} from "../ticket/ticket.entity";


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

    @OneToOne(()=>Ticket,ticket=>ticket.session)
    ticket:Ticket
}