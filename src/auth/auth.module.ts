import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtGuard } from './guards/jwt.guard';
import { JwtStrategy } from './guards/jwt.strategy';
import { RolesGuard } from './guards/roles.guard';

@Module({
  imports: [UserModule, JwtModule.registerAsync({useFactory: () => ({
    secret: 'secret',
    signOptions: {expiresIn: '3600s'}
  })})],
  controllers: [AuthController],
  providers: [AuthService, JwtGuard, JwtStrategy, RolesGuard]
})
export class AuthModule {}
