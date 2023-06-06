import {ApiProperty} from "@nestjs/swagger";

export class CreateLikeDto{
    @ApiProperty()
    sessionId:number
}