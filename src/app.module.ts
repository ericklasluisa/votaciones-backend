import { Module } from '@nestjs/common';
import { ProvinciaModule } from './provincia/provincia.module';
import { TypeOrmModule } from '@nestjs/typeorm';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
