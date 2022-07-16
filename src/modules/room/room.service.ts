import { Injectable } from '@nestjs/common';
import { Prisma } from 'prisma/@generated';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class RoomService {
    constructor(private prisma: PrismaService) { }

    async create(data: Prisma.RoomCreateInput) {
        return this.prisma.room.create({
            data: data
        })
    }

    async findAll() {
        return this.prisma.room.findMany({
            include: {
                room_adm: true,
            }
        })
    }
}
