import { Body, Controller, Get, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  async login(@Body() data: LoginDto) {
    return this.userService.create(data);
  }

  @Get()
  async findAll() {
    return this.userService.findAll();
  }
}
