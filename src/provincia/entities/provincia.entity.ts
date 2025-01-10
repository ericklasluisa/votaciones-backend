import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Provincia {
  @PrimaryGeneratedColumn('uuid')
  idProvincia: number;

  @Column('int', {
    nullable: false,
    unique: true,
  })
  codigoProvincia: number;

  @Column('varchar', {
    nullable: false,
    length: 50,
  })
  nombreProvincia: string;

  @Column('int', {
    nullable: false,
  })
  numElectores: number;

  @Column('int', {
    nullable: false,
  })
  numMujeres: number;

  @Column('int', {
    nullable: false,
  })
  numHombres: number;

  @Column('int', {
    nullable: false,
  })
  numJunta: number;

  @Column('int', {
    nullable: false,
  })
  numJuntasMujeres: number;

  @Column('int', {
    nullable: false,
  })
  numJuntasHombres: number;
}
