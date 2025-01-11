import { Module } from '@nestjs/common';
import { CandidatoService } from './candidato.service';
import { CandidatoController } from './candidato.controller';

@Module({
  controllers: [CandidatoController],
  providers: [CandidatoService],
})
export class CandidatoModule {}
