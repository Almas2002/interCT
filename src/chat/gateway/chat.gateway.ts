import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { JoinedRoomService } from '../service/joined-room.service';
import { RoomService } from '../service/room.service';
import { MessageService } from '../service/message.service';
import { IMessage } from '../interface/interface';
import { TypingDto } from '../dto/typing.dto';
import { ConnectedUserService } from '../service/socket.service';

require('dotenv').config();

@WebSocketGateway({ namespace: '/'})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect, OnModuleInit {
  constructor(private connectedUserService: ConnectedUserService, private joinedRoomService: JoinedRoomService,
              private roomService: RoomService, private messageService: MessageService) {
  }

  @WebSocketServer() wss: Server;

  async handleConnection(socket: Socket, data: any) {
    let token;
    if (!socket.handshake.query.token) {
      return null;
    }
    try {
      token = verify(`${socket.handshake.query.token}`, process.env.JWT_SECRET);
      socket.data.user = token;
      await this.connectedUserService.createConnectedUser({ socketId: socket.id, userId: token.id });
    } catch (e) {
      return ChatGateway.disconnect(socket);
    }
  }

  @SubscribeMessage('add-message')
  async createMessage(socket: Socket, data: IMessage) {
    const room = await this.roomService.getRoom(data.roomId);
    if (!room) {
      await this.wss.emit('Error', 'такого канала нету');
    }
    console.log(room)
    const createMessage = await this.messageService.createMessage({ ...data, userId: socket.data.user.id });

    const u = room.users.filter(u => u.id != socket.data.user.id)[0];
    const joinedUsers = await this.joinedRoomService.findByRoomId(room.id);
    const b = joinedUsers.filter((us) => us.user.id === u.id);

    for (const user of joinedUsers) {
      this.wss.to(user.socketId).emit('messageAdded', createMessage);
    }

  }


  @SubscribeMessage('join-room')
  async comeInChat(socket: Socket, data: number) {
    const messages = await this.messageService.getAllMessage(data, { limit: 10, page: 1 });
    await this.joinedRoomService.create(socket.id, socket.data.user.id, data);
    this.wss.to(socket.id).emit('messages', messages);
  }

  @SubscribeMessage('leave-room')
  async leaveRoom(socket: Socket, id: number) {
    await this.joinedRoomService.deleteJoinedUser(socket.id, id);
  }

  @SubscribeMessage('typing')
  async typing(socket: Socket, data: TypingDto) {
    const room = await this.roomService.getRoom(data.chatId);
    if (!room) {
      this.wss.emit('Error', 'такого канала нету');
    }
    const joinedUsers = await this.joinedRoomService.findByRoomId(room.id);

    for (const user of joinedUsers) {
      if (user.id != socket.data.user) {
        this.wss.to(user.socketId).emit('typing', data);
      }
    }

  }

  private static disconnect(socket: Socket) {
    socket.emit('Error', new UnauthorizedException('вы не зарегестрированы'));
    socket.disconnect();
  }

  async handleDisconnect(client: Socket): Promise<void> {
    await this.connectedUserService.deleteBySocketId(client.id);

  }

  async onModuleInit(): Promise<void> {
    await this.connectedUserService.deleteAll();
  }
}