import {ApiProperty} from "@nestjs/swagger";

export class CreateSessionDto {
    @ApiProperty()
    arrivalDate: Date
    @ApiProperty()
    arrivalTime: number;
    @ApiProperty()
    cityToId: number
    @ApiProperty()
    cityFromId: number
    @ApiProperty()
    districtsToIds: number[]
    @ApiProperty()
    districtFromId: number
}

export class QuerySessions {
    cityToId: number;
    cityFromId: number;
    arrivalDate: Date;
    arrivalTime: number;
    districtToId: number;
    districtFromId: number;
    busId: number;
    limit:number;
    page:number;
}
