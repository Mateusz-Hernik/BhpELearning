import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { AccountModule } from './account/account.module';
import { HttpClientModule } from '@angular/common/http';
import { ConfigService } from './shared/services/config.service';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    FooterComponent
  ],
  imports: [
    AccountModule,
    BrowserModule,
    HttpClientModule,
    routing
  ],
  providers: [ConfigService],
  bootstrap: [AppComponent]
})
export class AppModule { }
