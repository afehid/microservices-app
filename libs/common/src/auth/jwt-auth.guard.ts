import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AUTH_SERVICE } from '../constants/service';
import { ClientProxy } from '@nestjs/microservices';
import { UserDto } from '../dto';

//this class gets tne jwt token and authenticates the user
@Injectable()
export class JwtAuthGuard implements CanActivate {
  //ClientProxy enables us to communicate with our microservices
  constructor(@Inject(AUTH_SERVICE) private readonly authClient: ClientProxy) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const jwt = context.switchToHttp().getRequest().cookies?.Authentication;
    if (!jwt) {
      return false;
    }
    return new Observable((observer) => {
      this.authClient
        .send<UserDto>('authenticate', {
          Authentication: jwt,
        })
        .subscribe({
          next: (res) => {
            context.switchToHttp().getRequest().user = res;
            observer.next(true);
          },
          error: (error) => observer.error(error),
          complete: () => observer.complete(),
        });
    });
  }
}
