import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(3001, { cors: { origin: '*' } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private users: Map<string, string> = new Map();

  handleConnection(client: Socket) {
    console.log('Client connected:', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('User disconnected:', client.id);
    this.users.delete(client.id);
    this.server.emit('users', Array.from(this.users.values()));
  }

  @SubscribeMessage('join')
  handleJoin(client: Socket, username: string): void {
    this.users.set(client.id, username);
    this.server.emit('users', Array.from(this.users.values()));
    this.server.emit('message', {
      user: 'System',
      text: `${username} has joined the chat`,
      timestamp: new Date(),
    });
  }

  @SubscribeMessage('chatMessage')
  handleMessage(client: Socket, data: { message: string }): void {
    const username = this.users.get(client.id);
    if (username) {
      this.server.emit('message', {
        user: username,
        text: data.message,
        timestamp: new Date(),
      });
    }
  }
}
