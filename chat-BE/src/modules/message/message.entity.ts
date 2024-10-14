import { Table, Column, Model, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from '../user/user.entity';
import { Channel } from '../channel/channel.entity';

@Table({
  tableName: 'messages', 
})
export class Message extends Model<Message> {
  @Column({
    allowNull: false,
  })
  content: string;

  @Column({
    allowNull: true,
  })
  photo: string; 

  @ForeignKey(() => User)
  @Column({
    allowNull: false,
  })
  userId: number;

  @ForeignKey(() => Channel)
  @Column({
    allowNull: false,
  })
  channelId: number;

  @Column({
    allowNull: false,
    defaultValue: true, 
  })
  unread: boolean;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Channel)
  channel: Channel;
}
