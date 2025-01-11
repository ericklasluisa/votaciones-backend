import { Module } from '@nestjs/common';
import { SimulacionService } from './simulacion.service';
import { SimulacionController } from './simulacion.controller';

@Module({
  controllers: [SimulacionController],
  providers: [SimulacionService],
})
export class SimulacionModule {}
