import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppDataSource } from "./data-source"
import { Occupant } from './entity/Occupant';
import { Radiator } from './entity/Radiator';
import { Room } from './entity/Room';

async function bootstrap() {
  await AppDataSource.initialize();
  console.log("DB connection is up and running");

  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const radiator1 = new Radiator();
  radiator1.ip = 'http://192.168.227.248:5000';
  await radiator1.save();

  // const radiator2 = new Radiator();
  // radiator2.ip = 'http://192.168.227.248:5000/';
  // await radiator2.save();

  // const radiator3 = new Radiator();
  // radiator3.ip = 'http://192.168.227.248:5000/';
  // await radiator3.save();

  const occ1 = new Occupant();
  occ1.bluetoothID = "F8:1A:2B:50:98:9B";
  occ1.name = "Dan";
  await occ1.save();

  const occ2 = new Occupant();
  occ2.bluetoothID = "2C:D0:66:91:BB:6F";
  occ2.name = "Sarvi";
  await occ2.save();

  const room1 = new Room();
  room1.name = "Bedroom";
  room1.radiators = [radiator1];
  await room1.save();

  const room2 = new Room();
  room2.name = "Living Room";
  room2.radiators = []//[radiator3];
  await room2.save();

  const room3 = new Room();
  room3.name = "Bathroom";
  room3.radiators = []//[radiator3];
  await room3.save();

  const room4 = new Room();
  room4.name = "Basement";
  room4.radiators = []//[radiator3];
  await room4.save();
  
  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);
  
  console.log(`Server is awaiting your command on port ${PORT}`);
}
bootstrap();
