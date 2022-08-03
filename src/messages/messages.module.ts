import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesGateway } from './messages.gateway';
import { MatchService } from 'src/modules/match/match.service';
import { PrismaService } from 'src/database/PrismaService';

@Module({
    providers: [MessagesGateway, MessagesService, MatchService, PrismaService],
})
export class MessagesModule {}
