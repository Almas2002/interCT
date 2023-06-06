import {Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Session} from "../session/session.entity";
import {User} from "../user/user.entity";

@Entity()
export class Like{
    @PrimaryGeneratedColumn()
    id:number;
    @ManyToOne(()=>Session,session=>session.likes)
    @JoinColumn({name:"session_id"})
    session:Session

    @ManyToOne(()=>User,user=>user.likes)
    @JoinColumn({name:"user_id"})
    user:User
}