import { Module } from "@nestjs/common";
import { PostController } from "./post.controller";
import { PrismaModule } from "src/prisma/prisma.module";
import { PostService } from "./post.service";
import { UserService } from "src/user/user.service";

@Module({
  imports: [PrismaModule],
  controllers: [PostController],
  providers: [PostService, UserService],
})
export class PostModule {}
