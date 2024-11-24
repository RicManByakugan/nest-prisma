import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user/user.service";
import { User } from "@prisma/client"; // Si vous utilisez Prisma
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userService.getUserByEmail(email);
    if (!user || user.password !== password) {
      throw new UnauthorizedException("Invalid credentials");
    }
    return user;
  }

  async login(user: User) {
    const payload = { username: user.email, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
      },
    };
  }
  async register(name: string, email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.userService.createUser({
      name,
      email,
      password: hashedPassword,
    });
  }
}
