import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Like} from "./like.entity";
import {Repository} from "typeorm";
import {CreateLikeDto} from "./like.dto";

@Injectable()
export class LikeService {
    constructor(@InjectRepository(Like) private likeRepository: Repository<Like>) {
    }


    async create(dto: CreateLikeDto, userId: number) {
        let candidate = await this.likeRepository.findOne({where: {session: {id: dto.sessionId}, user: {id: userId}}})
        if (candidate){
            await this.likeRepository.delete({user:{id:userId},session:{id:dto.sessionId}})
            return
        }
        const like = await this.likeRepository.save({session: {id: dto.sessionId}, user: {id: userId}})
        return {id: like.id}
    }



}