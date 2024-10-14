// app.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { MessageModule } from './modules/message/message.module';
import { ChannelModule } from './modules/channel/channel.module';
import { User } from './modules/user/user.entity';
import { Message } from './modules/message/message.entity';
import { Channel } from './modules/channel/channel.entity';
import { ConfigModule } from '@nestjs/config';
import { ChatModule } from './modules/chat/chat.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.development',
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadModels: true,
      synchronize: false,
    }),
    SequelizeModule.forFeature([User, Message, Channel]),
    AuthModule,
    UserModule,
    MessageModule,
    ChannelModule,
    ChatModule,
  ],
})
export class AppModule {}
