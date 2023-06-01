import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {District} from "./district.entity";
import {Repository} from "typeorm";
import {CreateDistrictDto} from "./district.dto";

@Injectable()
export class DistrictService {
    constructor(@InjectRepository(District) private districtRepository: Repository<District>) {
    }

    async create(dto: CreateDistrictDto) {
        const district = await this.districtRepository.save({title: dto.title, city: {id: dto.cityId}})
        return {id: district.id}
    }

    async getByCityId(id: number) {
        return this.districtRepository.find({where: {city: {id}}})
    }

    async getById(id:number){
        return this.districtRepository.findOne({where:{id}})
    }
}