import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { MatchModule } from './modules/match/match.module';
import { RoomModule } from './modules/room/room.module';
import { RoundModule } from './modules/round/round.module';

@Module({
  imports: [UserModule, MatchModule, RoomModule, RoundModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
