import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { MatchModule } from './modules/match/match.module';
import { RoomModule } from './modules/room/room.module';

@Module({
  imports: [UserModule, MatchModule, RoomModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
