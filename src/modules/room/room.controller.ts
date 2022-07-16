import { Body, Controller, Get, Post } from '@nestjs/common';
import { Prisma } from 'prisma/@generated';
import { RoomService } from './room.service';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) { }

  @Post()
  async create(@Body() data: Prisma.RoomCreateInput) {
    return this.roomService.create(data);
  }

  @Get()
  async findAll() {
    return this.roomService.findAll();
  }
}
