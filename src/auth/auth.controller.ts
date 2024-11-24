import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiResponse } from '../common/api-response';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      return ApiResponse.error('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const token = await this.authService.login(user);
    return ApiResponse.success(token, 'Login successful');
  }

  @Post('register')
  async register(@Body() body: { name: string; email: string; password: string }) {
    const newUser = await this.authService.register(body.name, body.email, body.password);
    return ApiResponse.success(newUser, 'User registered successfully', HttpStatus.CREATED);
  }
}
