import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesGateway } from './messages.gateway';
import { MatchService } from 'src/modules/match/match.service';
import { PrismaService } from 'src/database/PrismaService';
import { RoundService } from 'src/modules/round/round.service';

@Module({
    providers: [MessagesGateway, MessagesService, MatchService, PrismaService, RoundService],
})
export class MessagesModule {}
