import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Place} from "./place.entity";
import {PlaceService} from "./place.service";
import {PlaceController} from "./place.controller";
import {Type} from "./type.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Place,Type])],
    providers: [PlaceService],
    controllers: [PlaceController],
    exports: [PlaceService]
})
export class PlaceModule {}