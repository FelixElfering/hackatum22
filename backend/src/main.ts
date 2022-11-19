import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppDataSource } from "./data-source"

async function bootstrap() {
  await AppDataSource.initialize();
  console.log("DB connection is up and running");

  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);
  
  console.log(`Server is await your command on port ${PORT}`);
}
bootstrap();
