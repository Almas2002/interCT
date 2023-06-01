import {Body, Controller, Get, Param, Post} from "@nestjs/common";
import {DistrictService} from "./district.service";
import {CreateDistrictDto} from "./district.dto";
import {ApiTags} from "@nestjs/swagger";

@ApiTags("district")
@Controller("district")
export class DistrictController {
    constructor(private districtService: DistrictService) {
    }

    @Post()
    async create(@Body()dto: CreateDistrictDto) {
        return this.districtService.create(dto)
    }

    @Get("/:cityId")
    async get(@Param("cityId")cityId: number) {
        return this.districtService.getByCityId(cityId)
    }
}