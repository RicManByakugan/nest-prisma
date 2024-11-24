import { Controller, Get, Post, Put, Delete, Param, Body, HttpStatus, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiResponse } from '../common/api-response';
import { CheckIdExistsGuard } from 'src/decorators/checkID.decorator';

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
  @UseGuards(CheckIdExistsGuard)
  async getUserById(@Param('id') id: string) {
    const user = await this.userService.findUserById(Number(id));
    return ApiResponse.success(user, 'User retrieved successfully');
  }

  @Put(':id')
  @UseGuards(CheckIdExistsGuard)
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const updatedUser = await this.userService.updateUser(Number(id), updateUserDto);
    return ApiResponse.success(updatedUser, 'User updated successfully');
  }

  @Delete(':id')
  @UseGuards(CheckIdExistsGuard)
  async deleteUser(@Param('id') id: string) {
    await this.userService.deleteUser(Number(id));
    return ApiResponse.success(null, 'User deleted successfully', HttpStatus.NO_CONTENT);
  }
}
