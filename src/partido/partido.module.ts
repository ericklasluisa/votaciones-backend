import { Module } from '@nestjs/common';
import { PartidoService } from './partido.service';
import { PartidoController } from './partido.controller';
import { Partido } from './entities/partido.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Partido])],
  controllers: [PartidoController],
  providers: [PartidoService],
})
export class PartidoModule {}
