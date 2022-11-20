import { Module } from '@nestjs/common';
import { RoomService } from './service/room.service';

@Module({
  providers: [RoomService],
  exports: [RoomService]
})
export class RoomModule {}
