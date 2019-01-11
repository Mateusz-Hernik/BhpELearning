import { AccountModule } from './account/account.module';
import { BrowserModule } from '@angular/platform-browser';
import { DashboardModule } from './dashboard/dashboard.module';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CourseInfoComponent } from './course-info/course-info.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LoaderComponent } from './loader/loader.component';
import { NavComponent } from './nav/nav.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { ConfigService } from './shared/services/config.service';
import { CourseService } from './shared/services/course.service';
import { ShopCartService } from './shared/services/shop-cart.service';

import { routing } from './app.routing';
import { httpInterceptorProviders } from './shared/providers/interceptors.provider';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    FooterComponent,
    LoaderComponent,
    CourseInfoComponent,
    PageNotFoundComponent
  ],
  imports: [
    AccountModule,
    BrowserModule,
    DashboardModule,
    HttpClientModule,
    routing
  ],
  providers: [
    ConfigService,
    httpInterceptorProviders,
    CourseService,
    ShopCartService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
