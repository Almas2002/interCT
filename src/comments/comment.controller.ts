import {Body, Controller, Get, Post, Query, UseGuards} from "@nestjs/common";
import {CommentService} from "./comment.service";
import {CreateCommentDto, FilterCommentsQuery} from "./comment.dto";
import {AuthGuard} from "../auth/guard/auth.guard";
import {UserDecorator} from "../decorators/user.decorator";
import {ApiQuery, ApiTags} from "@nestjs/swagger";

@ApiTags("comment")
@Controller("comment")
export class CommentController {
    constructor(private commentService: CommentService) {
    }


    @UseGuards(AuthGuard)
    @Post()
    async create(@Body()dto: CreateCommentDto, @UserDecorator('id')id: number) {
        return this.commentService.create(dto, id)
    }
    @ApiQuery({ name: 'busId', example: 1, required: false })
    @ApiQuery({ name: 'parentId', example: 10, required: false })
    @ApiQuery({ name: 'limit', example: 10, required: false })
    @ApiQuery({ name: 'page', example: 10, required: false })
    @Get()
    async get(@Query()query:FilterCommentsQuery){
        return this.commentService.getComments(query)
    }
}