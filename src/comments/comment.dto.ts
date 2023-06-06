import {ApiProperty} from "@nestjs/swagger";

export class CreateCommentDto{
    @ApiProperty()
    text:string;
    @ApiProperty()
    busId:number;
    @ApiProperty()
    parentId:number;
}

export class FilterCommentsQuery {
    parentId: number;
    busId: number;
    page:number;
    limit:number
}