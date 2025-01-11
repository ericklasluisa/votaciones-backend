import { Injectable } from '@nestjs/common';
import { CreateVotoDto } from './dto/create-voto.dto';
import { UpdateVotoDto } from './dto/update-voto.dto';

@Injectable()
export class VotoService {
  create(createVotoDto: CreateVotoDto) {
    return 'This action adds a new voto';
  }

  findAll() {
    return `This action returns all voto`;
  }

  findOne(id: number) {
    return `This action returns a #${id} voto`;
  }

  update(id: number, updateVotoDto: UpdateVotoDto) {
    return `This action updates a #${id} voto`;
  }

  remove(id: number) {
    return `This action removes a #${id} voto`;
  }
}
