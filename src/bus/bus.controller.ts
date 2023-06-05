import {Body, Controller, Get, Param, Post, Put, Query, UploadedFile, UseGuards, UseInterceptors} from "@nestjs/common";
import {BusService} from "./bus.service";
import {CreateBusDto, QueryBus} from "./bus.dto";
import {UserDecorator} from "../decorators/user.decorator";
import {AuthGuard} from "../auth/guard/auth.guard";
import {FileInterceptor} from "@nestjs/platform-express";
import {ApiTags} from "@nestjs/swagger";
import {UpdateLocationDto} from "./location.dto";

@ApiTags("bus")
@Controller("bus")
export class BusController {
    constructor(private busService: BusService) {
    }

    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('image'))
    @Post()
    createBus(@Body()dto: CreateBusDto, @UserDecorator('id')id: number, @UploadedFile()file) {
        return this.busService.create(dto, id, file);
    }

    @Put("/location/:busId")
    update(@Param('busId') busId: number, @Body()dto: UpdateLocationDto) {
        return this.busService.updateLocation(dto, busId)
    }

    @Get()
    getAll(@Query()dto:QueryBus){
        return this.busService.getAll(dto)
    }

}