import { Component, OnInit } from '@angular/core';

import { DashboardService } from '../shared/services/dashboard.service';
import { MessageService } from '../shared/services/message.service';

import { Message } from '../shared/models/message.interface';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  messages: Message[] = [];

  constructor(private _dashboardService: DashboardService,
    private _messageService: MessageService) { }

  ngOnInit() {
    this.getMessages();
  }

  getMessages() {
    this._messageService.getAllUserMessages(localStorage.getItem('user_name'))
      .subscribe((res: Message[]) => {
        this.messages = res;
      });
  }

  deleteMessage(id: number) {
    this._messageService.deleteMessage(id)
      .subscribe(() => {
        this. messages = this.messages.filter(x => x.id !== id);
        this._dashboardService.getActivityInfo(localStorage.getItem('user_name'))
          .subscribe();
      });
  }
}
