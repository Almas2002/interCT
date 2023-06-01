import {Entity, Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {Place} from "./place.entity";
import {CreatePlaceDto} from "./place.dto";
import {Type} from "./type.entity";
import {CreateTypeDto} from "./type.dto";
import {HttpException} from "@nestjs/common";

@Entity()
export class PlaceService {
    constructor(@InjectRepository(Place) private placeRepository: Repository<Place>, @InjectRepository(Type) private typeRepository: Repository<Type>) {
    }

    async createPlace(dto: CreatePlaceDto) {
        const type = await this.typeRepository.findOne({where: {id: dto.typeId}})
        if (!type) {
            throw new HttpException("type not found", 404)
        }
        const place = await this.placeRepository.save({type, ...dto})
        return {id: place.id}
    }

    async createType(dto: CreateTypeDto) {
        const type = await this.typeRepository.save({...dto})
        return {id: type.id}
    }

    async getPlace(id: number) {
        if (!id) {
            throw new HttpException("type not found", 404)
        }
        return this.placeRepository.find({where: {type: {id}}})
    }

    async getTypes() {
        return this.typeRepository.find()
    }

    async getPlacesByType(typeId: number) {
        return this.placeRepository.find({where: {type: {id: typeId}}})
    }
}