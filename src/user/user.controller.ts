import { Controller, Get, Param, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/model/user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Request() req: any): Promise<User> {
    return this.userService.findByEmail(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':email')
  getUserByEmail(@Param('email') email: string): Promise<User> {
    return this.userService.findByEmail(email);
  }
}
