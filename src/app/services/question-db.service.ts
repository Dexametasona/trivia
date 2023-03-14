import { Injectable } from '@angular/core';
import { addDoc, collectionData, Firestore } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { Iquestion } from '../interface/iquestion';
import { Irecord } from '../interface/irecord';

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

  addRecord(record:Irecord){
    const recordDataRef=collection(this.firestore, "list_record");
    return addDoc(recordDataRef, record)
  }

  getRecord():Observable<Irecord[]>{
    const dataRef=collection(this.firestore, "list_record");
    return collectionData(dataRef, {idField:"id"}) as Observable<Irecord[]>
  }
}
