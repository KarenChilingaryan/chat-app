import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessageService } from '../message/message.service';
import { CreateMessageDto } from '../message/dto/create-message.dto';

const port = 8001;

@WebSocketGateway(port, { cors: '*' })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(private messageService: MessageService) { }

  handleConnection(client: Socket) {
    console.log('Client connected:', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);
  }
  @SubscribeMessage('sendMessage')
  async handleMessage(@MessageBody() payload: CreateMessageDto): Promise<void> {
    const { channelId, content, userId } = payload;

    const newMessage = await this.messageService.createMessage({
      channelId,
      content,
      userId,
    });
    this.server.emit("sendMessage_" + channelId, newMessage);
  }

  @SubscribeMessage('loadMessages')
  async handleLoadMessages(client: Socket, payload: { channelId: number, pageSize: number, offset: number }) {
    const messages = await this.messageService.getMessagesByChannel(payload.channelId, payload.pageSize, payload.offset);
    client.emit('messagesLoaded', messages);
  }

}
