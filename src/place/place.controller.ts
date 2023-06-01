import {Body, Controller, Get, Param, Post} from "@nestjs/common";
import {PlaceService} from "./place.service";
import {CreatePlaceDto} from "./place.dto";
import {CreateTypeDto} from "./type.dto";
import {ApiTags} from "@nestjs/swagger";

@ApiTags("place")
@Controller("place")
export class PlaceController {
    constructor(private placeService: PlaceService) {
    }


    @Post()
    createPlace(@Body()dto: CreatePlaceDto) {
        return this.placeService.createPlace(dto)
    }

    @Post("type")
    createType(@Body()dto: CreateTypeDto) {
        return this.placeService.createType(dto)
    }

    @Get("/:typeId")
    getPlaces(@Param('typeId')typeId: number) {
        return this.placeService.getPlace(typeId)
    }

    @Get("type")
    getTypes() {
        return this.placeService.getTypes()
    }
}