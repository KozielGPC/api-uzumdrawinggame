import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }

    async create(data: CreateUserDto) {
        return this.prisma.user.create({
            data: {
                username: data.username,
            },
            include: {
                adm_rooms: true,
                rooms: true,
                adm_matches: true,
                matches: true,
                receiver_rounds: true,
                sender_rounds: true,
            }
        })
    }

    async findAll() {
        return this.prisma.user.findMany({
            include: {
                adm_matches: true,
                matches: true,
                adm_rooms: true,
                rooms: true,
                receiver_rounds: true,
                sender_rounds: true,
            }
        })
    }
}
