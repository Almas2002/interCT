import {ApiProperty} from "@nestjs/swagger";

export class CreateChatDto {
    @ApiProperty({example: "1", description: "userId"})
    userId: number

}