import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service';
import { TokenPayload } from '../interfaces/token-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        //we made any because we can get request from express or rpc (Remote Procedure Call) call
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (request: any) =>
          request?.cookies?.Authentication ||
          request?.Authentication ||
          request?.headers?.cookie?.split('Authentication=')[1],
      ]),
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  //we do localStrategy because we login and send the token to the header and then the jwtStrategy validate the token
  async validate({ userId }: TokenPayload) {
    return this.usersService.getUser({ _id: userId });
  }
}
