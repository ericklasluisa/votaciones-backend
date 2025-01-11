import { Candidato } from 'src/candidato/entities/candidato.entity';
import { Simulacion } from 'src/simulacion/entities/simulacion.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Voto {
  @PrimaryGeneratedColumn('uuid')
  idVoto: string;

  @Column('varchar', {
    nullable: false,
    length: 10,
  })
  tipoVoto: string;

  @Column('int', {
    nullable: false,
  })
  cantidad: number;

  // relaciones
  @ManyToOne(() => Voto, (voto) => voto.junta, {
    nullable: false,
  })
  @JoinColumn({ name: 'idJunta' })
  junta: Voto;

  @ManyToOne(() => Simulacion, (simulacion) => simulacion.votos, {
    nullable: false,
  })
  @JoinColumn({ name: 'idSimulacion' })
  simulacion: Simulacion;

  @ManyToOne(() => Candidato, (candidato) => candidato.votos, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'idCandidato' })
  candidato?: Candidato | null;
}
