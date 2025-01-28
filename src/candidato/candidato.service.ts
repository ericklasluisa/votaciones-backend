import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreateCandidatoDto } from './dto/create-candidato.dto';
import { UpdateCandidatoDto } from './dto/update-candidato.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Candidato } from './entities/candidato.entity';
import { Repository } from 'typeorm';
import { CommonService } from 'src/common/common.service';
import { PartialGraphHost } from '@nestjs/core';
import { Partido } from 'src/partido/entities/partido.entity';
import { Dignidad } from 'src/dignidad/entities/dignidad.entity';

@Injectable()
export class CandidatoService {
  private readonly logger = new Logger("CandidatoService");

  constructor(
    @InjectRepository(Candidato)
    private readonly candidatoRepository: Repository<Candidato>,
    @InjectRepository(Partido)
    private readonly partidoRepository: Repository<Partido>,
    @InjectRepository(Dignidad)
    private readonly dignidadRepository: Repository<Dignidad>,
    private readonly commonService: CommonService,
  ) {}

  async cargaMasivaCandidato(filePath: string): Promise<string>{
    return await this.commonService.loadExcelData<Candidato, CreateCandidatoDto>(
      filePath,
      CreateCandidatoDto,
      this.candidatoRepository,
      {
        dignidad: {
          repo: this.dignidadRepository,
          field: 'codigoDignidad'
        },
        partido:{
          repo: this.partidoRepository,
          field: 'numPartido'
        }
      }
    )
  }
  
  
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
