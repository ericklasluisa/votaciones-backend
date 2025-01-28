import { IsOptional, IsString } from "class-validator";

export class CreateCandidatoDto {
    @IsString()
    nombreCandidato: string;

    @IsString()
    posicion: string;

    @IsOptional()
    fotoCandidato?: Buffer;
}
