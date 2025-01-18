import { Injectable } from '@nestjs/common';
import { CreateRecintoDto } from './dto/create-recinto.dto';
import { UpdateRecintoDto } from './dto/update-recinto.dto';
import { Recinto } from './entities/recinto.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Parroquia } from 'src/parroquia/entities/parroquia.entity';
import { Zona } from 'src/zona/entities/zona.entity';
import * as xlsx from 'xlsx';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CommonService } from 'src/common/common.service';

@Injectable()
export class RecintoService {
  constructor(
    @InjectRepository(Recinto)
    private recintoRepository: Repository<Recinto>,
    @InjectRepository(Parroquia)
    private parroquiaRepository: Repository<Parroquia>,
    @InjectRepository(Zona)
    private zonaRepository: Repository<Zona>,
    private readonly commonService: CommonService,
  ) {}

  async cargaMasivaRecinto(filePath: string): Promise<string> {
    return await this.commonService.loadExcelData<Recinto, CreateRecintoDto>(
      filePath,
      CreateRecintoDto,
      this.recintoRepository,
      {
        parroquia: {
          repo: this.parroquiaRepository,
          field: 'codigoParroquia',
        },
        zona: {
          repo: this.zonaRepository,
          field: 'nombreZona',
        },
      },
    );
  }

  async create(createRecintoDto: CreateRecintoDto): Promise<Recinto> {
    const newRecinto = this.recintoRepository.create(createRecintoDto);
    return this.recintoRepository.save(newRecinto);
  }

  async processExcel(filePath: string) {
    const relations = {
      parroquia: {
        repo: this.parroquiaRepository,
        field: 'name',
      },
      zona: {
        repo: this.zonaRepository,
        field: 'code', // Campo clave en la entidad Zona
      },
    };

    try {
      const result = await this.commonService.loadExcelData(
        filePath,
        CreateRecintoDto, // DTO para los datos de Recinto
        this.recintoRepository, // Repositorio principal
        relations, // Relaciones con Parroquia y Zona
      );
      console.log(result); // Resultado exitoso
    } catch (error) {
      console.error('Error al procesar el archivo Excel:', error.message);
      throw error;
    }
  }

  async loadRecintosExcel(filePath: string): Promise<string> {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    for (const [index, row] of data.entries()) {
      // Validar claves foráneas
      const parroquia = await this.parroquiaRepository.findOneBy({
        codigoParroquia: row['codigoParroquia'],
      });
      if (!parroquia) {
        throw new Error(
          `Error en la fila ${index + 2}: La parroquia con código ${row['codigoParroquia']} no existe.`,
        );
      }

      const zona = await this.zonaRepository.findOneBy({
        codigoZona: row['codigoZona'],
      });
      if (!zona) {
        throw new Error(
          `Error en la fila ${index + 2}: La zona con código ${row['codigoZona']} no existe.`,
        );
      }

      const dto = plainToInstance(CreateRecintoDto, {
        codigoRecinto: row['codigoRecinto'],
        nombreRecinto: row['nombreRecinto'],
        direccionRecinto: row['direccionRecinto'],
        telefonoRecinto: row['telefonoRecinto'],
        coorX: row['coorX'] || null,
        coorY: row['coorY'] || null,
        longitud: row['longitud'] || null,
        latitud: row['latitud'] || null,
      });

      const errors = await validate(dto);
      if (errors.length > 0) {
        throw new Error(
          `Error en la fila ${index + 2}: ${JSON.stringify(errors)}`,
        );
      }

      // Crear instancia del recinto con claves foráneas
      const recinto = this.recintoRepository.create({
        codigoRecinto: dto.codigoRecinto,
        nombreRecinto: dto.nombreRecinto,
        direccionRecinto: dto.direccionRecinto,
        telefonoRecinto: dto.telefonoRecinto,
        coorX: dto.coorX,
        coorY: dto.coorY,
        longitud: dto.longitud,
        latitud: dto.latitud,
        parroquia,
        zona,
      });

      await this.recintoRepository.save(recinto);

      return 'Datos cargados correctamente';
    }
  }

  async findAll(): Promise<Recinto[]> {
    return this.recintoRepository.find();
  }

  async findOne(id: string): Promise<Recinto> {
    return this.recintoRepository.findOne({ where: { idRecinto: id } });
  }

  update(id: number, updateRecintoDto: UpdateRecintoDto) {
    return `This action updates a #${id} recinto`;
  }

  remove(id: number) {
    return `This action removes a #${id} recinto`;
  }
}
