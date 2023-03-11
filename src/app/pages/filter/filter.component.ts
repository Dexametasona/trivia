import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionDBService } from 'src/app/services/question-db.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit{
  constructor(private question:QuestionDBService, private location:Location, private route:Router){}

  back(){
    this.location.back()
  }

  comenzar(dificultad:string, categoria:string){
    this.question.dificultad=dificultad;
    this.question.categoria=categoria
    this.route.navigate(['/question'])
  }
  ngOnInit(): void {

  }
}
