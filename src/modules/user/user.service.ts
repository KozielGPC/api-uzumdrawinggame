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

    async findAll() {
        return this.prisma.user.findMany({
            include: {
                Match_Adm: true,
                Match_Player: true,
                Room: true,
                Round_Receiver: true,
                Round_Sender: true,
            }
        })
    }
}
