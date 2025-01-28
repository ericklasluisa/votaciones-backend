import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateSimulacionDto } from './dto/create-simulacion.dto';
import { UpdateSimulacionDto } from './dto/update-simulacion.dto';
import { Repository } from 'typeorm';
import { Simulacion } from './entities/simulacion.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SimulacionService {
  private readonly logger = new Logger('SimulacionService');
  constructor(
    @InjectRepository(Simulacion)
    private readonly simulacionRepository: Repository<Simulacion>,
   ) {}

  async create(createSimulacionDto: CreateSimulacionDto) {
    try{
      const simulacion = this.simulacionRepository.create(createSimulacionDto);
      await this.simulacionRepository.save(simulacion);
      return simulacion;
    }catch(e){
      this.handleDBExceptions(e);
    }
    
    return 'This action adds a new simulacion';
  }

  async findAll() {
    return await this.simulacionRepository.find();
  }

  async findOne(id: string) {
    return this.simulacionRepository.findOne({where: {idSimulacion: id}});
  }

  

  update(id: number, updateSimulacionDto: UpdateSimulacionDto) {
    return `This action updates a #${id} simulacion`;
  }

  remove(id: number) {
    return `This action removes a #${id} simulacion`;
  }

  private handleDBExceptions(error: any) {
      if (error.code === '23505') throw new BadRequestException(error.detail);
  
      this.logger.error(error);
      throw new InternalServerErrorException(
        'Error inesperado, revisar los logs del servidor',
      );
    }
}
