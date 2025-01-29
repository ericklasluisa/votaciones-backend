import { Candidato } from 'src/candidato/entities/candidato.entity';
import { Canton } from 'src/canton/entities/canton.entity';
import { Provincia } from 'src/provincia/entities/provincia.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Dignidad {
  @PrimaryGeneratedColumn('uuid')
  idDignidad: string;

  @Column('varchar', {
    nullable: false,
    length: 50,
  })
  nombreDignidad: string;

  @Column('int', {
    nullable: false,
  })
  codigoDignidad: number;

  // relaciones
  @OneToMany(() => Candidato, (candidato) => candidato.dignidad)
  candidatos: Candidato[];

  
}
