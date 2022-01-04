import {
  // MessageBody,
  // SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  // WsResponse,
} from '@nestjs/websockets';
// import { from, Observable } from 'rxjs';
// import { map } from 'rxjs/operators';
import { Server } from 'socket.io';

/**
 * Initialize a web socket
 */
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  // @SubscribeMessage('identity')
  // findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
  //   return from([1]).pipe(map(item => ({ event: 'identity', data })));
  // }

  // @SubscribeMessage('events')
  // async identity(@MessageBody() data: number): Promise<number> {
  //   return data;
  // }
}
