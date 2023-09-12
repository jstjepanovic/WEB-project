import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ManageBoardGameComponent } from './components/manage-board-game/manage-board-game.component';
import { BrowseBoardGamesComponent } from './components/browse-board-games/browse-board-games.component';
import { BoardGameComponent } from './components/board-game/board-game.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { RouteGuard } from './route-guard';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "manage", component: ManageBoardGameComponent, canActivate:[RouteGuard] },
  { path: "browse", children: [{path: '', component: BrowseBoardGamesComponent}, {path: ':boardGameId', component: BoardGameComponent}] },
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent },
  { path: "profile/:userId", component: ProfileComponent, canActivate:[RouteGuard] },
  { path: "**", redirectTo: "home" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [RouteGuard]
})
export class AppRoutingModule { }
