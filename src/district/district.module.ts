import {Module} from "@nestjs/common";
import {DistrictController} from "./district.controller";
import {DistrictService} from "./district.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {District} from "./district.entity";

@Module({
    controllers: [DistrictController],
    providers: [DistrictService],
    imports: [TypeOrmModule.forFeature([District])],
    exports:[DistrictService]
})
export class DistrictModule {

}