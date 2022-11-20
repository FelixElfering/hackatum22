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
        // if (isOccupied) {
        //   console.log("Activating radiators");
        //   await this.roomService.activateRadiators(room);
        // } else {
        //   console.log("Deactivating radiators");
        //   await this.roomService.deactivateRadiators(room);
        // }
        room.isOccupied = isOccupied;

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
    console.log("Turn the radiators on");
  }

  @Get('/api/radiators/off')
  async deactivate() {
    const radiators = await this.roomService.getRadiators();
    radiators.forEach(async (radiator) => await this.roomService.deactivate(radiator));
    console.log("Turn the radiators off")
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
