import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, BadRequestException, UploadedFile } from '@nestjs/common';
import { CandidatoService } from './candidato.service';
import { CreateCandidatoDto } from './dto/create-candidato.dto';
import { UpdateCandidatoDto } from './dto/update-candidato.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('candidato')
export class CandidatoController {
  constructor(private readonly candidatoService: CandidatoService) {}

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
          await this.candidatoService.cargaMasivaCandidato(filePath);
    
          return 'Datos cargados correctamente';
        } catch (error) {
          console.error(error.message);
          throw new Error(
            `Error al procesar las zonas del archivo Excel: ${error.message}`,
          );
        }
      }

  @Post()
  create(@Body() createCandidatoDto: CreateCandidatoDto) {
    return this.candidatoService.create(createCandidatoDto);
  }

  @Get()
  findAll() {
    return this.candidatoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.candidatoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCandidatoDto: UpdateCandidatoDto) {
    return this.candidatoService.update(+id, updateCandidatoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.candidatoService.remove(+id);
  }
}
