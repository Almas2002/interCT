import {Body, Controller, Get, Param, Post, Query, UseGuards} from "@nestjs/common";
import {SessionService} from "./session.service";
import {AuthGuard} from "../auth/guard/auth.guard";
import {CreateSessionDto, QuerySessions} from "./session.dto";
import {UserDecorator} from "../decorators/user.decorator";
import {ApiQuery, ApiTags} from "@nestjs/swagger";

@ApiTags("session")
@Controller("session")
export class SessionController {
    constructor(private sessionService: SessionService) {
    }

    @UseGuards(AuthGuard)
    @Post()
    async create(@Body()dto: CreateSessionDto, @UserDecorator('id')id: number) {
        return this.sessionService.create(dto, id)
    }


    @ApiQuery({name: "cityFromId", required: false, type: "number"})
    @ApiQuery({name: "cityToId", required: false, type: "number"})
    @ApiQuery({name: "arrivalTime", required: false, type: "number"})
    @ApiQuery({name: "districtToId", required: false, type: "number"})
    @ApiQuery({name: "districtFromId", required: false, type: "number"})
    @ApiQuery({name: "busId", required: false, type: "number"})
    @ApiQuery({name: "limit", required: false, type: "number"})
    @ApiQuery({name: "page", required: false, type: "number"})
    @ApiQuery({name: "arrivalDate", required: false, type: "date"})
    @Get()
    async getAll(@Query()query: QuerySessions) {
        return this.sessionService.getSessions(query)
    }

    @Get(":id")
    async getOne(@Param('id')id:number){
        return this.sessionService.getOneById(id)
    }
}