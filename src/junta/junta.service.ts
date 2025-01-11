import { Injectable } from '@nestjs/common';
import { CreateJuntaDto } from './dto/create-junta.dto';
import { UpdateJuntaDto } from './dto/update-junta.dto';

@Injectable()
export class JuntaService {
  create(createJuntaDto: CreateJuntaDto) {
    return 'This action adds a new junta';
  }

  findAll() {
    return `This action returns all junta`;
  }

  findOne(id: number) {
    return `This action returns a #${id} junta`;
  }

  update(id: number, updateJuntaDto: UpdateJuntaDto) {
    return `This action updates a #${id} junta`;
  }

  remove(id: number) {
    return `This action removes a #${id} junta`;
  }
}
