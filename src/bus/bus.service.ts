import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Bus} from "./bus.entity";
import {Repository} from "typeorm";
import {CreateBusDto} from "./bus.dto";
import {FileService} from "../file/file.service";

@Injectable()
export class BusService {
    constructor(@InjectRepository(Bus) private busRepository: Repository<Bus>, private fileService: FileService) {
    }

    async create(dto: CreateBusDto, userId: number, file: any): Promise<{ id: number }> {
        const image = await this.fileService.createFile(file)
        const bus = await this.busRepository.save({user: {id: userId}, image,type:{id:dto.typeId}, ...dto})
        return {id: bus.id}
    }

    async getBusByUserId(userId:number){
        return this.busRepository.findOne({where:{user:{id:userId}},relations:["type"]})
    }
}