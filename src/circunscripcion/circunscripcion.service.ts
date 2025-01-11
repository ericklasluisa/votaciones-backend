import { Injectable } from '@nestjs/common';
import { CreateCircunscripcionDto } from './dto/create-circunscripcion.dto';
import { UpdateCircunscripcionDto } from './dto/update-circunscripcion.dto';

@Injectable()
export class CircunscripcionService {
  create(createCircunscripcionDto: CreateCircunscripcionDto) {
    return 'This action adds a new circunscripcion';
  }

  findAll() {
    return `This action returns all circunscripcion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} circunscripcion`;
  }

  update(id: number, updateCircunscripcionDto: UpdateCircunscripcionDto) {
    return `This action updates a #${id} circunscripcion`;
  }

  remove(id: number) {
    return `This action removes a #${id} circunscripcion`;
  }
}
