import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Channel } from './channel.entity';
import { ChannelService } from './channel.service';
import { ChannelController } from './channel.controller';
import { User } from '../user/user.entity';

@Module({
  imports: [SequelizeModule.forFeature([Channel, User])],
  providers: [ChannelService],
  controllers: [ChannelController],
})
export class ChannelModule {}
