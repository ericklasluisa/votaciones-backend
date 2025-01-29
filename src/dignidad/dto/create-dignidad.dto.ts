import { Transform } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';
import { Canton } from 'src/canton/entities/canton.entity';
import { Provincia } from 'src/provincia/entities/provincia.entity';

export class CreateDignidadDto {
  @IsString()
  nombreDignidad: string;

  @IsInt()
  @Transform(({ value }) => parseInt(value, 10))
  codigoDignidad: number;

}
