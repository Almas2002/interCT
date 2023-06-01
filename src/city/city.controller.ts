import {Body, Controller, Get, Post} from "@nestjs/common";
import {CityService} from "./city.service";
import {CreateCityDto} from "./city.dto";
import {ApiTags} from "@nestjs/swagger";

@ApiTags("city")
@Controller("city")
export class CityController {
    constructor(private cityService: CityService) {
    }

    @Post()
    createCity(@Body()dto: CreateCityDto) {
        return this.cityService.create(dto)
    }

    @Get()
    getCity() {
        return this.cityService.getAll()
    }
}