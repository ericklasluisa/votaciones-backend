import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VotoService } from './voto.service';
import { CreateVotoDto } from './dto/create-voto.dto';
import { UpdateVotoDto } from './dto/update-voto.dto';

@Controller('voto')
export class VotoController {
  constructor(private readonly votoService: VotoService) {}

  @Post()
  create(@Body() createVotoDto: CreateVotoDto) {
    return this.votoService.create(createVotoDto);
  }

  @Get()
  findAll() {
    return this.votoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.votoService.findOne(id);
  }

  @Patch(':cantidad')
  updateCantidad(@Param('cantidad') cantidad: number, @Body() idCandidato: string, @Body() idSimulacion: string, @Body() idJunta: string) {
    return this.votoService.updateCantidad(idCandidato, idSimulacion, idJunta, cantidad);
  }

  
}
