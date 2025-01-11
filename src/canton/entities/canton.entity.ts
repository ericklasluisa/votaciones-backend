import { Circunscripcion } from 'src/circunscripcion/entities/circunscripcion.entity';
import { Dignidad } from 'src/dignidad/entities/dignidad.entity';
import { Parroquia } from 'src/parroquia/entities/parroquia.entity';
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
export class Canton {
  @PrimaryGeneratedColumn('uuid')
  idCanton: string;

  @Column('int', {
    nullable: false,
    unique: true,
  })
  codigoCanton: number;

  @Column('varchar', {
    nullable: false,
    length: 70,
  })
  nombreCanton: string;

  //relaciones
  @ManyToOne(() => Provincia, (provincia) => provincia.cantones, {
    nullable: false,
  })
  @JoinColumn({ name: 'idProvincia' })
  provincia: Provincia;

  @OneToMany(() => Parroquia, (parroquia) => parroquia.canton)
  parroquias: Parroquia[];

  // Relación opcional con Circunscripción
  @ManyToOne(
    () => Circunscripcion,
    (circunscripcion) => circunscripcion.cantones,
    {
      nullable: true, // Relación opcional
      onDelete: 'SET NULL', // Si se elimina la circunscripción, los cantones quedan sin asignar
    },
  )
  @JoinColumn({ name: 'id_circunscripcion' })
  circunscripcion?: Circunscripcion | null;

  @OneToMany(() => Dignidad, (dignidad) => dignidad.canton)
  dignidades: Dignidad[];
}
