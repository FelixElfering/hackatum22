import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { Room } from "./Room";

@Entity()
export class Radiator {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Room, (room) => room.occupants)
    room: Room;

    @Column()
    ip: string;
}
