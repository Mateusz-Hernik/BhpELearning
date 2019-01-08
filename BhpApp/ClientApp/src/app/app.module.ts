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
import { LoaderComponent } from './loader/loader.component';
import { httpInterceptorProviders } from './shared/providers/interceptors.provider';
import { DashboardModule } from './dashboard/dashboard.module';
import { CourseService } from './shared/services/course.service';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    FooterComponent,
    LoaderComponent
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
    CourseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
