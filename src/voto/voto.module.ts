import { Module } from '@nestjs/common';
import { VotoService } from './voto.service';
import { VotoController } from './voto.controller';
import { Voto } from './entities/voto.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Voto])],
  controllers: [VotoController],
  providers: [VotoService],
})
export class VotoModule {}
