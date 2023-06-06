import {Body, Controller, Get, Param, Post, UseGuards} from "@nestjs/common";
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import {TicketService} from "./ticket.service";
import {UserDecorator} from "../decorators/user.decorator";
import {AuthGuard} from "../auth/guard/auth.guard";
import {CreateTicketDto} from "./ticket.dto";

@ApiTags("ticket")
@Controller("ticket")
export class TicketController {
    constructor(private ticketService: TicketService) {}

    @UseGuards(AuthGuard)
    @Post()
    create(@Body()dto: CreateTicketDto, @UserDecorator('id')id: number) {
        return this.ticketService.create(dto, id)
    }


    @ApiOperation({summary:"взять купленные билеты транспорта"})
    @Get("/bus/:busId")
    tickets(@Param("busId")id:number){
        return this.ticketService.getTicketsByBusId(id)
    }
    @ApiOperation({summary:"взять мои билеты"})
    @UseGuards(AuthGuard)
    @Get()
    myTickets(@UserDecorator('id')id:number){
        return this.ticketService.getMyTickets(id)
    }

}