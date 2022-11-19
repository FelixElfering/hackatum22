import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Occupant } from "./Occupant";
import { Radiator } from "./Radiator";

@Entity()
export class Room {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string

    @OneToMany(() => Occupant, (occ) => occ.room)
    occupants: Occupant[];

    @OneToMany(() => Radiator, (occ) => occ.room)
    radiators: Radiator[];
}
