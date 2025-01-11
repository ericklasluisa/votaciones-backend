import { PartialType } from '@nestjs/mapped-types';
import { CreateJuntaDto } from './create-junta.dto';

export class UpdateJuntaDto extends PartialType(CreateJuntaDto) {}
