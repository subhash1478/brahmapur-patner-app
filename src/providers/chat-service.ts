import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { map } from 'rxjs/operators/map';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

export class ChatMessage {
  messageId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  toUserId: string;
  time: number | string;
  message: string;
  status: string;
}

export class UserInfo {
  id: string;
  name?: string;
  avatar?: string;
}

export const userAvatar = 'https://github.com/HsuanXyz/ionic3-chat/blob/master/src/assets/user.jpg?raw=true';
export const toUserAvatar = 'https://github.com/HsuanXyz/ionic3-chat/blob/master/src/assets/to-user.jpg?raw=true';

@Injectable()
export class ChatService {



  constructor(private http: HttpClient,
    private events: Events) {
  }

  mockNewMsg(msg) {
    const mockMsg: ChatMessage = {
      messageId: Date.now().toString(),
      userId: '210000198410281948',
      userName: 'Hancock',
      userAvatar: toUserAvatar,
      toUserId: '140000198202211138',
      time: Date.now(),
      message: msg.message,
      status: 'success'
    };

    setTimeout(() => {
      this.events.publish('chat:received', mockMsg, Date.now())
    }, Math.random() * 1800)
  }

  getMsgList(): Observable<ChatMessage[]> {
    const msgListUrl = 'https://raw.githubusercontent.com/HsuanXyz/ionic3-chat/master/src/assets/mock/msg-list.json';
    return this.http.get<any>(msgListUrl)
      .pipe(map(response => response.array.map(msg => ({
        ...msg,
        userAvatar: msg.userAvatar === './assets/user.jpg' ? userAvatar : toUserAvatar
      }))));
  }

  sendMsg(msg: ChatMessage) {
    return new Promise(resolve => setTimeout(() => resolve(msg), Math.random() * 1000))
      .then(() => this.mockNewMsg(msg));
  }

  getUserInfo(): Promise<UserInfo> {
    const userInfo: UserInfo = {
      id: '140000198202211138',
      name: 'Luff',
      avatar: userAvatar
    };
    return new Promise(resolve => resolve(userInfo));
  }

}
