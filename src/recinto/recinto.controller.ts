import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RecintoService } from './recinto.service';
import { CreateRecintoDto } from './dto/create-recinto.dto';
import { UpdateRecintoDto } from './dto/update-recinto.dto';

@Controller('recinto')
export class RecintoController {
  constructor(private readonly recintoService: RecintoService) {}

  @Post()
  create(@Body() createRecintoDto: CreateRecintoDto) {
    return this.recintoService.create(createRecintoDto);
  }

  @Get()
  findAll() {
    return this.recintoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recintoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecintoDto: UpdateRecintoDto) {
    return this.recintoService.update(+id, updateRecintoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recintoService.remove(+id);
  }
}
