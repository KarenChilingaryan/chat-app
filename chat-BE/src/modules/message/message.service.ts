import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Message } from './message.entity';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message)
    private readonly messageModel: typeof Message,) {}

  async createMessage(createMessageDto: CreateMessageDto): Promise<Message> {
    return this.messageModel.create(createMessageDto);
  }

  async getMessagesByChannel(channelId: number, pageSize: number, offset: number): Promise<Message[]> {
    return this.messageModel.findAll({
      where: { channelId },
      limit: pageSize,
      offset,
      order: [['createdAt', 'DESC']],
    });
  }

  async markMessagesAsRead(channelId: number, userId: number): Promise<void> {
    await this.messageModel.update(
      { unread: false },
      { where: { channelId, userId, unread: true } }
    );
  }
}
