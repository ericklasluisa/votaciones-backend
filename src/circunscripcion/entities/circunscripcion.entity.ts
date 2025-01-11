import { Canton } from 'src/canton/entities/canton.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Circunscripcion {
  @PrimaryGeneratedColumn('uuid')
  id_circunscripcion: string;

  @Column('int', { unique: true, nullable: false })
  codigo_circunscripcion: number;

  @Column('varchar', { length: 60, nullable: false })
  nombre_circunscripcion: string;

  // Relación con Cantones
  @OneToMany(() => Canton, (canton) => canton.circunscripcion)
  cantones: Canton[];
}
