import { Module } from '@nestjs/common';
import { DignidadService } from './dignidad.service';
import { DignidadController } from './dignidad.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dignidad } from './entities/dignidad.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Dignidad])],
  controllers: [DignidadController],
  providers: [DignidadService],
})
export class DignidadModule {}
