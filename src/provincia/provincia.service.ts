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
import * as xlsx from 'xlsx';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ProvinciaService {
  private readonly logger = new Logger('ProductsService');
  constructor(
    @InjectRepository(Provincia)
    private readonly provinciaRepository: Repository<Provincia>,
  ) {}

  async loadExcelData(filePath: string): Promise<string> {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    const provinciasDtos = data.map((row: any) =>
      plainToInstance(CreateProvinciaDto, {
        codigoProvincia: parseInt(row['codigoProvincia'], 10),
        nombreProvincia: row['nombreProvincia'],
        numElectores: parseInt(row['numElectores'], 10),
        numMujeres: parseInt(row['numMujeres'], 10),
        numHombres: parseInt(row['numHombres'], 10),
        numJunta: parseInt(row['numJunta'], 10),
        numJuntasMujeres: parseInt(row['numJuntasMujeres'], 10),
        numJuntasHombres: parseInt(row['numJuntasHombres'], 10),
      }),
    );

    for (const dto of provinciasDtos) {
      const errors = await validate(dto);
      if (errors.length > 0) {
        throw new Error(`Error en la fila: ${JSON.stringify(errors)}`);
      }
    }

    try {
      const provincias = provinciasDtos.map((dto) =>
        this.provinciaRepository.create(dto),
      );
      await this.provinciaRepository.save(provincias);
      return 'Provincias cargadas correctamente';
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

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
