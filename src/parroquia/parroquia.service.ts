import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Parroquia } from './entities/parroquia.entity';
import { Repository } from 'typeorm';
import { Canton } from 'src/canton/entities/canton.entity';
import { Circunscripcion } from 'src/circunscripcion/entities/circunscripcion.entity';
import { CommonService } from 'src/common/common.service';
import { CreateParroquiaDto } from './dto/create-parroquia.dto';

@Injectable()
export class ParroquiaService {
  private readonly logger = new Logger('ParroquiaService');

  constructor(
    @InjectRepository(Parroquia)
    private readonly parroquiaRepository: Repository<Parroquia>,
    @InjectRepository(Canton)
    private readonly cantonRepository: Repository<Canton>,
    @InjectRepository(Circunscripcion)
    private readonly circunscripcionRepository: Repository<Circunscripcion>,
    private readonly commonService: CommonService,
  ) {}

  async findAllWithRelations(idCanton?: string, idCircunscripcion?: string) {
    if (idCircunscripcion && !idCanton) {
      return await this.parroquiaRepository.find({
        where: { circunscripcion: { idCircunscripcion } },
      });
    }
    if (idCircunscripcion && idCanton) {
      return await this.parroquiaRepository.find({
        where: { canton: { idCanton }, circunscripcion: { idCircunscripcion } },
      });
    }
    return await this.parroquiaRepository.find({
      where: { canton: { idCanton } },
    });
  }

  async cargaMasivaParroquia(filePath: string): Promise<string> {
    return await this.commonService.loadExcelData<
      Parroquia,
      CreateParroquiaDto
    >(filePath, CreateParroquiaDto, this.parroquiaRepository, {
      canton: {
        repo: this.cantonRepository,
        field: 'codigoCanton',
      },
      circunscripcion: {
        repo: this.circunscripcionRepository,
        field: 'nombreCircunscripcion',
      },
    });
  }

  async findAll() {
    return await this.parroquiaRepository.find({
      relations: ['canton', 'circunscripcion'],
    });
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);
    throw new InternalServerErrorException(
      'Error inesperado, revisar los logs del servidor',
    );
  }
}
