import { IsInt, IsOptional, IsString, IsUUID } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateCantonDto {
  @IsInt()
  @Transform(({ value }) => parseInt(value, 10))
  codigoCanton: number;

  @IsString()
  nombreCanton: string;

  @IsUUID()
  idProvincia: string;

  @IsUUID()
  @IsOptional()
  idCircunscripcion?: string | null;
}
