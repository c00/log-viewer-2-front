import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { InlineSVGModule } from 'ng-inline-svg';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';

import { ApiService } from '../services/api';
import { LogService } from '../services/logService';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { LoaderComponent } from './components/loader/loader.component';
import { LogRowComponent } from './components/log-row/log-row.component';
import { SqlMessageComponent } from './components/sql-message/sql-message.component';
import { XdebugMessageComponent } from './components/xdebug-message/xdebug-message.component';
import { LogLevelPipe } from './log-level.pipe';
import { HistoryComponent } from './pages/history/history.component';
import { HomeComponent } from './pages/home/home.component';
import { LiveComponent } from './pages/live/live.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { LevelFilterComponent } from './components/level-filter/level-filter.component';

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
    LevelFilterComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    TimepickerModule.forRoot(),
    ButtonsModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    ModalModule.forRoot(),
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    InlineSVGModule.forRoot({ baseUrl: '/assets/svg/' }),
  ],
  providers: [
    ApiService,
    LogService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
