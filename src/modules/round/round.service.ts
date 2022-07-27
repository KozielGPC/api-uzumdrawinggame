import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { CreateRoundDto } from './dto/create-round.dto';

@Injectable()
export class RoundService {
    constructor(private prisma: PrismaService) {}

    async create(data: CreateRoundDto) {
        const match = await this.prisma.match.findFirst({
            where: { id: data.match_id },
        });
        return this.prisma.round.create({
            data: {
                content: data.content,
                type: data.type,
                match_id: data.match_id,
                receiver_id: data.receiver_id,
                sender_id: data.sender_id,
            },
        });
    }

    findAll() {
        return this.prisma.round.findMany();
    }

    // findOne(id: number) {
    //   return `This action returns a #${id} round`;
    // }

    // update(id: number, updateRoundDto: UpdateRoundDto) {
    //   return `This action updates a #${id} round`;
    // }

    // remove(id: number) {
    //   return `This action removes a #${id} round`;
    // }
}
