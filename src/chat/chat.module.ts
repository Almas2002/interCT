import {forwardRef, Module} from '@nestjs/common';
import {JoinedRoomService} from './service/joined-room.service';
import {MessageService} from './service/message.service';
import {RoomService} from './service/room.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {JoinedRoom} from './model/joined-room.entity';
import {Message} from './model/message.entity';
import {Room} from './model/room.entity';
import {ChatController} from "./controller/chat.controller";
import { ChatGateway } from './gateway/chat.gateway';
import { ConnectedUserService } from './service/socket.service';
import { ConnectionUser } from './model/connection-user.entity';
import {UserModule} from "../user/user.module";


@Module({
    imports: [TypeOrmModule.forFeature([JoinedRoom, Message, Room,ConnectionUser]),UserModule],
    providers: [JoinedRoomService, MessageService, RoomService,ChatGateway,ConnectedUserService],
    exports: [JoinedRoomService, MessageService, RoomService],
    controllers: [ChatController],
})
export class ChatModule {
}