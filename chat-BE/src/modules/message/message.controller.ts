import { Controller, Post, Body, Get, Param, Query, Patch, UseGuards } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('message')
export class MessageController {
  constructor(private messageService: MessageService) { }

  @Post()
  createMessage(@Body() createMessageDto: CreateMessageDto) {
    return this.messageService.createMessage(createMessageDto);
  }

  @Get('channel/:channelId')
  getMessagesByChannel(
    @Param('channelId') channelId: number,
    @Query('pageSize') pageSize: number,
    @Query('offset') offset: number,
  ) {
    return this.messageService.getMessagesByChannel(channelId, pageSize, offset);
  }

  @Patch('read/:channelId/:userId')
  @UseGuards(JwtAuthGuard)
  async markMessagesAsRead(@Param('channelId') channelId: number, @Param('userId') userId: number): Promise<void> {

    await this.messageService.markMessagesAsRead(channelId, userId);
  }
}
