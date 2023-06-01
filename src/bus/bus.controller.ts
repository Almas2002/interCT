import {Body, Controller, Post, UploadedFile, UseGuards, UseInterceptors} from "@nestjs/common";
import {BusService} from "./bus.service";
import {CreateBusDto} from "./bus.dto";
import {UserDecorator} from "../decorators/user.decorator";
import {AuthGuard} from "../auth/guard/auth.guard";
import {FileInterceptor} from "@nestjs/platform-express";
import {ApiTags} from "@nestjs/swagger";

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


}