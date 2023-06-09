import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {SessionPlace} from "./session-place.entity";
import {Repository} from "typeorm";
import {PlaceService} from "../place/place.service";

@Injectable()
export class SessionPlaceService {
    constructor(@InjectRepository(SessionPlace) private sessionPlaceRepository: Repository<SessionPlace>, private placeService: PlaceService) {
    }


    async create(sessionId: number, typeId: number) {
        const places = await this.placeService.getPlacesByType(typeId)
        if (places.length) {
            for (let place of places) {
                await this.sessionPlaceRepository.save({session: {id: sessionId}, place: {id: place.id}})
            }
        }
    }

    async getPlaces(sessionId: number) {
        return this.sessionPlaceRepository.find({where: {session: {id: sessionId}}, relations: ["place"]})
    }

    async getPlaceByOne(id: number) {
        return this.sessionPlaceRepository.findOne({
            where: {id},
            relations: ["session", ]
        })
    }
    async taken(id:number){
        await this.sessionPlaceRepository.update({id},{taken:true})
    }

    async getPlacesOrderBy(id:number){
        return this.sessionPlaceRepository.createQueryBuilder("sessionPlace")
            .leftJoinAndSelect("sessionPlace.place","place")
            .andWhere("sessionPlace.sessionId = :sessionId",{sessionId:id})
            .orderBy("place.row","ASC")
            .addOrderBy("place.column","ASC").getMany()

    }
}