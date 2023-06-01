import {ApiProperty} from "@nestjs/swagger";

export class CreateBusDto{
    @ApiProperty()
    number:string;
    @ApiProperty()
    typeId:number
}