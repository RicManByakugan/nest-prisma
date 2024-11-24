import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { Prisma } from "@prisma/client";

@Controller("users")
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  createUser(@Body() data: Prisma.UserCreateInput) {
    return this.userService.createUser(data);
  }

  @Get()
  getUsers() {
    return this.userService.findAllUsers();
  }

  @Get(":id")
  getUserById(@Param("id") id: string) {
    return this.userService.findUserById(Number(id));
  }

  @Put(":id")
  updateUser(@Param("id") id: string, @Body() data: Prisma.UserUpdateInput) {
    return this.userService.updateUser(Number(id), data);
  }

  @Delete(":id")
  deleteUser(@Param("id") id: string) {
    return this.userService.deleteUser(Number(id));
  }
}
