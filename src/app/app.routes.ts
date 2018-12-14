import { Routes } from "@angular/router";
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  /* { path: 'item/:id', component: ItemComponent },
  { path: '@/:stub', component: ProfileComponent }, */
  { path: '**', component: NotFoundComponent },
]