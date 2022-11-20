import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity } from "typeorm"
import { Room } from "./Room";

@Entity()
export class Occupant extends BaseEntity {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string

    @Column()
    bluetoothID: string

    // @ManyToOne(() => Room, (room) => room.occupants)
    // room: Room;
}
