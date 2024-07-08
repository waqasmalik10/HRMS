import { Module } from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import * as Joi from 'joi';
import {TypeOrmModule, TypeOrmModuleOptions} from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {NODE_ENV} from './commons/enums';
import { AdminsModule } from './admins/admins.module';
import { AuthModule } from './auth/auth.module';
import { EmployeesModule } from './employees/employees.module';
import { AttendancesModule } from './attendances/attendances.module';
import { EmployeeIncrementsModule } from './employee-increments/employee-increments.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './.env',
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().required().valid(NODE_ENV.DEVELOPMENT, NODE_ENV.PRODUCTION),
        PORT: Joi.number().default(3000),
        DBHOST: Joi.string().required(),
        DBPORT: Joi.number().default(5432),
        DBUSER: Joi.string().required(),
        DBPASS: Joi.string().required(),
        DBNAME: Joi.string().required(),
        FRONTEND_URL: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRY: Joi.string().required(),
        ACCESS_KEY: Joi.string().required(),
      })
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get<string>('DBHOST'),
          port: +configService.get<number>('DBPORT'),
          username: configService.get<string>("DBUSER"),
          password: configService.get<string>("DBPASS"),
          database: configService.get<string>("DBNAME"),
          entities: [__dirname+''+'/**/*.entity{.ts,.js}'],
          autoLoadEntities: true,
          synchronize: configService.get<string>("NODE_ENV")===NODE_ENV.DEVELOPMENT // TEMP: Must be removed when going to production.
        } as TypeOrmModuleOptions
      },
    }),
    AdminsModule,
    AuthModule,
    EmployeesModule,
    AttendancesModule,
    EmployeeIncrementsModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
