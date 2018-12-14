import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { ApiService } from '../services/api';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { LoaderComponent } from './components/loader/loader.component';
import { InlineSVGModule } from 'ng-inline-svg';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    ModalModule.forRoot(),
    CollapseModule.forRoot(),
    InlineSVGModule.forRoot({ baseUrl: '/assets/svg/' }),
  ],
  providers: [
    ApiService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
