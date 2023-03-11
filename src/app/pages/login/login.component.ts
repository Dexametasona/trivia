import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import { getAuth, updateProfile } from '@angular/fire/auth';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Iform } from 'src/app/interface/iform';
import { AuthService } from 'src/app/services/auth-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private location: Location, private auth: AuthService, private route:Router) {}
  /* formulario login---------------------------- */
  form = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(50),
      Validators.pattern('^[a-zA-ZÀ-ÿ0-9.-_]+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$'),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(8),
    ]),
  });

  /* formulario registrar-------------------------- */
  formRegister = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern('^[a-zA-ZÀ-ÿ0-9.-_]+$'),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(50),
      Validators.pattern('^[a-zA-ZÀ-ÿ0-9.-_]+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$'),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(8),
    ]),
  });

  /* mensaje de registro-------------------------------- */

  alert = false;
  mensaje!: string;

  respuesta(mensaje: string) {
    this.alert = true;
    this.mensaje = mensaje;
    setTimeout(() => {
      this.alert = false;
    }, 2000);
  }
  /* registrar nuevo usaurios------------------------------------------------------------------------- */
  registrar() {
    this.auth
      .registUser(this.formRegister.value as Iform)
      .then((usercredential) => {
        updateProfile(usercredential.user, {
          displayName: this.formRegister.value.name,
        });
        this.route.navigate(["/home"])
      })
      .catch(() => {
        this.respuesta('Error, este correo ya fue registrado.');
      });
  }

  /* iniciar sesion---------------------------------------------------------------------------------- */
  logearse() {
    this.auth.logIn(this.form.value as Iform)
    .then(()=>{
      this.route.navigate(["/home"])
    })
    .catch((err:FirebaseError)=>{
      if(err.code==='auth/user-not-found') this.respuesta("Correo no registrado.")
      else if(err.code==='auth/wrong-password') this.respuesta("Contraseña incorrecta.")
      else console.log(err)
    });
  }
  mostrar() {
    const auth = getAuth();
    const user = auth.currentUser;
    console.log(user);
  }
  /* boton regresar--------------------------------- */
  back() {
    this.location.back();
  }
}
