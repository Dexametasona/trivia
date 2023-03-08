import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form= new FormGroup({
    name: new FormControl('',[Validators.required, Validators.minLength(5)]),
    pass: new FormControl('',[Validators.required, Validators.minLength(4)])
  });
  alert=false;
  mensaje='Formulario enviado'
  constructor() { }
  consolear(){
    this.alert=true;

    setTimeout(() => {
      this.alert=false;
    }, 2000);

  }

}
