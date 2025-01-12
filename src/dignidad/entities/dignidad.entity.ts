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

  // relaciones
  @OneToMany(() => Candidato, (candidato) => candidato.dignidad)
  candidatos: Candidato[];

  @ManyToOne(() => Provincia, (provincia) => provincia.dignidades, {
    nullable: true,
  })
  @JoinColumn({ name: 'idProvincia' })
  provincia?: Provincia | null;

  @ManyToOne(() => Canton, (canton) => canton.dignidades, {
    nullable: true,
  })
  @JoinColumn({ name: 'idCanton' })
  canton?: Canton | null;
}
