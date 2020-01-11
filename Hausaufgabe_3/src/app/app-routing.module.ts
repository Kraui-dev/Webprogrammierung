import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameLogicComponent } from './game-logic/game-logic.component';
import { LoginComponent } from './login/login.component'; 


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'game', component: GameLogicComponent },
  { path: '', redirectTo: '/game', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
