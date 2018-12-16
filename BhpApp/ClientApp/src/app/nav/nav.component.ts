import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../shared/services/user.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'bhp-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy  {

  status: boolean;
  userName: string;
  subscription: Subscription;
  nameSubscription: Subscription;

  constructor(private _userService: UserService) { }

  ngOnInit() {
    this.subscription = this._userService.authNavStatus$.subscribe(status => this.status = status);
    this.nameSubscription = this._userService.authNavUsername$.subscribe(userName => this.userName = userName);
  }

  ngOnDestroy() {
    // prevent memory leak when component is destroyed
    this.subscription.unsubscribe();
    this.nameSubscription.unsubscribe();
  }

  logout() {
    this._userService.logout();
  }

}
