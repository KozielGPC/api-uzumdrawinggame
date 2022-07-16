import { Injectable } from '@nestjs/common';
import { Prisma } from 'prisma/@generated';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }

    async create(data: Prisma.UserCreateInput) {
        return this.prisma.user.create({
            data: data
        })
    }
}
