import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity } from "typeorm"
import { Room } from "./Room";

@Entity()
export class Radiator extends BaseEntity {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Room, (room) => room.occupants)
    room: Room;

    @Column()
    ip: string;
}
