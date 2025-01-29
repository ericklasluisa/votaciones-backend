import { Candidato } from 'src/candidato/entities/candidato.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Partido {
  @PrimaryGeneratedColumn('uuid')
  idPartido: string;

  @Column('varchar', {
    nullable: false,
    length: 200,
  })
  nombrePartido: string;

  @Column('int', {
    nullable: false,
  })
  numPartido: number;

  @Column('bytea', {
    nullable: true,
  })
  fotoPartido: Buffer | null;

  // relaciones
  @OneToMany(() => Candidato, (candidato) => candidato.partido)
  candidatos: Candidato[];
}
