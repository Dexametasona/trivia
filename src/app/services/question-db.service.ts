import { Injectable } from '@angular/core';
import { addDoc, collectionData, Firestore } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { Iquestion } from '../interface/iquestion';

@Injectable({
  providedIn: 'root'
})
export class QuestionDBService {

  constructor(private firestore:Firestore) { }
  dificultad="";
  categoria="";
  addquestion(question:Iquestion){
    const dataQuestion=collection(this.firestore, "trivia_question")
    return addDoc(dataQuestion, question)
  }

  getQuestions():Observable<Iquestion[]>{
    const dataRef=collection(this.firestore, 'trivia_question')
    return collectionData(dataRef, {idField:"id"}) as Observable<Iquestion[]>
  }
}
