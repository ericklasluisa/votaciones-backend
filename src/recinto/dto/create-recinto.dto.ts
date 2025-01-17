import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateRecintoDto {
    @IsNumber()
    codigoRecinto: number;

    @IsString()
    nombreRecinto: string;

    @IsString()
    direccionRecinto: string;

    @IsString()
    telefonoRecinto: string;

    @IsNumber({}, { message: 'coorX debe ser un número válido' })
    @IsOptional() 
    coorX: number | null;

    @IsNumber({}, { message: 'coorY debe ser un número válido' })
    @IsOptional() 
    coorY: number | null;

    @IsNumber({}, { message: 'longitud debe ser un número válido' })
    @IsOptional()
    longitud: number | null;

    @IsNumber({}, { message: 'latitud debe ser un número válido' })
    @IsOptional()
    latitud: number | null;

}
