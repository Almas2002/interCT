import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {City} from "./city.entity";
import {CityController} from "./city.controller";
import {CityService} from "./city.service";

@Module({
    imports: [TypeOrmModule.forFeature([City])],
    controllers: [CityController],
    exports: [CityService],
    providers: [CityService]
})
export class CityModule {

}