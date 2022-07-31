import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { CreateMatchDto } from './dto/create-match.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class MatchService {
    constructor(private prisma: PrismaService) {}

    async create(data: CreateMatchDto) {
        const users = await this.prisma.roomHasUsers.findMany({
            where: {
                room_id: data.room_id,
                active: true,
            },
            select: {
                user: true,
            },
        });

        const sort = [data.match_adm_id];

        const sorted_players = users
            .map((user) => {
                if (user.user.id != data.match_adm_id) {
                    return user.user.id;
                }
                user.user.id !== data.match_adm_id;
            })
            .sort(() => Math.random() - 0.5);

        sorted_players.map((player) => {
            if (player) {
                sort.push(player);
            }
        });

        const match = await this.prisma.match.create({
            data: {
                sort: sort.toString(),
                match_adm_id: data.match_adm_id,
                room_id: data.room_id,
                id: data.match_id ?? uuidv4(),
            },
        });

        let match_has_users_data = [];
        for (let i = 0; i < sort.length; i++) {
            match_has_users_data.push({
                match_id: match.id,
                user_id: sort[i],
            });
        }

        await this.prisma.matchHasUsers.createMany({
            data: match_has_users_data,
        });

        return this.prisma.match.findFirst({
            where: {
                id: match.id,
            },
            include: {
                users: {
                    include: {
                        user: true,
                    },
                },
            },
        });
    }

    async findAll() {
        return this.prisma.match.findMany({
            include: {
                match_adm: true,
                room: true,
                rounds: true,
                users: true,
            },
        });
    }

    async findRoundsOfMatch(match_id: string) {
        const match = await this.prisma.match.findFirst({
            where: {
                id: match_id,
            },
            include: {
                rounds: {
                    include: {
                        receiver: true,
                        sender: true,
                    },
                },
            },
        });

        if (!match) {
            throw new HttpException('Match not found', 404);
        }

        return match;
    }
}
