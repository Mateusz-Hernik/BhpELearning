import { AccountModule } from './account/account.module';
import { BrowserModule } from '@angular/platform-browser';
import { DashboardModule } from './dashboard/dashboard.module';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CourseInfoComponent } from './nav-items/course-info/course-info.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LoaderComponent } from './loader/loader.component';
import { NavComponent } from './nav/nav.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ShopCartComponent } from './shop-cart/shop-cart.component';

import { ConfigService } from './shared/services/config.service';
import { CourseService } from './shared/services/course.service';
import { ShopCartService } from './shared/services/shop-cart.service';

import { routing } from './app.routing';
import { httpInterceptorProviders } from './shared/providers/interceptors.provider';
import { BhpTrainingComponent } from './nav-items/bhp-training/bhp-training.component';
import { RightSidebarComponent } from './right-sidebar/right-sidebar.component';
import { OrzDevelopingComponent } from './nav-items/orz-developing/orz-developing.component';
import { ControlsComponent } from './nav-items/controls/controls.component';
import { FoundsChoiceComponent } from './nav-items/founds-choice/founds-choice.component';
import { SupervisionComponent } from './nav-items/supervision/supervision.component';
import { WppDevelopingComponent } from './nav-items/wpp-developing/wpp-developing.component';
import { BiozDevelopingComponent } from './nav-items/bioz-developing/bioz-developing.component';
import { OutsourcingComponent } from './nav-items/outsourcing/outsourcing.component';
import { PpozTutorialComponent } from './nav-items/ppoz-tutorial/ppoz-tutorial.component';
import { BpInstructionComponent } from './nav-items/bp-instruction/bp-instruction.component';
import { PpozSupervisionComponent } from './nav-items/ppoz-supervision/ppoz-supervision.component';
import { InstructionComponent } from './nav-items/instruction/instruction.component';
import { RegulationsComponent } from './nav-items/regulations/regulations.component';
import { RodoComponent } from './nav-items/rodo/rodo.component';
import { AboutComponent } from './nav-items/about/about.component';
import { BhpServicePriceComponent } from './nav-items/bhp-service-price/bhp-service-price.component';
import { PpozServicePriceComponent } from './nav-items/ppoz-service-price/ppoz-service-price.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    FooterComponent,
    LoaderComponent,
    CourseInfoComponent,
    PageNotFoundComponent,
    ShopCartComponent,
    BhpTrainingComponent,
    RightSidebarComponent,
    OrzDevelopingComponent,
    ControlsComponent,
    FoundsChoiceComponent,
    SupervisionComponent,
    WppDevelopingComponent,
    BiozDevelopingComponent,
    OutsourcingComponent,
    PpozTutorialComponent,
    BpInstructionComponent,
    PpozSupervisionComponent,
    InstructionComponent,
    RegulationsComponent,
    RodoComponent,
    AboutComponent,
    BhpServicePriceComponent,
    PpozServicePriceComponent
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
