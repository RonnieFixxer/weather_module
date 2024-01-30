import * as bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
// import { User } from 'src/users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    // private usersService: UsersService,
  ) {}

  async validateUser(email: string, pass: string): Promise<undefined> {
    // const user = await this.usersService.findOneByEmail(email);
    // console.log(user)
    // const isMatch = await bcrypt.compare(pass, user.password);
    // if (!isMatch) {
    //   throw new UnauthorizedException('Invalid credentials');
    // }
    // return user
  }
}