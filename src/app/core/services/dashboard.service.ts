import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  db: firebase.firestore.Firestore;

  constructor() {
    this.db = firebase.firestore();
  }

  getBoardInfo(): void {
    this.db.collection('boards').get().then(snapshot => {
      snapshot.forEach(doc => {
        console.log(doc.data().taskGroups.forEa);
      });
    });
  }
}
