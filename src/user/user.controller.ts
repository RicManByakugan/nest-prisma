import { Controller, Get, Post, Put, Delete, Param, Body, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiResponse } from '../common/api-response';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.createUser(createUserDto);
    return ApiResponse.success(user, 'User created successfully', HttpStatus.CREATED);
  }

  @Get()
  async getUsers() {
    const users = await this.userService.findAllUsers();
    return ApiResponse.success(users, 'Users retrieved successfully');
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const user = await this.userService.findUserById(Number(id));
    if (!user) {
      return ApiResponse.error('User not found', HttpStatus.NOT_FOUND);
    }
    return ApiResponse.success(user, 'User retrieved successfully');
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const updatedUser = await this.userService.updateUser(Number(id), updateUserDto);
    return ApiResponse.success(updatedUser, 'User updated successfully');
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    await this.userService.deleteUser(Number(id));
    return ApiResponse.success(null, 'User deleted successfully', HttpStatus.NO_CONTENT);
  }
}
