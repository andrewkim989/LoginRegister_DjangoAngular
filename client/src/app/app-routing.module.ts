import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogregComponent } from './logreg/logreg.component';
import { HomeComponent } from './home/home.component';
import { LogoutComponent } from './logout/logout.component';

const routes: Routes = [
  { path: "", component: LogregComponent },
  { path: "home", component: HomeComponent },
  { path: "logout", component: LogoutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
