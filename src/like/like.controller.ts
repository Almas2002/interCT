import {Body, Controller, Post, UseGuards} from "@nestjs/common";
import {ApiTags} from "@nestjs/swagger";
import {LikeService} from "./like.service";
import {CreateLikeDto} from "./like.dto";
import {AuthGuard} from "../auth/guard/auth.guard";
import {UserDecorator} from "../decorators/user.decorator";

@ApiTags("like")
@Controller("like")
export class LikeController {
    constructor(private likeService: LikeService) {
    }

    @UseGuards(AuthGuard)
    @Post()
    like(@Body()dto: CreateLikeDto, @UserDecorator('id')id: number) {
        return  this.likeService.create(dto, id)
    }
}