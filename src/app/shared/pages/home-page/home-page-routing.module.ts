import { NgModule } from "@angular/core";
import HomePageComponent from './home-page.component';
import { RouterModule } from "@angular/router";

const routes = [
  {
    path: '',
    component: HomePageComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class HomePageRoutingModule{}
