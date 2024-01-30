import {
  Controller,
  Get,
  Post,
  HttpCode,
  HttpStatus,
  Req,
  Res,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { HttpService } from '@nestjs/axios'
import { GoogleAuth } from './auth.google.servise';

@Controller('auth')
export class AuthController {
  constructor(private jwtService: JwtService, private authService: AuthService, private googleAuth: GoogleAuth ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Res({ passthrough: true }) res, @Req() req) {
      const user = await this.authService.validateUser(req.body.email, req.body.password);
      // const payload = { id: user.id, email: user.email };
      // const token = this.jwtService.sign(payload);
      
      // res.cookie('access_token', token, {
      //   expires: new Date(Date.now() + 36000000),
      //   httpOnly: true, 
      // })
      // return {};
  }

  @Post('google')
  async loginGoogle(@Res({ passthrough: true }) res, @Req() req) {
    const rawGoogleProfile = await this.googleAuth.getGoogleUser(req.body);

    const user = await this.googleAuth.validateGoogleUser(rawGoogleProfile)
    // const payload = { id: user.id, email: user.email };
    // const token = this.jwtService.sign(payload);
    
    // res.cookie('access_token', token, {
    //   expires: new Date(Date.now() + 36000000),
    //   httpOnly: true, 
    // })
    return {};
  }

  @Get('logOut')
  async logOut(@Res({ passthrough: true }) res) {
    res.cookie('access_token', '', {
      expires: new Date(Date.now()),
    });
    return {};
  }
}
