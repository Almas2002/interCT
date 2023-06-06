import {ApiProperty} from "@nestjs/swagger";

export class CreateTicketDto{
    @ApiProperty()
    sessionPlaceId:number;
    @ApiProperty()
    busId:number;
}