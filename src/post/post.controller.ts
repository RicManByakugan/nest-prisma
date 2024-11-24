import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { PostService } from './post.service';
import { Prisma } from '@prisma/client';

@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  @Post()
  createPost(@Body() data: Prisma.PostCreateInput) {
    return this.postService.createPost(data);
  }

  @Get()
  getPosts() {
    return this.postService.getPosts();
  }

  @Get(':id')
  getPostById(@Param('id') id: string) {
    return this.postService.getPostById(Number(id));
  }

  @Put(':id')
  updatePost(@Param('id') id: string, @Body() data: Prisma.PostUpdateInput) {
    return this.postService.updatePost(Number(id), data);
  }

  @Delete(':id')
  deletePost(@Param('id') id: string) {
    return this.postService.deletePost(Number(id));
  }
}
