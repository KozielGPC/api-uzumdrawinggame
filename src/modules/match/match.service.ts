import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { CreateMatchDto } from './dto/create-match.dto';

@Injectable()
export class MatchService {
    constructor(private prisma: PrismaService) { }

    async create(data: CreateMatchDto) {
        const users = await this.prisma.roomHasUsers.findMany({
            where: {
                room_id: data.room_id,
                active: true,
            },
            select: {
                user: true
            }
        });

        const sort = users.map((user) => user.user.id).sort(() => Math.random() - 0.5);
        console.log(sort);

        console.log(users);
        const match = await this.prisma.match.create({
            data: {
                sort: sort.toString(),
                match_adm_id: data.match_adm_id,
                room_id: data.room_id
            }
        })

        let match_has_users_data = []
        for (let i = 0; i < sort.length; i++) {
            match_has_users_data.push({
                match_id: match.id,
                user_id: sort[i],
            })
        }

        await this.prisma.matchHasUsers.createMany({
            data: match_has_users_data,
        })

        return this.prisma.match.findFirst({
            where: {
                id: match.id,
            },
            include: {
                users: {
                    include: {
                        user: true
                    }
                }
            }
        })
    }

    async findAll() {
        return this.prisma.room.findMany({
            include: {
                room_adm: true,
                matches: true,
                users: true
            }
        })
    }
}
