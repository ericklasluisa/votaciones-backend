import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CircunscripcionService } from './circunscripcion.service';
import { CreateCircunscripcionDto } from './dto/create-circunscripcion.dto';
import { UpdateCircunscripcionDto } from './dto/update-circunscripcion.dto';

@Controller('circunscripcion')
export class CircunscripcionController {
  constructor(private readonly circunscripcionService: CircunscripcionService) {}

  @Post()
  create(@Body() createCircunscripcionDto: CreateCircunscripcionDto) {
    return this.circunscripcionService.create(createCircunscripcionDto);
  }

  @Get()
  findAll() {
    return this.circunscripcionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.circunscripcionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCircunscripcionDto: UpdateCircunscripcionDto) {
    return this.circunscripcionService.update(+id, updateCircunscripcionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.circunscripcionService.remove(+id);
  }
}
