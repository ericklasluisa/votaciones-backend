import { Module } from '@nestjs/common';
import { CircunscripcionService } from './circunscripcion.service';
import { CircunscripcionController } from './circunscripcion.controller';

@Module({
  controllers: [CircunscripcionController],
  providers: [CircunscripcionService],
})
export class CircunscripcionModule {}
