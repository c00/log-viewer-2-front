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
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { LogService } from '../services/logService';
import { HistoryComponent } from './pages/history/history.component';
import { LiveComponent } from './pages/live/live.component';
import { LogRowComponent } from './components/log-row/log-row.component';
import { LogLevelPipe } from './log-level.pipe';
import { XdebugMessageComponent } from './components/xdebug-message/xdebug-message.component';
import { SqlMessageComponent } from './components/sql-message/sql-message.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    LoaderComponent,
    HistoryComponent,
    LiveComponent,
    LogRowComponent,
    LogLevelPipe,
    XdebugMessageComponent,
    SqlMessageComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    ModalModule.forRoot(),
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot(),
    InlineSVGModule.forRoot({ baseUrl: '/assets/svg/' }),
  ],
  providers: [
    ApiService,
    LogService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
