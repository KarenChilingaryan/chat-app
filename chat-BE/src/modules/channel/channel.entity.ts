import { Table, Column, Model, HasMany, BelongsToMany } from 'sequelize-typescript';
import { User } from '../user/user.entity';
import { Message } from '../message/message.entity';

@Table({
  tableName: 'channels',
})
export class Channel extends Model<Channel> {
  @Column({
    allowNull: false,
    unique: true,
  })
  name: string;

  @Column({
    allowNull: false,
    defaultValue: '#000000', 
  })
  color: string;

  @BelongsToMany(() => User, 'UserChannels', 'channelId', 'userId')
  members: User[];

  @HasMany(() => Message, { as: 'messages' }) 
  messages: Message[];
}
