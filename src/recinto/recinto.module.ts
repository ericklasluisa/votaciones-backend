import { Module } from '@nestjs/common';
import { RecintoService } from './recinto.service';
import { RecintoController } from './recinto.controller';

@Module({
  controllers: [RecintoController],
  providers: [RecintoService],
})
export class RecintoModule {}
