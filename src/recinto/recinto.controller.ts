import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { RecintoService } from './recinto.service';
import { CreateRecintoDto } from './dto/create-recinto.dto';
import { UpdateRecintoDto } from './dto/update-recinto.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('recinto')
export class RecintoController {
  constructor(private readonly recintoService: RecintoService) {}

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
      await this.recintoService.cargaMasivaRecinto(filePath);

      return 'Datos cargados correctamente';
    } catch (error) {
      console.error(error.message);
      throw new Error(
        `Error al procesar las zonas del archivo Excel: ${error.message}`,
      );
    }
  }

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
    return this.recintoService.findOne(id);
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
