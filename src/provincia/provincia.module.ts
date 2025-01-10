import { Module } from '@nestjs/common';
import { ProvinciaService } from './provincia.service';
import { ProvinciaController } from './provincia.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Provincia } from './entities/provincia.entity';

@Module({
  controllers: [ProvinciaController],
  providers: [ProvinciaService],
  imports: [TypeOrmModule.forFeature([Provincia])],
})
export class ProvinciaModule {}
