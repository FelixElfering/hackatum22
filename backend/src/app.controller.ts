import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { Room } from './entity/Room';
import { RoomService } from './service/room.service';

@Controller()
export class AppController {
  constructor(private readonly roomService: RoomService) {}

  @Get('/api/rooms')
  async getRooms(): Promise<Room[]> {
    try {
      let rooms = await this.roomService.get();
      const roomsWithTemp = rooms.map(async (room) => {
        const temp = await this.roomService.getRoomTemperature(room);
        room.temperature = temp;
        room.isOccupied = false;
        let isOccupied = await this.roomService.roomHasOccupants(room);
        console.log(`is occupied: ${isOccupied}`);
        room.isOccupied = isOccupied;

        if (isOccupied) {
          try {
            room.radiators.map(async (radiator) => await this.roomService.activate(radiator));
          } catch(e) {
            console.error(`couldn't activate radiator: ${e}`);
          }
        } else {
          try {
            room.radiators.map(async (radiator) => await this.roomService.deactivate(radiator));
          } catch(e) {
            console.error(`couldn't deactivate radiator: ${e}`);
          }
        }

        return room;
      });
      return await Promise.all(roomsWithTemp);
    } catch(e) {
      throw new NotFoundException('Room not found');
    }
  }

  @Get('/api/radiators/on')
  async activate() {
    const radiators = await this.roomService.getRadiators();
    radiators.forEach(async (radiator) => await this.roomService.activate(radiator));
  }

  @Get('/api/radiators/off')
  async deactivate() {
    const radiators = await this.roomService.getRadiators();
    radiators.forEach(async (radiator) => await this.roomService.deactivate(radiator));
  }

  @Get('/api/rooms/:id')
  async getRoom(@Param('id') id: string): Promise<Room> {
    try {
      const room = await this.roomService.getByID(id);
      const temp = await this.roomService.getRoomTemperature(room);
      room.temperature = temp;
      room.isOccupied = false;
      let isOccupied = await this.roomService.roomHasOccupants(room);
      console.log(`is occupied: ${isOccupied}`);
      room.isOccupied = isOccupied;
      
      return room;
    } catch(e) {
      throw new NotFoundException('Room not found');
    }
  }

  @Get('/api/room/temp/:id')
  async getTemperature(@Param('id') id: string): Promise<number> {
    try {
      const room = await this.roomService.getByID(id);
      return await this.roomService.getRoomTemperature(room);
    } catch(e) {
      throw new NotFoundException('Room not found');
    }
  }
}
