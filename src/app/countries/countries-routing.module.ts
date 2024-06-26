import { NgModule } from '@angular/core';

import { ByCapitalPagesComponent } from './pages/by-capital-pages/by-capital-pages.component';
import { ByCountryPagesComponent } from './pages/by-country-pages/by-country-pages.component';
import { ByRegionPagesComponent } from './pages/by-region-pages/by-region-pages.component';
import { CountryPageComponent } from './pages/country-page/country-page.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ByCapitalPagesComponent
  },
  {
    path: 'by-capital',
    component: ByCapitalPagesComponent,
  },
  {
    path: 'by-country',
    component: ByCountryPagesComponent,
  },
  {
    path: 'by-region',
    component: ByRegionPagesComponent,
  },
  {
    path: 'by/:id',
    component: CountryPageComponent,
  },
  {
    path: '**',
    redirectTo: 'by-capital'
  }

]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
})
export class CountriesRoutingModule { }
