
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/user.entity';

@Entity()
export class ConnectionUser {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => User, user => user.connection)
  user: User;
  @Column()
  socketId: string;
}