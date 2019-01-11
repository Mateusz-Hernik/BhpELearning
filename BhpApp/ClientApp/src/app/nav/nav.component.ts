import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { UserService } from '../shared/services/user.service';
import { ShopCartService } from '../shared/services/shop-cart.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'bhp-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy  {

  status: boolean;
  subscription: Subscription;
  cartOrderAmount: number;
  subscriptionShopCartAmount: Subscription;

  constructor(
    private _userService: UserService,
    private _shopCartService: ShopCartService) { }

  ngOnInit() {
    this.subscription = this._userService.authNavStatus$.subscribe(status => this.status = status);
    this.subscriptionShopCartAmount = this._shopCartService.shopCartAmountStatus$.subscribe(newAmount => this.cartOrderAmount = newAmount);
  }

  ngOnDestroy() {
    // prevent memory leak when component is destroyed
    this.subscription.unsubscribe();
    this.subscriptionShopCartAmount.unsubscribe();
  }

  logout() {
    this._userService.logout();
  }

}
