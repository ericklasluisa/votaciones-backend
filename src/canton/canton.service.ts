import { Injectable } from '@nestjs/common';
import { CreateCantonDto } from './dto/create-canton.dto';
import { UpdateCantonDto } from './dto/update-canton.dto';

@Injectable()
export class CantonService {
  create(createCantonDto: CreateCantonDto) {
    return 'This action adds a new canton';
  }

  findAll() {
    return `This action returns all canton`;
  }

  findOne(id: number) {
    return `This action returns a #${id} canton`;
  }

  update(id: number, updateCantonDto: UpdateCantonDto) {
    return `This action updates a #${id} canton`;
  }

  remove(id: number) {
    return `This action removes a #${id} canton`;
  }
}
