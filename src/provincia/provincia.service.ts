import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateProvinciaDto } from './dto/create-provincia.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Provincia } from './entities/provincia.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProvinciaService {
  private readonly logger = new Logger('ProductsService');
  constructor(
    @InjectRepository(Provincia)
    private readonly provinciaRepository: Repository<Provincia>,
  ) {}

  async create(createProvinciaDto: CreateProvinciaDto) {
    try {
      const provincia = this.provinciaRepository.create(createProvinciaDto);
      await this.provinciaRepository.save(provincia);
      return provincia;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll() {
    return await this.provinciaRepository.find();
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);
    throw new InternalServerErrorException(
      'Error inesperado, revisar los logs del servidor',
    );
  }
}
