import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MessageService } from '../shared/services/message.service';

import { Message } from '../shared/models/message.interface';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  message: Message;

  constructor(private _mssageService: MessageService,
    private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.loadMessage();
    this.changeMessageReadStatus();
  }

  private loadMessage() {
    this._activatedRoute.params.subscribe(params => {
      this._mssageService.getMessage(params['id'])
        .subscribe((res: Message) => {
          this.message = res;
        });
    });
  }

  private changeMessageReadStatus() {
    this._activatedRoute.params.subscribe(params => {
      this._mssageService.changeMessageReadStatus(params['id'])
        .subscribe();
    });
  }

}
