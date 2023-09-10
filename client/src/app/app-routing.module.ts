import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ManageBoardGameComponent } from './components/manage-board-game/manage-board-game.component';
import { BrowseBoardGamesComponent } from './components/browse-board-games/browse-board-games.component';
import { BoardGameComponent } from './components/board-game/board-game.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { RouteGuard } from './route-guard';

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "manage", component: ManageBoardGameComponent, canActivate:[RouteGuard] },
  { path: "browse", component: BrowseBoardGamesComponent },
  { path: "browse/:boardGameId", component: BoardGameComponent },
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent },
  { path: "**", redirectTo: "home" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [RouteGuard]
})
export class AppRoutingModule { }
