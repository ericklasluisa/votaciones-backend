import { Module } from '@nestjs/common';
import { ProvinciaModule } from './provincia/provincia.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CantonModule } from './canton/canton.module';
import { CircunscripcionModule } from './circunscripcion/circunscripcion.module';
import { ParroquiaModule } from './parroquia/parroquia.module';
import { RecintoModule } from './recinto/recinto.module';
import { ZonaModule } from './zona/zona.module';
import { JuntaModule } from './junta/junta.module';
import { VotoModule } from './voto/voto.module';
import { CandidatoModule } from './candidato/candidato.module';
import { DignidadModule } from './dignidad/dignidad.module';
import { PartidoModule } from './partido/partido.module';
import { SimulacionModule } from './simulacion/simulacion.module';

@Module({
  imports: [
    //! Configurar base de datos, usuario, contraseña
    //TODO Configurar entidades
    //TODO Configurar variables de entorno
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: 'root',
      database: 'votaciones',
    }),
    ProvinciaModule,
    CantonModule,
    CircunscripcionModule,
    ParroquiaModule,
    RecintoModule,
    ZonaModule,
    JuntaModule,
    VotoModule,
    CandidatoModule,
    DignidadModule,
    PartidoModule,
    SimulacionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
