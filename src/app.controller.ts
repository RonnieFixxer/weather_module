import { Controller, Get, UseGuards, Request} from '@nestjs/common';
import { JwtAuthGuard } from './auth/auth.jwt-guard';


@Controller()
export class AppController {
  // constructor(private usersService: UsersService,) {}

  // @UseGuards(JwtAuthGuard)
  // @Get('profile')
  // async getProfile(@Request() req): Promise<User> {
  //   const user = await this.usersService.findOne(req.user.id);
  //   return user;
  // }

}