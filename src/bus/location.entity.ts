import {Bus} from "./bus.entity";
import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Location {
    @PrimaryGeneratedColumn()
    id: number;
    @OneToOne(() => Bus, bus => bus.coordinates)
    @JoinColumn({name: "bus_id"})
    bus: Bus;
    @Column({type: "float", default: 0})
    lat: number;
    @Column({type: "float", default: 0})
    lon: number;
}