import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DignidadService } from './dignidad.service';
import { CreateDignidadDto } from './dto/create-dignidad.dto';
import { UpdateDignidadDto } from './dto/update-dignidad.dto';

@Controller('dignidad')
export class DignidadController {
  constructor(private readonly dignidadService: DignidadService) {}

  @Post()
  create(@Body() createDignidadDto: CreateDignidadDto) {
    return this.dignidadService.create(createDignidadDto);
  }

  @Get()
  findAll() {
    return this.dignidadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dignidadService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDignidadDto: UpdateDignidadDto) {
    return this.dignidadService.update(+id, updateDignidadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dignidadService.remove(+id);
  }
}
