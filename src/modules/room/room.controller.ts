import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
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

  @Get('/:id')
  async findOne(@Param() param: { id: string }) {
    return this.roomService.findOne(param.id);
  }

  @Patch()
  async update(@Body() data: UpdateRoomDto) {
    return this.roomService.update(data);
  }
}
