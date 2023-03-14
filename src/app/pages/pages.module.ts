import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { FilterComponent } from './filter/filter.component';
import { QuestionsComponent } from './questions/questions.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TimePipe } from '../pipes/time.pipe';



@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    FilterComponent,
    QuestionsComponent,
    NotFoundComponent,
    TimePipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports:[
    HomeComponent,
    LoginComponent,
    FilterComponent,
    QuestionsComponent,
    NotFoundComponent
  ]
})
export class PagesModule { }
