import {Module} from "@nestjs/common";
import {TicketController} from "./ticket.controller";
import {TicketService} from "./ticket.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Ticket} from "./ticket.entity";
import {SessionModule} from "../session/session.module";
import {UserModule} from "../user/user.module";
import {BusModule} from "../bus/bus.module";

@Module({
    exports:[],
    controllers:[TicketController],
    providers:[TicketService],
    imports:[TypeOrmModule.forFeature([Ticket]),SessionModule,UserModule,BusModule]
})
export class TicketModule{

}