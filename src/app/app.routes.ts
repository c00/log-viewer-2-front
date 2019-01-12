import { Routes } from '@angular/router';

import { HistoryComponent } from './pages/history/history.component';
import { HomeComponent } from './pages/home/home.component';
import { LiveComponent } from './pages/live/live.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { StatsComponent } from './pages/stats/stats.component';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: ':id/live', component: LiveComponent },
  { path: ':id/stats', component: StatsComponent },
  { path: ':id/history', component: HistoryComponent },
  { path: '**', component: NotFoundComponent },
]