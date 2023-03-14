import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Auth, onAuthStateChanged, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Iquestion } from 'src/app/interface/iquestion';
import { Irecord } from 'src/app/interface/irecord';
import { QuestionDBService } from 'src/app/services/question-db.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  logStatus = false;
  currentUser!: string;
  dataRecord: Irecord[] = [{ email: '', score: 0, time: { min: 0, seg: 0 } }];

  @ViewChild('user') lista!: ElementRef;
  constructor(
    private route: Router,
    private auth: Auth,
    private recordDB: QuestionDBService
  ) {}
  /* botones de redireccion para login y register-------------------------------------------------- */
  toLogin() {
    this.route.navigate(['/login']);
  }

  toFilter() {
    this.route.navigate(['/filter']);
  }
  /* boton para iniciar el juego-------------------------------------------------------------------------- */
  userOption() {
    this.lista.nativeElement.classList.toggle('desplegar');
  }
  /* cerrar sesión---------------------------------------------------------------------------- */
  logOut() {
    signOut(this.auth)
      .then((res) => {
        console.log('sesión cerrada con exito');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  ngOnInit(): void {
    /* ver usuario activo------------------------------------------------------------------- */
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.logStatus = true;
        this.currentUser = user.displayName!;
        console.log('Usuario en línea.');
      } else {
        this.logStatus = false;
        this.currentUser = '';
        console.log('No hay usuario en línea.');
      }
    });
    /* descargar record--------------------------------------------------------------------------- */
    this.recordDB.getRecord().subscribe((record) => {
      let record_ordenado = record.sort((a: Irecord, b: Irecord) => {
        if (a.score > b.score) return -1;
        else if (a.score < b.score) return +1;
        else {
          if (a.time.min < b.time.min) return -1;
          else if (a.time.min > b.time.min) return +1;
          else {
            if (a.time.seg < b.time.seg) return -1;
            else if (a.time.seg > b.time.seg) return +1;
            else return 0;
          }
        }
      });
      this.dataRecord = record_ordenado.slice(0, 5);
    });
  }
}
