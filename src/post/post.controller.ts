import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from "@nestjs/common";
import { PostService } from "./post.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";

@Controller("posts")
export class PostController {
  constructor(private postService: PostService) {}

  @Post()
  createPost(@Body() createPostDto: CreatePostDto) {
    return this.postService.createPost(createPostDto);
  }

  @Get()
  getPosts() {
    return this.postService.getPosts();
  }

  @Get(":id")
  getPostById(@Param("id") id: string) {
    return this.postService.getPostById(Number(id));
  }

  @Put(":id")
  updatePost(@Param("id") id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.updatePost(Number(id), updatePostDto);
  }

  @Delete(":id")
  deletePost(@Param("id") id: string) {
    return this.postService.deletePost(Number(id));
  }
}
