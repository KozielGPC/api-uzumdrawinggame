import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { RoomService } from './room.service';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) { }

  @Post()
  async create(@Body() data: CreateRoomDto) {
    return this.roomService.create(data);
  }

  @Get()
  async findAll() {
    return this.roomService.findAll();
  }

  @Patch()
  async update(@Body() data: UpdateRoomDto) {
    return this.roomService.update(data);
  }
}
