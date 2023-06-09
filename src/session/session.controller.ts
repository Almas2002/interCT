import {Body, Controller, Get, Param, Post, Put, Query, Req, UseGuards} from "@nestjs/common";
import {SessionService} from "./session.service";
import {AuthGuard} from "../auth/guard/auth.guard";
import {CreateSessionDto, QuerySessions, UpdateSessionStatus} from "./session.dto";
import {UserDecorator} from "../decorators/user.decorator";
import {ApiQuery, ApiTags} from "@nestjs/swagger";

@ApiTags("session")
@Controller("session")
export class SessionController {
    constructor(private sessionService: SessionService) {}

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
    @ApiQuery({name: "status", required: false, type: "string"})
    @ApiQuery({name: "like", required: false, type: "boolean"})
    @Get()
    async getAll(@Query()query: QuerySessions, @Req() req) {
        return this.sessionService.getSessions(query, req.user?.id)
    }

    @Get(":id")
    async getOne(@Param('id')id: number) {
        return this.sessionService.getOneById(id)
    }

    @Put("/status/:id")
    updateStatus(@Param("id") busId: number, @Body()dto: UpdateSessionStatus) {
        return this.sessionService.updateStatus(dto, busId)
    }
}