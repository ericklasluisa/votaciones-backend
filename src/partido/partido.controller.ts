import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, UploadedFile, UseInterceptors } from '@nestjs/common';
import { PartidoService } from './partido.service';
import { CreatePartidoDto } from './dto/create-partido.dto';
import { UpdatePartidoDto } from './dto/update-partido.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('partido')
export class PartidoController {
  constructor(private readonly partidoService: PartidoService) {}

  @Post('excel')
    @UseInterceptors(
      FileInterceptor('file', {
        storage: diskStorage({
          destination: '../../uploads',
          filename: (req, file, cb) => {
            const uniqueSuffix =
              Date.now() + '-' + Math.round(Math.random() * 1e9);
            cb(null, `${uniqueSuffix}-${file.originalname}`);
          },
        }),
      }),
    )
    async uploadExcel(
      @UploadedFile() file: Express.Multer.File,
    ): Promise<string> {
      try {
        if (!file) {
          throw new BadRequestException('No se ha subido ningún archivo');
        }
  
        const filePath = file.path;
        await this.partidoService.cargaMasivaPartido(filePath);
  
        return 'Datos cargados correctamente';
      } catch (error) {
        console.error(error.message);
        throw new Error(
          `Error al procesar las zonas del archivo Excel: ${error.message}`,
        );
      }
    }
  
    

  @Post()
  create(@Body() createPartidoDto: CreatePartidoDto) {
    return this.partidoService.create(createPartidoDto);
  }

  @Get()
  findAll() {
    return this.partidoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.partidoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePartidoDto: UpdatePartidoDto) {
    return this.partidoService.update(+id, updatePartidoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.partidoService.remove(+id);
  }
}
