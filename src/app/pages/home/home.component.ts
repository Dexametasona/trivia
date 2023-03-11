import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Auth, getAuth, onAuthStateChanged, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  logStatus = false;
  currentUser!: string;

  @ViewChild('user') lista!: ElementRef;
  constructor(private route: Router, private auth: Auth) {}

  toLogin() {
    this.route.navigate(['/login']);
  }

  toFilter() {
    this.route.navigate(['/filter']);
  }

  userOption() {
    this.lista.nativeElement.classList.toggle('desplegar');
  }

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
  }
}
