import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { filter } from 'rxjs';
import { FilterComponent } from './pages/filter/filter.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { QuestionsComponent } from './pages/questions/questions.component';

const routes: Routes = [
  {path:"home", component:HomeComponent},
  {path:"filter", component:FilterComponent},
  {path:"login", component:LoginComponent},
  {path:"question", component:QuestionsComponent},
  {path:"lost", component:NotFoundComponent},
  {path:"", redirectTo:"/home", pathMatch:'full'},
  {path:"**", component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
