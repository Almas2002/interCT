import {Entity, Repository} from "typeorm";
import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Comment} from "./comment.entity";
import {CreateCommentDto, FilterCommentsQuery} from "./comment.dto";

@Injectable()
export class CommentService{
    constructor(@InjectRepository(Comment) private commentRepository:Repository<Comment> ) {}



    async create(dto:CreateCommentDto,userId:number){
        let parentComment = null
        if(dto.parentId){
            parentComment = await this.commentRepository.findOne({where:{id:dto.parentId}})
        }
        const comment = await this.commentRepository.save({ user:{id:userId}, parentComment, text: dto.text, bus:{id:dto.busId}});
        return { id: comment.id };
    }

    async getComments(dto: FilterCommentsQuery): Promise<{ data: Comment[], count: number }> {
        const limit = dto?.limit || 10;
        const page = dto?.page || 1;
        const offset = page * limit - limit;
        const query = await this.commentRepository.createQueryBuilder('comment')
            .select('comment.id',"id")
            .addSelect('comment.text',"text")
            .addSelect('COUNT(subComments.id)', 'subCount')
            .leftJoin('comment.subComments', 'subComments')
            .groupBy("comment.id")

        if (dto?.parentId) {
            query.andWhere('comment.parentCommentId = :parentId', { parentId: dto.parentId });
        }else {
            query.andWhere("comment.parentCommentId IS NULL")
        }
        if (dto?.busId){
            query.andWhere('comment.busId = :busId', { busId: dto.busId });
        }

        query.limit(limit);
        query.offset(offset);
        const data = await query.getRawMany();
        const count = await query.getCount();
        return { data, count };
    }
}