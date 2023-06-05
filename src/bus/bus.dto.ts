import {ApiProperty} from "@nestjs/swagger";

export class CreateBusDto{
    @ApiProperty()
    number:string;
    @ApiProperty()
    typeId:number
}

export class QueryBus{
    limit:number;
    page:number
}