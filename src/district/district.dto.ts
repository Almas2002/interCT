import {ApiProperty} from "@nestjs/swagger";

export class CreateDistrictDto{
    @ApiProperty()
    title:string;
    @ApiProperty()
    cityId:number;
}