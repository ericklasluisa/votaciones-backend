import { Canton } from 'src/canton/entities/canton.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Circunscripcion {
  @PrimaryGeneratedColumn('uuid')
  idCircunscripcion: string;

  @Column('int', { nullable: false })
  codigoCircunscripcion: number;

  @Column('varchar', { length: 60, nullable: false })
  nombreCircunscripcion: string;

  // Relación con Cantones
  @OneToMany(() => Canton, (canton) => canton.circunscripcion)
  cantones: Canton[];
}
