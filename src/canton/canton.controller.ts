import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CantonService } from './canton.service';
import { CreateCantonDto } from './dto/create-canton.dto';
import { UpdateCantonDto } from './dto/update-canton.dto';

@Controller('canton')
export class CantonController {
  constructor(private readonly cantonService: CantonService) {}

  @Post()
  create(@Body() createCantonDto: CreateCantonDto) {
    return this.cantonService.create(createCantonDto);
  }

  @Get()
  findAll() {
    return this.cantonService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cantonService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCantonDto: UpdateCantonDto) {
    return this.cantonService.update(+id, updateCantonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cantonService.remove(+id);
  }
}
