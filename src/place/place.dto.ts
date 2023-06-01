import {ApiProperty} from "@nestjs/swagger";

export class CreatePlaceDto{
    @ApiProperty()
    row:number;
    @ApiProperty()
    column:number;
    @ApiProperty()
    typeId:number;
    @ApiProperty()
    floor:number;
}