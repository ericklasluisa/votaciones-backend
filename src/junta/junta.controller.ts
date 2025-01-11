import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JuntaService } from './junta.service';
import { CreateJuntaDto } from './dto/create-junta.dto';
import { UpdateJuntaDto } from './dto/update-junta.dto';

@Controller('junta')
export class JuntaController {
  constructor(private readonly juntaService: JuntaService) {}

  @Post()
  create(@Body() createJuntaDto: CreateJuntaDto) {
    return this.juntaService.create(createJuntaDto);
  }

  @Get()
  findAll() {
    return this.juntaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.juntaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJuntaDto: UpdateJuntaDto) {
    return this.juntaService.update(+id, updateJuntaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.juntaService.remove(+id);
  }
}
