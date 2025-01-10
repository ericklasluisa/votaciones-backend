import { IsNumber, IsString } from 'class-validator';

export class CreateProvinciaDto {
  @IsNumber()
  codigoProvincia: number;
  @IsString()
  nombreProvincia: string;
  @IsNumber()
  numElectores: number;
  @IsNumber()
  numMujeres: number;
  @IsNumber()
  numHombres: number;
  @IsNumber()
  numJunta: number;
  @IsNumber()
  numJuntasMujeres: number;
  @IsNumber()
  numJuntasHombres: number;
}
