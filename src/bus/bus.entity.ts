import {User} from "../user/user.entity";
import {Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Type} from "../place/type.entity";
import {Ticket} from "../ticket/ticket.entity";
import {Location} from "./location.entity";
import {Session} from "../session/session.entity";
import {Comment} from "../comments/comment.entity";

@Entity()
export class Bus {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    number: string;

    @Column()
    image: string;

    @OneToOne(() => User, user => user.bus)
    @JoinColumn({name: "user_id"})
    user: User

    @ManyToOne(() => Type, type => type.buses)
    type: Type

    @OneToMany(()=>Ticket,ticket=>ticket.bus)
    tickets:Ticket[]

    @OneToOne(()=>Location,location=>location.bus)
    coordinates:Location

    @OneToMany(()=>Session,session=>session.bus)
    sessions:Session []

    @OneToMany(()=>Comment,comment=>comment.bus)
    comments:Comment []
}