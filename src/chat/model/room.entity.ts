import {User} from '../../user/user.entity';
import {
    Column,
    CreateDateColumn, Entity,
    JoinTable,
    ManyToMany,
    OneToMany, OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import {JoinedRoom} from './joined-room.entity';
import {Message} from './message.entity';


@Entity()
export class Room {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToMany(() => User, )
    @JoinTable()
    users: User[]
    @Column({nullable:true})
    combination: number
    @OneToMany(() => Message, message => message.room)
    messages: Message[];

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => JoinedRoom, room => room.room)
    joinedUsers: JoinedRoom[];

}