import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateMatchDto } from './dto/create-match.dto';
import { MatchService } from './match.service';

@Controller('match')
export class MatchController {
  constructor(private readonly matchService: MatchService) { }

  @Post()
  async create(@Body() data: CreateMatchDto) {
    return this.matchService.create(data);
  }

  @Get()
  async findAll() {
    return this.matchService.findAll();
  }
}
