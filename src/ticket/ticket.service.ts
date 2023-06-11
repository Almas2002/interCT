import {HttpException, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Ticket} from "./ticket.entity";
import {Repository} from "typeorm";
import {CreateTicketDto} from "./ticket.dto";
import {SessionPlaceService} from "../session/session-place.service";
import {UserService} from "../user/user.service";
import {BusService} from "../bus/bus.service";

@Injectable()
export class TicketService {
    constructor(@InjectRepository(Ticket) private ticketRepository: Repository<Ticket>,
                private sessionPlaceService: SessionPlaceService, private userService: UserService, private busService: BusService) {
    }


    async create(dto: CreateTicketDto, userId: number): Promise<{ id: number }> {
        const session = await this.sessionPlaceService.getPlaceByOne(dto.sessionPlaceId)
        if(session.taken === true){
            throw new HttpException("этот билет уже куплен",400)
        }
        const bus = await this.busService.getById(dto.busId)
        const cost = bus.type.cost
        console.log(userId)
        const ticket = await this.ticketRepository.save({user: {id: userId}, session, cost: cost, bus})
        await this.sessionPlaceService.taken(session.id)
        await this.userService.score(userId, cost - (cost * 0.15))
        return {id: ticket.id}
    }

    async getTicketsByBusId(id: number) {
        return this.ticketRepository.find({where: {bus: {id}}})
    }

    async getMyTickets(id: number) {
        return this.ticketRepository.find({where:{user:{id}},relations:["bus","session","session.place","session.session"]})
    }
}