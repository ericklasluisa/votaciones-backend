import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateCandidatoDto } from './dto/create-candidato.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Candidato } from './entities/candidato.entity';
import { Repository } from 'typeorm';
import { CommonService } from 'src/common/common.service';
import { Partido } from 'src/partido/entities/partido.entity';
import { Dignidad } from 'src/dignidad/entities/dignidad.entity';
import { Provincia } from 'src/provincia/entities/provincia.entity';
import { Circunscripcion } from 'src/circunscripcion/entities/circunscripcion.entity';

@Injectable()
export class CandidatoService {
  private readonly logger = new Logger('CandidatoService');

  constructor(
    @InjectRepository(Candidato)
    private readonly candidatoRepository: Repository<Candidato>,
    @InjectRepository(Partido)
    private readonly partidoRepository: Repository<Partido>,
    @InjectRepository(Dignidad)
    private readonly dignidadRepository: Repository<Dignidad>,
    @InjectRepository(Provincia)
    private readonly provinciaRepository: Repository<Provincia>,
    @InjectRepository(Circunscripcion)
    private readonly circunscripcionRepository: Repository<Circunscripcion>,

    private readonly commonService: CommonService,
  ) {}

  async cargaMasivaCandidato(filePath: string): Promise<string> {
    return await this.commonService.loadExcelData<
      Candidato,
      CreateCandidatoDto
    >(filePath, CreateCandidatoDto, this.candidatoRepository, {
      dignidad: {
        repo: this.dignidadRepository,
        field: 'codigoDignidad',
      },
      partido: {
        repo: this.partidoRepository,
        field: 'numPartido',
      },
      provincia: {
        repo: this.provinciaRepository,
        field: 'codigoProvincia',
      },
      circunscripcion: {
        repo: this.circunscripcionRepository,
        field: 'nombreCircunscripcion',
      },
    });
  }

  async findcandidatoscConRelaciones(
    idDignidad: string,
    idCircunscripcion?: string,
    idProvincia?: string,
  ) {
    if (!idDignidad) {
      throw new BadRequestException(
        'Debe proporcionar idDignidad como parámetro',
      );
    }

    let candidatos: Candidato[];
    const relations = ['partido'];

    if (idProvincia && !idCircunscripcion) {
      candidatos = await this.candidatoRepository.find({
        where: {
          dignidad: { idDignidad },
          provincia: { idProvincia },
        },
        relations,
      });
    } else if (idProvincia && idCircunscripcion) {
      candidatos = await this.candidatoRepository.find({
        where: {
          dignidad: { idDignidad },
          provincia: { idProvincia },
          circunscripcion: { idCircunscripcion },
        },
        relations,
      });
    } else if (!idProvincia && idCircunscripcion) {
      candidatos = await this.candidatoRepository.find({
        where: {
          dignidad: { idDignidad },
          circunscripcion: { idCircunscripcion },
        },
        relations,
      });
    } else {
      candidatos = await this.candidatoRepository.find({
        where: { dignidad: { idDignidad } },
        relations,
      });
    }

    if (!candidatos.length) {
      throw new NotFoundException(
        'No se encontraron candidatos con los criterios dados',
      );
    }

    // Agrupar por partido con estructura simplificada
    const candidatosPorPartido = candidatos.reduce((acc, candidato) => {
      const partidoId = candidato.partido.idPartido;
      if (!acc[partidoId]) {
        acc[partidoId] = {
          idPartido: candidato.partido.idPartido,
          nombrePartido: candidato.partido.nombrePartido,
          numPartido: candidato.partido.numPartido,
          candidatos: [],
        };
      }
      // Omitimos partido directamente sin asignarlo a una variable
      const candidatoSinPartido = Object.fromEntries(
        Object.entries(candidato).filter(([key]) => key !== 'partido'),
      );
      acc[partidoId].candidatos.push(candidatoSinPartido);
      return acc;
    }, {});

    return Object.values(candidatosPorPartido);
  }
}
