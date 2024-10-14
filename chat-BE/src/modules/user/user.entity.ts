import { Table, Column, Model, BelongsToMany, HasMany } from 'sequelize-typescript';
import { Channel } from '../channel/channel.entity';
import { Message } from '../message/message.entity';

@Table({
  tableName: 'users',
})
export class User extends Model<User> {
  @Column({
    allowNull: false,
    unique: true,
  })
  username: string;

  @Column({
    allowNull: false,
  })
  fullName: string;

  @Column({
    allowNull: false,
  })
  password: string;

  @HasMany(() => Message)
  messages: Message[];

  @BelongsToMany(() => Channel, 'UserChannels', 'userId', 'channelId')
  channels: Channel[];

  @Column({
    allowNull: false,
  })
  color: string;
}
