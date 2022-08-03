import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { MatchService } from 'src/modules/match/match.service';

@WebSocketGateway({ cors: true })
export class MessagesGateway {
    constructor(private readonly messagesService: MessagesService, private readonly matchService: MatchService) {}

    @WebSocketServer() server: Server;
    private logger: Logger = new Logger('SocketGateway');

    afterInit(server: Server) {
        this.logger.log('Init');
    }

    handleConnection(client: Socket) {
        this.logger.log(`Client Connected: ${client.id}`);
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`Client Disconnected: ${client.id}`);
    }

    @SubscribeMessage('msgToServer')
    handleMessage(client: Socket, payload: string): void {
        this.server.emit('msgToClient', payload, client.id);
    }

    @SubscribeMessage('sendMessage')
    chatMessage(client: Socket, payload: string): void {
        this.server.emit('messageReceived', payload, client.id);
    }

    @SubscribeMessage('updateRoomPlayers')
    updateRoomPlayers(client: Socket, payload: string): void {
        this.server.emit('updatePlayers', payload, client.id);
    }

    @SubscribeMessage('sendNextRound')
    async sendNextRound(client: Socket, payload: string): Promise<void> {
        const rounds = await this.matchService.findRoundsOfMatch(payload);

        const lastRound = rounds.rounds[0];
        this.server.emit('receiveRound', lastRound, client.id);
    }
}
