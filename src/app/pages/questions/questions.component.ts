import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth } from '@firebase/auth';
import { Iquestion } from 'src/app/interface/iquestion';
import { QuestionDBService } from 'src/app/services/question-db.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent implements OnInit {
  constructor(private questionDB: QuestionDBService, private route:Router) {}
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
  respuesta="";
  puntaje=0;
/* button next question------------------------------------------------------------- */
  siguiente(){
    if(this.numeroDe_pregunta<=8){
      if(this.data[this.numeroDe_pregunta].rpta_correct===this.respuesta){
        this.puntaje++
      }
      this.numeroDe_pregunta++
      this.respuesta_visible=[];
      this.alternativas()
    }
    else{
      clearInterval(this.control)
      const user=getAuth().currentUser;
      if(user){
        this.questionDB.addRecord({
          email:user.email!,
          time:{
            min:this.min,
            seg:this.seg
          },
          score:this.puntaje
        })
      }

      Swal.fire({
        title:"Finalizado",
        icon:"info",
        text:`Su puntaje es ${this.puntaje}/10.`,
        timer:5000,
        timerProgressBar:true
      }).then(()=>{
        this.route.navigate(["/home"])
      })
    }
  }
/* marcar respuesta */
  marcar(rpta:string, este:HTMLDivElement){
    this.respuesta=rpta;
    const hermanos=document.querySelectorAll(`.alternativas`)
    hermanos.forEach(elemento=>{
      elemento.classList.remove("alternativa_marcada")
    })
    este.classList.add("alternativa_marcada")
  }
/* aleatorizar alternativas---------------------------------------------------------------- */
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
  seg=0;
  min=0;
  control!:NodeJS.Timer;
  /* cronometro------------------------------------------------------------------------- */
  iniciar(){
    this.control=setInterval(()=>{
      if(this.seg<59) this.seg++
      else{
        this.seg=0;
        this.min++
      }
    }, 1000)
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
      this.iniciar()
      console.log(this.data);
    });
  }
}
