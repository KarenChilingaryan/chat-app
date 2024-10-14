import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Channel } from './channel.entity';
import { User } from '../user/user.entity';
import { CreateChannelDto } from './dto/create-channel.dto';
import { Message } from '../message/message.entity';
import { Op, Sequelize } from 'sequelize';

@Injectable()
export class ChannelService {
  constructor(@InjectModel(Channel) private channelModel: typeof Channel) { }

  async createChannel(createChannelDto: CreateChannelDto): Promise<Channel> {
    const { name, members } = createChannelDto;

    const channel = await this.channelModel.create({ name });

    await channel.$set('members', members);

    const fullChannel = await this.channelModel.findOne({
      where: { id: channel.id },
      include: [
        {
          model: User,
          as: 'members',
          attributes: ['id', 'username', 'fullName', 'color'],
          through: { attributes: [] },
        },
      ],
    });

    return fullChannel;
  }

  async findAllChannelsForUser(userId: number): Promise<Channel[]> {
    return this.channelModel.findAll({
      include: [
        {
          model: User,
          as: 'members',
          attributes: ['id', 'username', 'fullName', 'color'],
          through: { attributes: [] },
        },
        {
          model: Message,
          as: 'messages',
          attributes: ['id', 'content', 'createdAt', 'userId', 'unread'],
          limit: 1,
          order: [['createdAt', 'DESC']], 
        },
      ],
      attributes: {
        include: [
          [
            Sequelize.literal(`(
              SELECT COUNT(*)
              FROM "messages"
              WHERE "messages"."channelId" = "Channel"."id"
              AND "messages"."unread" = true
              AND "messages"."userId" != ${userId}  -- Exclude messages sent by the current user
            )`),
            'unreadMessageCount',
          ],
        ],
      },
      where: {
        id: {
          [Op.in]: Sequelize.literal(`(
            SELECT "UserChannels"."channelId"
            FROM "UserChannels"
            WHERE "UserChannels"."userId" = ${userId}
          )`),
        },
      },
      order: [
        [
          Sequelize.literal(`(
            SELECT "createdAt" FROM "messages" 
            WHERE "messages"."channelId" = "Channel"."id"
            ORDER BY "createdAt" DESC
            LIMIT 1
          )`),
          'DESC',
        ],
      ],
    });
  }

  async addMember(channelId: number, userId: number): Promise<void> {
    const channel = await this.channelModel.findByPk(channelId);
    if (channel) {
      await channel.$add('members', userId);
    }
  }

  async findChannelById(channelId: number): Promise<Channel> {
    return this.channelModel.findByPk(channelId, {
      include: [User],
    });
  }
}
