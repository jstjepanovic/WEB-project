import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './components/home/home.component';
import { ManageBoardGameComponent } from './components/manage-board-game/manage-board-game.component';
import { BrowseBoardGamesComponent } from './components/browse-board-games/browse-board-games.component';
import { AppendStringPipe } from './pipes/append-string.pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { BoardGameComponent } from './components/board-game/board-game.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from './auth-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ManageBoardGameComponent,
    BrowseBoardGamesComponent,
    AppendStringPipe,
    FilterPipe,
    BoardGameComponent,
    RegisterComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
