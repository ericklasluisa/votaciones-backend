import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ZonaService } from './zona.service';
import { CreateZonaDto } from './dto/create-zona.dto';
import { UpdateZonaDto } from './dto/update-zona.dto';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';


@Controller('zona')
export class ZonaController {
  constructor(private readonly zonaService: ZonaService) {}

  @Post()
  create(@Body() createZonaDto: CreateZonaDto) {
    return this.zonaService.create(createZonaDto);
  }

  @Post('loadExcelData')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: '../../uploads', 
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${uniqueSuffix}-${file.originalname}`);
      },
    }),
  }))
  async uploadExcel(@UploadedFile() file: Express.Multer.File): Promise<string> {
    try{
      if (!file){
        throw new Error('No se ha subido ningún archivo');
      }

      const filePath = file.path;
      await this.zonaService.loadExcelData(filePath);

      return 'Datos cargados correctamente';
    }catch (error){
      console.error(error.message);
      throw new Error(`Error al procesar las zonas del archivo Excel: ${error.message}` );
    }
  }
    

  @Get()
  findAll() {
    return this.zonaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.zonaService.findOne(id);
  }




  @Patch(':id')
  update(@Param('id') id: string, @Body() updateZonaDto: UpdateZonaDto) {
    return this.zonaService.update(+id, updateZonaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.zonaService.remove(+id);
  }
}
