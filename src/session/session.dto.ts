import {ApiProperty} from "@nestjs/swagger";
import {SessionStatus} from "./session.entity";

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
    status:string;
}

export class UpdateSessionStatus{
    @ApiProperty({enum:SessionStatus,type:SessionStatus,required:true})
    status:SessionStatus
}
