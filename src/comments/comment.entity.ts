import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../user/user.entity";
import {Bus} from "../bus/bus.entity";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    text: string;
    @ManyToOne(()=>User,user=>user.comments)
    user: User
    @ManyToOne(()=>Bus,bus=>bus.comments)
    bus: Bus

    @ManyToOne(() => Comment, object => object.subComments, { onDelete: 'CASCADE' })
    parentComment: Comment;
    @OneToMany(() => Comment, object => object.parentComment,{ onDelete: 'CASCADE' })
    subComments: Comment[];
}
