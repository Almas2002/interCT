import {Column, Entity, JoinColumn, ManyToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {SessionPlace} from "../session/session-place.entity";
import {User} from "../user/user.entity";

@Entity()
export class Ticket{
    @PrimaryGeneratedColumn()
    id:number;
    @OneToOne(()=>SessionPlace,session=>session)
    @JoinColumn({name:"session_id"})
    session:SessionPlace;
    @ManyToMany(()=>User,user=>user)
    user:User;
}