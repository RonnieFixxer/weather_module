import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
// import { UsersService } from 'src/users/users.service';

@Injectable()
export class GoogleAuth {
  constructor(
    private readonly httpService: HttpService,
    // private usersService: UsersService,
  ) {}
  async getGoogleUser(user) {
    const { data } = await firstValueFrom(
      this.httpService
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: 'application/json',
            },
          },
        )
        .pipe(
          catchError((error) => {
            throw `An error happened. Msg: ${JSON.stringify(
              error?.response?.data,
            )}`;
          }),
        ),
    );
    return data;
  }

  async validateGoogleUser(googleUser) {
    const {
      id,
      email,
      verified_email,
      name,
      given_name,
      family_name,
      picture,
      locale,
    } = googleUser;
    const randomString = Math.random().toString(36).slice(-8);
    // const user = await this.usersService.findOneByEmail(email);
    // if (!user) {
    //   const newUser = await this.usersService.create({
    //     email: email,
    //     firstName:given_name,
    //     lastName: family_name,
    //     password: randomString,
    // })
    //     return newUser
    // }
    // return user;
  }
}
