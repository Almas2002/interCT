import { forwardRef, HttpException, Inject, Injectable } from '@nestjs/common';
import { User } from '../../user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from '../model/room.entity';
import { Repository } from 'typeorm';
import { CreateChatDto } from '../dto/create-chat.dto';
import {UserService} from "../../user/user.service";


@Injectable()
export class RoomService {
  constructor(@InjectRepository(Room) private roomRepository: Repository<Room>, private userService:UserService
  ) {
  }

  async getRoomsForUser(userId: number) {
    const query = this.roomRepository
      .createQueryBuilder('room')
      .leftJoin('room.messages', 'messages').limit(1)
      .addSelect('messages').addOrderBy('messages.createAt', 'DESC').limit(1)
      .leftJoin('room.users', 'users')
      .where('users.id = :userId', { userId })
      .leftJoinAndSelect('room.users', 'all_users').limit(2)
      .orderBy('room.createAt', 'DESC')
      .addOrderBy('messages.id', 'DESC');
    query.limit(999);

    return await query.getMany();


  }

  async createRoom(creator: User, dto: CreateChatDto) {
    const user = await this.userService.findById(dto.userId);
    if (!user) {
      throw new HttpException('профиль не найден', 404);
    }
    const creatorProfile = await this.userService.findById(creator.id);
    let combination = user.id + creatorProfile.id;
    const query = this.roomRepository.createQueryBuilder('room')
      .leftJoinAndSelect('room.users', 'users')
      .where('room.combination = :combination', { combination });
    const candidate = await query.getOne();
    if (candidate) {
      return candidate;
    }

    const room = await this.roomRepository.save({ combination });
    room.users = [creatorProfile, user];
    await this.roomRepository.save(room);
    return room;
  }

  async getRoom(id: number): Promise<Room> {
    return await this.roomRepository.findOne({
      where: { id },
      relations: ['joinedUsers', 'joinedUsers.user', 'users'],
    });
  }


}