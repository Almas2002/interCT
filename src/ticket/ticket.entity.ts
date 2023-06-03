import {Column, Entity, JoinColumn, ManyToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {SessionPlace} from "../session/session-place.entity";
import {User} from "../user/user.entity";
import {Bus} from "../bus/bus.entity";

@Entity()
export class Ticket{
    @PrimaryGeneratedColumn()
    id:number;
    @OneToOne(()=>SessionPlace,session=>session)
    @JoinColumn({name:"session_id"})
    session:SessionPlace;

    @ManyToMany(()=>Bus,bus=>bus)
    bus:Bus
    @ManyToMany(()=>User,user=>user)
    user:User;
    @Column()
    cost:number;
}