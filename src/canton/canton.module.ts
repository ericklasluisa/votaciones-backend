import { Module } from '@nestjs/common';
import { CantonService } from './canton.service';
import { CantonController } from './canton.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Canton } from './entities/canton.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Canton])],
  controllers: [CantonController],
  providers: [CantonService],
})
export class CantonModule {}
