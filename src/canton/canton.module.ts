import { Module } from '@nestjs/common';
import { CantonService } from './canton.service';
import { CantonController } from './canton.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Canton } from './entities/canton.entity';
import { Provincia } from 'src/provincia/entities/provincia.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Canton, Provincia])],
  controllers: [CantonController],
  providers: [CantonService],
})
export class CantonModule {}
