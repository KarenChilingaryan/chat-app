import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { CreateChannelDto } from './dto/create-channel.dto';
import { AddMemberDto } from './dto/add-member.dto';

@Controller('channel')
export class ChannelController {
  constructor(private channelService: ChannelService) { }

  @Post()
  createChannel(@Body() createChannelDto: CreateChannelDto) {
    return this.channelService.createChannel(createChannelDto);
  }

  @Get('user/:userId')
  getChannelsForUser(@Param('userId') userId: number) {
    return this.channelService.findAllChannelsForUser(userId);
  }

  @Post(':channelId/member')
  addMember(@Param('channelId') channelId: number, @Body() addMemberDto: AddMemberDto) {
    return this.channelService.addMember(channelId, addMemberDto.userId);
  }

  @Get(':channelId')
  getChannelById(@Param('channelId') channelId: number) {
    return this.channelService.findChannelById(channelId);
  }
}
