import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'planting-future',
      autoLoadEntities: true,
      synchronize: true,
      //dropSchema: true
    }),
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
