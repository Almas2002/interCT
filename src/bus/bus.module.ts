import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Bus} from "./bus.entity";
import {BusService} from "./bus.service";
import {BusController} from "./bus.controller";
import {FileModule} from "../file/file.module";

@Module({
    imports:[TypeOrmModule.forFeature([Bus]),FileModule],
    providers:[BusService],
    controllers:[BusController],
    exports:[BusService]
})
export class BusModule{

}