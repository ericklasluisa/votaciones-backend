import { Injectable } from '@nestjs/common';
import { CreateCandidatoDto } from './dto/create-candidato.dto';
import { UpdateCandidatoDto } from './dto/update-candidato.dto';

@Injectable()
export class CandidatoService {
  create(createCandidatoDto: CreateCandidatoDto) {
    return 'This action adds a new candidato';
  }

  findAll() {
    return `This action returns all candidato`;
  }

  findOne(id: number) {
    return `This action returns a #${id} candidato`;
  }

  update(id: number, updateCandidatoDto: UpdateCandidatoDto) {
    return `This action updates a #${id} candidato`;
  }

  remove(id: number) {
    return `This action removes a #${id} candidato`;
  }
}
