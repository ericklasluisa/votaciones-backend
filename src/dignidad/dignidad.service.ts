import { Injectable } from '@nestjs/common';
import { CreateDignidadDto } from './dto/create-dignidad.dto';
import { UpdateDignidadDto } from './dto/update-dignidad.dto';

@Injectable()
export class DignidadService {
  create(createDignidadDto: CreateDignidadDto) {
    return 'This action adds a new dignidad';
  }

  findAll() {
    return `This action returns all dignidad`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dignidad`;
  }

  update(id: number, updateDignidadDto: UpdateDignidadDto) {
    return `This action updates a #${id} dignidad`;
  }

  remove(id: number) {
    return `This action removes a #${id} dignidad`;
  }
}
