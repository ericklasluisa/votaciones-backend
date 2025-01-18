import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Junta } from './entities/junta.entity';
import { Repository } from 'typeorm';
import { Recinto } from 'src/recinto/entities/recinto.entity';
import * as xlsx from 'xlsx';

@Injectable()
export class JuntaService {
  private readonly logger = new Logger('JuntaService');

  constructor(
    @InjectRepository(Junta)
    private readonly juntaRepository: Repository<Junta>,
    @InjectRepository(Recinto)
    private readonly recintoRepository: Repository<Recinto>,
  ) {}

  async cargaMasivaJunta(filePath: string) {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    for (const row of data) {
      const codigoRecinto = row['codigoRecinto'];
      console.log(codigoRecinto);
      const junIniF = row['junIniF'];
      console.log(junIniF);
      const junFinF = row['junFinF'];
      console.log(junFinF);
      const junIniM = row['junIniM'];
      console.log(junIniM);
      const junFinM = row['junFinM'];
      console.log(junFinM);

      const recinto = await this.recintoRepository.findOneBy({ codigoRecinto });
      if (!recinto) {
        throw new Error(`Recinto con código ${codigoRecinto} no encontrado.`);
      }

      // Crear juntas femeninas
      for (let i = junIniF; i <= junFinF; i++) {
        const juntaFemenina = this.juntaRepository.create({
          numJunta: i,
          genero: 'F',
          recinto,
        });
        await this.juntaRepository.save(juntaFemenina);
      }

      // Crear juntas masculinas
      for (let i = junIniM; i <= junFinM; i++) {
        const juntaMasculina = this.juntaRepository.create({
          numJunta: i,
          genero: 'M',
          recinto,
        });
        await this.juntaRepository.save(juntaMasculina);
      }
    }
  }

  async findAll() {
    return await this.juntaRepository.find({
      relations: ['recinto'],
    });
  }
}
