import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {

    constructor(private prisma: PrismaService){}

    async createUser(data: Prisma.UserCreateInput): Promise<User>{
        return await this.prisma.user.create({data});
    }

    async findAllUsers(): Promise<User[]> {
        return await this.prisma.user.findMany({
            include: {
                posts: true,
            },
        });
    }

    async findUserById(id: number): Promise<User | null> {
        return await this.prisma.user.findUnique({
            where: {id},
            include: {
                posts: true,
            },
        });
    }

    async updateUser(id: number, data: Prisma.UserUpdateInput): Promise<User | null> {
        return await this.prisma.user.update({where: {id}, data});
    }

    async deleteUser(id: number): Promise<User | null> {
        return await this.prisma.user.delete({where: {id}});
    }
}