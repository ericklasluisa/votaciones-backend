import { Module } from '@nestjs/common';
import { JuntaService } from './junta.service';
import { JuntaController } from './junta.controller';

@Module({
  controllers: [JuntaController],
  providers: [JuntaService],
})
export class JuntaModule {}
