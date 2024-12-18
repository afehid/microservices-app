import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UsersService } from '../users/users.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string) {
    //we use try and catch to throw the error coming from the service that coming from the abstract repository
    try {
      return await this.usersService.verifyUser(email, password);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
// we use the local strategy to validate the user with : email and password from the userService class then in the auth we put the user in the cookie and sign the token of the jwt and when the auth controller uses the authGuard it activate the jwt strategy
// authGuard from controller -> before the route it activate the jwt strategy -> userService
//super is used to call the constructor of the parent class to activate the strategy