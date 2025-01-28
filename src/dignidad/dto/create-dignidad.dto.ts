import { Transform } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';
import { Canton } from 'src/canton/entities/canton.entity';
import { Provincia } from 'src/provincia/entities/provincia.entity';

export class CreateDignidadDto {
  @IsString()
  nombreDignidad: string;

  @IsOptional()
  @IsInt()
  @Transform(({ value }) => parseInt(value))
  codigoProvincia?: number;

  @IsOptional()
  @IsInt()
  @Transform(({ value }) => parseInt(value))
  codigoCanton?: number;

  @IsOptional()
  provincia?: Provincia;

  @IsOptional()
  canton?: Canton;
}
