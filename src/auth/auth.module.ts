import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
// import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { GoogleAuth } from './auth.google.servise';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    // UsersModule,
    HttpModule,
    PassportModule.register({defaultStrategy: 'jwt', session: false}),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService, JwtStrategy, GoogleAuth],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}