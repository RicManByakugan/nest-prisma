import {
  Injectable,
  CanActivate,
  ExecutionContext,
  NotFoundException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { UserService } from "src/user/user.service";

@Injectable()
export class CheckIdExistsGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const id = Number(request.params.id);

    if (!id || isNaN(id)) {
      throw new NotFoundException("Invalid ID provided");
    }

    const entity = await this.userService.findUserById(id);
    if (!entity) {
      throw new NotFoundException("User not found");
    }

    return true;
  }
}
