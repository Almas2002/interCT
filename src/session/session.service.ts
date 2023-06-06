import {HttpException, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Session, SessionStatus} from "./session.entity";
import {Repository} from "typeorm";
import {CreateSessionDto, QuerySessions, UpdateSessionStatus} from "./session.dto";
import {BusService} from "../bus/bus.service";
import {DistrictService} from "../district/district.service";
import {SessionPlaceService} from "./session-place.service";

@Injectable()
export class SessionService {
    constructor(@InjectRepository(Session) private sessionRepository: Repository<Session>, private busService: BusService,
                private sessionPlaceService: SessionPlaceService, private districtService: DistrictService) {
    }


    async create(dto: CreateSessionDto, userId: number) {
        const bus = await this.busService.getBusByUserId(userId)
        if (!bus) {
            throw new HttpException("you do not have a bus", 404)
        }
        const session = await this.sessionRepository.save({
            cityFrom: {id: dto.cityFromId},
            cityTo: {id: dto.cityToId},
            bus: bus,
            districtFrom: {id: dto.districtFromId},
            arrivalDate: new Date(),
            arrivalTime: dto.arrivalTime,
            districtsTo: []
        })
        let district
        if (dto?.districtsToIds.length) {
            for (let districtToId of dto.districtsToIds) {
                district = await this.districtService.getById(districtToId)
                if (district) {
                    session.districtsTo.push(district)
                }
            }
        }
        await this.sessionPlaceService.create(session.id, bus.type.id)
        await this.sessionRepository.save(session)
        return {id: session.id}
    }

    async getSessions(dto: QuerySessions, userId: number) {
        if (!userId){
            userId = 0
        }
        const limit = dto?.limit || 10
        const page = dto?.page || 1
        const offset = page * limit - limit
        const query = this.sessionRepository.createQueryBuilder("session")
            .leftJoinAndSelect("session.cityFrom", "cityFrom")
            .leftJoinAndSelect("session.cityTo", "cityTo")
            .leftJoinAndSelect("session.bus", "bus")
            .leftJoinAndSelect("bus.type", "type")
            .leftJoinAndSelect("session.likes","likes",`likes.user_id = ${userId}`)
            .loadRelationCountAndMap('session.count', 'session.likes')
            .andWhere("session.status = :collects", {collects: SessionStatus.COLLECTS})
            .orderBy("session.id","DESC")
        if (dto?.arrivalDate) {
            query.andWhere("session.arrivalDate = :arrivalDate", {arrivalDate: dto.arrivalDate})
        }
        if (dto?.arrivalTime) {
            query.andWhere("session.arrivalTime = :arrivalTime", {arrivalTime: dto.arrivalTime})
        }
        if (dto?.busId) {
            query.andWhere("bus.id = :busId", {busId: dto.busId})
        }
        if (dto?.cityFromId) {
            query.andWhere("cityFrom.id = :cityFromId", {cityFromId: dto.cityFromId})
        }
        if (dto?.cityToId) {
            query.andWhere("cityTo.id = :cityToId", {cityToId: dto.cityToId})
        }
        if (dto?.districtFromId) {
            query.andWhere("session.districtFromId = :districtFromId", {districtFromId: dto.districtFromId})
        }
        if (dto?.districtToId) {
            query.leftJoin("session.districtsTo", "districtsTo")
            query.andWhere("districtsTo.id = :districtToId", {districtToId: dto.districtToId})
        }
        if (dto?.status) {
            query.andWhere("session.status = :status", {status: dto.status})
        }
        if(!!dto?.like){
            query.andWhere("likes.user_id = :userId", {userId: userId})
        }

        query.limit(limit)
        query.offset(offset)
        const data = await query.getManyAndCount()
        return {data: data[0], count: data[1]}
    }

    async getOneById(id: number) {
        return this.sessionRepository.findOne({
            where: {id},
            relations: ["cityFrom", "cityTo", "bus", "bus.type","bus.user", "bus.coordinates", "places", "places.place", "districtFrom", "districtsTo"]
        })
    }


    async updateStatus(dto: UpdateSessionStatus, id: number) {
        const session = await this.sessionRepository.findOne({where: {id}})
        session.status = dto.status
        await this.sessionRepository.save(session)
    }
}