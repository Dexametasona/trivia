import { Component, OnInit } from '@angular/core';
import { Iquestion } from 'src/app/interface/iquestion';
import { QuestionDBService } from 'src/app/services/question-db.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent implements OnInit {
  constructor(private questionDB: QuestionDBService) {}
  data: Iquestion[] = [
    {
      category: '',
      dificultad: '',
      question: '',
      rpta_correct: '',
      rpta_incorrect: ['', '', '', ''],
    },
  ];
  respuesta_visible: string[] = [];
  numeroDe_pregunta=0;

  alternativas(){
    this.respuesta_visible.push(this.data[this.numeroDe_pregunta].rpta_correct);
      this.respuesta_visible = this.respuesta_visible.concat(
        this.data[this.numeroDe_pregunta].rpta_incorrect
      );
      for (let i = 0; i < 5; i++) {
          this.respuesta_visible.sort(() => {
            return Math.random() - 0.5;
          });
      }
  }
  ngOnInit(): void {
    this.questionDB.getQuestions().subscribe((data) => {
      /* filtro de categoria------------------------------------------------------ */
      if (this.questionDB.categoria !== 'todos') {
        this.data = data.filter(
          (question) => question.category == this.questionDB.categoria
        );
      } else {
        this.data = data;
      }

      /* filtro de dificultad--------------------------------------------------------- */
      if (this.questionDB.dificultad == 'facil') {
        this.data = this.data.filter(
          (question) => question.dificultad == 'facil'
        );
      } else if (this.questionDB.dificultad == 'media') {
        this.data = this.data.filter(
          (question) =>
            question.dificultad == 'facil' || question.dificultad == 'media'
        );
      } else {
        this.data = this.data.filter(
          (question) =>
            question.dificultad == 'dificil' || question.dificultad == 'media'
        );
      }

      /* ajuste de tamaño del array----------------------------------------------------------- */
      while (this.data.length > 10) {
        let deleted = Math.floor(Math.random() * 10);
        this.data.splice(deleted, 1);
      }
      /* aleatorizar alternativas------------------------------------------------------------------ */
      this.alternativas()
      console.log(this.data);
    });
  }
}
