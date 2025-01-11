import { Module } from '@nestjs/common';
import { DignidadService } from './dignidad.service';
import { DignidadController } from './dignidad.controller';

@Module({
  controllers: [DignidadController],
  providers: [DignidadService],
})
export class DignidadModule {}
