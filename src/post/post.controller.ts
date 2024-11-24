import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpStatus,
  UseGuards,
} from "@nestjs/common";
import { PostService } from "./post.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { ApiResponse } from "../common/api-response";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { User } from "src/decorators/user.decorator";
// import { CheckIdExistsGuard } from "src/decorators/checkID.decorator";

@UseGuards(JwtAuthGuard)
@Controller("posts")
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post("/create")
  async createPost(@Body() createPostDto: CreatePostDto, @User() user: any) {
    const post = await this.postService.createPost(createPostDto, user);
    return ApiResponse.success(
      post,
      "Post created successfully",
      HttpStatus.CREATED,
    );
  }

  @Get("/getall")
  async getPosts() {
    const posts = await this.postService.getPosts();
    return ApiResponse.success(posts, "Posts retrieved successfully");
  }

  @Get("/get/:id")
  async getPostById(@Param("id") id: string) {
    const post = await this.postService.getPostById(Number(id));
    if (!post) {
      return ApiResponse.error("Post not found", HttpStatus.NOT_FOUND);
    }
    return ApiResponse.success(post, "Post retrieved successfully");
  }

  @Put("/update/:id")
  async updatePost(
    @Param("id") id: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    const updatedPost = await this.postService.updatePost(
      Number(id),
      updatePostDto,
    );
    if (!updatedPost) {
      return ApiResponse.error(
        "Post not found or update failed",
        HttpStatus.NOT_FOUND,
      );
    }
    return ApiResponse.success(updatedPost, "Post updated successfully");
  }

  @Delete("/delete/:id")
  async deletePost(@Param("id") id: string) {
    const result = await this.postService.deletePost(Number(id));
    if (!result) {
      return ApiResponse.error("Post not found", HttpStatus.NOT_FOUND);
    }
    return ApiResponse.success(
      null,
      "Post deleted successfully",
      HttpStatus.NO_CONTENT,
    );
  }

  // @UseGuards(CheckIdExistsGuard)
  @Get("/userpost")
  async getPostUser(@User() user: any) {
    const posts = await this.postService.getPostUser(user.id);
    return ApiResponse.success(posts, "Posts retrieved successfully");
  }
}
