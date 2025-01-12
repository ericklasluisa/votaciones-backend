import { Injectable } from '@nestjs/common';
import { CreateZonaDto } from './dto/create-zona.dto';
import { UpdateZonaDto } from './dto/update-zona.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Zona } from './entities/zona.entity';
import * as xlsx from 'xlsx';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ZonaService {

  constructor(
    @InjectRepository(Zona)
    private zonaRepository: Repository<Zona>,
  ) {}

  async create(createZonaDto: CreateZonaDto): Promise<Zona> {
    const newZona = this.zonaRepository.create(createZonaDto);
    return await this.zonaRepository.save(newZona);
  }

  

  async findAll(): Promise<Zona[]> {
    return await this.zonaRepository.find();
  }

  async findOne(id: string): Promise<Zona> {
    return await this.zonaRepository.findOne({where: {idZona: id}});
  }

  async loadExcelData(filePath: string): Promise<void>{
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    const zonasDtos = data.map((row: any) => 
      plainToInstance(CreateZonaDto, {
        codigoZona: parseInt(row['codigoZona'], 10),
        nombreZona: row['nombreZona'],
      }),
    );

    for (const dto of zonasDtos) {
      const errors = await validate(dto);
      if (errors.length > 0) {
        throw new Error(`Error en la fila: ${JSON.stringify(errors)}`);
      }
    }

    const zonas = zonasDtos.map((dto) => 
      this.zonaRepository.create({
        codigoZona: dto.codigoZona,
        nombreZona: dto.nombreZona,
      }),
    );
    await this.zonaRepository.save(zonas);
  }


  update(id: number, updateZonaDto: UpdateZonaDto) {
    return `This action updates a #${id} zona`;
  }

  remove(id: number) {
    return `This action removes a #${id} zona`;
  }
}
