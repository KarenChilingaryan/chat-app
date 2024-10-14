import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { MessageService } from './message.service';
import { Message } from './message.entity';
import { MessageController } from './message.controller';

@Module({
  imports: [SequelizeModule.forFeature([Message])],
  providers: [MessageService],
  exports: [MessageService],  
  controllers: [MessageController],
})
export class MessageModule {}