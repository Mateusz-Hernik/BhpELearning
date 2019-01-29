import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { CourseInfoComponent } from './nav-items/course-info/course-info.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ShopCartComponent } from './shop-cart/shop-cart.component';
import { BhpTrainingComponent } from './nav-items/bhp-training/bhp-training.component';
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

const appRoutes: Routes = [
  { path: '', component: HomeComponent },

  { path: 'szkoleniabhp', component: BhpTrainingComponent },
  { path: 'opracowywanieorz', component: OrzDevelopingComponent },
  { path: 'kontrole', component: ControlsComponent },
  { path: 'doborsrodkow', component: FoundsChoiceComponent },
  { path: 'nadzor', component: SupervisionComponent },
  { path: 'opracowywaniewpp', component: WppDevelopingComponent },
  { path: 'opracowywaniebioz', component: BiozDevelopingComponent },
  { path: 'outsourcing', component: OutsourcingComponent },

  { path: 'szkolenieppoz', component: PpozTutorialComponent },
  { path: 'opracowywanieinstrukcjibp', component: BpInstructionComponent },
  { path: 'nadzorppoz', component: PpozSupervisionComponent },

  { path: 'kurs/:id', component: CourseInfoComponent },
  { path: 'instrukcja', component: InstructionComponent },

  { path: 'cennik/uslugibhp', component: BhpServicePriceComponent },
  { path: 'cennik/uslugippoz', component: PpozServicePriceComponent },

  { path: 'onas', component: AboutComponent },
  { path: 'rodo', component: RodoComponent },
  { path: 'regulamin', component: RegulationsComponent },

  { path: 'not-found', component: PageNotFoundComponent },
  { path: 'koszyk', component: ShopCartComponent },
  { path: 'account', loadChildren: './account/account.module#AccountModule' },
  { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, {onSameUrlNavigation: 'reload'});
