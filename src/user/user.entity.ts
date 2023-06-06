import { Role } from '../role/role.entity';
import {Column, Entity, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Ticket} from "../ticket/ticket.entity";
import {Bus} from "../bus/bus.entity";
import {ConnectionUser} from "../chat/model/connection-user.entity";
import {Like} from "../like/like.entity";
import {Comment} from "../comments/comment.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  phone: string;
  @Column({ select: false })
  password: string;
  @ManyToMany(() => Role, role => role.users)
  @JoinTable()
  roles: Role[];

  @OneToMany(()=>Ticket,ticket=>ticket.user)
  tickets:Ticket[]

  @OneToOne(()=>Bus,bus=>bus.user)
  bus:Bus

  @Column({type:"float",default:0})
  money:number

  @OneToMany(() => ConnectionUser, user => user.user)
  connection: ConnectionUser[];

  @OneToMany(()=>Like,like=>like.user)
  likes:Like[]

  @OneToMany(()=>Comment,comment=>comment.user)
  comments:Comment[]
}