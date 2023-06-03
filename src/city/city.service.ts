import {Entity, Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {City} from "./city.entity";
import {CreateCityDto} from "./city.dto";
import {HttpException} from "@nestjs/common";

@Entity()
export class CityService {
    constructor(@InjectRepository(City) private cityRepository: Repository<City>) {
    }


    async create(dto: CreateCityDto): Promise<{ id: number }> {
        const candidate = await this.getByName(dto.title)
        if (candidate) {
            throw new HttpException("такой город уже существует", 400)
        }
        const city = await this.cityRepository.save({title: dto.title})
        return {id: city.id}
    }

    async getByName(title: string) {
        return this.cityRepository.findOne({where: {title}})
    }

    async getAll() {
        return this.cityRepository.find()
    }

    async delete(id:number){
        await this.cityRepository.delete({id})
    }
}