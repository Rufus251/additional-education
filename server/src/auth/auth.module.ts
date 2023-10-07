import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from 'src/jwt/jwt.module';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [JwtModule, DatabaseModule],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
