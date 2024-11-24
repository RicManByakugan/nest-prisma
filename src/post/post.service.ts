import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Post } from '@prisma/client';
import { UpdatePostDto } from './dto/update-post.dto';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async createPost(data: CreatePostDto): Promise<Post> {
    return this.prisma.post.create({ data });
  }

  async getPosts(): Promise<Post[]> {
    return this.prisma.post.findMany({
      include: { user: true },
    });
  }

  async getPostById(id: number): Promise<Post | null> {
    return this.prisma.post.findUnique({
      where: { id },
      include: { user: true },
    });
  }

  async updatePost(id: number, data: UpdatePostDto): Promise<Post> {
    return this.prisma.post.update({
      where: { id },
      data,
    });
  }

  async deletePost(id: number): Promise<Post> {
    return this.prisma.post.delete({ where: { id } });
  }
}
