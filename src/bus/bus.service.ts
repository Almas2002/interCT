import {HttpException, Injectable, NotFoundException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Bus} from "./bus.entity";
import {Repository} from "typeorm";
import {CreateBusDto, QueryBus} from "./bus.dto";
import {FileService} from "../file/file.service";
import {Location} from "./location.entity";
import {UpdateLocationDto} from "./location.dto";

@Injectable()
export class BusService {
    constructor(@InjectRepository(Bus) private busRepository: Repository<Bus>, private fileService: FileService,
                @InjectRepository(Location) private locationRepository: Repository<Location>) {
    }

    async create(dto: CreateBusDto, userId: number, file: any): Promise<{ id: number }> {
        const image = await this.fileService.createFile(file)
        const bus = await this.busRepository.save({user: {id: userId}, image, type: {id: dto.typeId}, ...dto})
        await this.locationRepository.save({bus})
        return {id: bus.id}
    }

    async getBusByUserId(userId: number) {
        return this.busRepository.findOne({where: {user: {id: userId}}, relations: ["type"]})
    }

    async updateLocation(dto: UpdateLocationDto, busId: number) {
        const bus = await this.locationRepository.findOne({where: {bus: {id: busId}}})
        if (!bus) {
            throw new HttpException("транспорт не найден", 404)
        }
        bus.lon = dto.lon
        bus.lat = dto.lat
        await this.locationRepository.save(bus)
    }

    async getAll(dto: QueryBus) {
        const limit = dto?.limit || 10
        const page = dto?.page || 1
        const offset = page * limit - limit
        const query = await this.busRepository.createQueryBuilder("bus")
            .leftJoinAndSelect("bus.type","type")
        query.limit(limit)
        query.offset(offset)
        const data = await query.getManyAndCount()
        return {data: data[0], count: data[1]}
    }
}