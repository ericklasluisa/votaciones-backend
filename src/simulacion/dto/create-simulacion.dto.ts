import { IsDate, IsString } from "class-validator";

export class CreateSimulacionDto {
    @IsDate()
    fechaCreacion: Date;
    @IsString()
    nombreSimulacion: string;
}
