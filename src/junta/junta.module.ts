import { Module } from '@nestjs/common';
import { JuntaService } from './junta.service';
import { JuntaController } from './junta.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Junta } from './entities/junta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Junta])],
  controllers: [JuntaController],
  providers: [JuntaService],
})
export class JuntaModule {}
