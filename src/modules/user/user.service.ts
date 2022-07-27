import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }

    async create(data: LoginDto) {
        const user = await this.prisma.user.findFirst({
            where: {
                username: data.username
            },
            include: {
                adm_rooms: true,
                rooms: true,
                adm_matches: true,
                matches: true,
                receiver_rounds: true,
                sender_rounds: true,
            }
        });

        if (!user) {
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
        else if (user.active == false){
            return this.prisma.user.update({
                where: {
                    id: user.id
                },
                data: {
                    active: true,
                    updated_at: new Date(),
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
        else{
            return user;
        }
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
