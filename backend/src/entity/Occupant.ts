import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { Room } from "./Room";

@Entity()
export class Occupant {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string

    @Column()
    bluetoothID: string

    @ManyToOne(() => Room, (room) => room.occupants)
    room: Room;
}
