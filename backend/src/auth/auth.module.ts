import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AdminsModule } from 'src/admins/admins.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    AdminsModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          global: true,
          secret: config.get<string>("JWT_SECRET"),
          signOptions: { expiresIn: config.get<string>("JWT_EXPIRY")}
        }
      }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
