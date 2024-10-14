import { Controller, Post, Body, Get, Param, Patch, UseGuards, Req, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('')
export class UserController {
  constructor(private userService: UserService) { }

  @Post('user')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get('user')
  @UseGuards(JwtAuthGuard) 
  async getCurrentUser(@Req() req): Promise<User> {
   
    const { userId } = req.user; 
    return this.userService.findUserById(userId);
  }
  @Get('users')
  @UseGuards(JwtAuthGuard) 
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('users/search')
  @UseGuards(JwtAuthGuard) 
  async searchUsers(@Query('name') name: string): Promise<User[]> {
    return this.userService.searchUsersByName(name);
  }

}
