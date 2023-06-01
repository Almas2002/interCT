import {Module} from "@nestjs/common";
import {SessionService} from "./session.service";
import {SessionPlaceService} from "./session-place.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Session} from "./session.entity";
import {SessionPlace} from "./session-place.entity";
import {PlaceModule} from "../place/place.module";
import {BusModule} from "../bus/bus.module";
import {DistrictModule} from "../district/district.module";
import {SessionController} from "./session.controller";

@Module({
    controllers:[SessionController],
    providers:[SessionService,SessionPlaceService],
    imports:[TypeOrmModule.forFeature([Session,SessionPlace]),PlaceModule,BusModule,DistrictModule]
})
export class SessionModule{

}