import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Ticket} from "./ticket.entity";
import {Repository} from "typeorm";
import {CreateTicketDto} from "./ticket.dto";
import {SessionPlaceService} from "../session/session-place.service";
import {UserService} from "../user/user.service";

@Injectable()
export class TicketService {
    constructor(@InjectRepository(Ticket) private ticketRepository: Repository<Ticket>, private sessionPlaceService: SessionPlaceService, private userService: UserService) {
    }


    async create(dto: CreateTicketDto, userId: number): Promise<{id:number}> {
        const session = await this.sessionPlaceService.getPlaceByOne(dto.sessionPlaceId)
        const cost = session.session.bus.type.cost
        const ticket = await this.ticketRepository.save({user: {id: userId}, session, cost: session.session.bus.type.cost,bus:{id:dto.busId}})
        await this.userService.score(userId, cost - (cost * 0.15))
        return {id:ticket.id}
    }

    async getTicketsByBusId(id:number){
        return this.ticketRepository.find({where:{bus:{id}}})
    }
}