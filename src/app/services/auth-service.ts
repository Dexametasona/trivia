import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential } from '@angular/fire/auth';
import { Iform } from '../interface/iform';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth:Auth) { }

  registUser(form:Iform):Promise<UserCredential>{
    return createUserWithEmailAndPassword(this.auth, form.email, form.password)
  }

  logIn(form:Iform){
    return signInWithEmailAndPassword(this.auth, form.email, form.password)
  }

}
