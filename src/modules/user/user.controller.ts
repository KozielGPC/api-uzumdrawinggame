import { Body, Controller, Post } from '@nestjs/common';
import { Prisma } from 'prisma/@generated';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  async create(@Body() data: Prisma.UserCreateInput) {
    return this.userService.create(data);
  }

}
