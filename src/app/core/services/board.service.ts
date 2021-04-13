import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { BoardCard } from '../models/board-card.model';
import { BoardList } from '../models/board-list.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  usersCollection: AngularFirestoreCollection; // TODO: add type
  boardListCollection: AngularFirestoreCollection<{ name: string }>;
  userDocumentReference: AngularFirestoreDocument; // TODO: add type

  constructor(private firestore: AngularFirestore, private authService: AuthService) {
    this.usersCollection = firestore.collection('users');
    this.boardListCollection = firestore.collection('boardList');

    this.userDocumentReference = this.usersCollection.doc(authService.userData?.uid);

    this.userDocumentReference
      .get()
      .pipe(
        map(doc => {
          if (!doc.exists) {
            this.usersCollection
              .doc(authService.userData?.uid)
              .set({ availableBoards: [] }); // TODO: i'm not sure that I can set property manually
          }
        })
      );
  }

  loadBoardList(): Observable<BoardList | []> {
    return from(
      new Promise<BoardList>((resolve, reject) => {
        const boardList: BoardList = {
          boards: []
        };

        this.boardListCollection.get().forEach(querySnapshot => {
          querySnapshot.forEach(doc => boardList.boards.push({ name: doc.data().name, uid: doc.id }));
        });

        resolve(boardList);
      }).then(
        boardList => boardList,
        error => error
      )
    );
  }

  createBoard(name: string): Observable<BoardCard> {
    return from(
      new Promise<BoardCard>((resolve, reject) => {
        this.boardListCollection
          .add({ name })
          .then(
            docRef => docRef.get().then(docSnapshot => resolve({ name: docSnapshot.data()?.name, uid: docSnapshot.id })),
            error => reject(error)
          );
      })
    );
  }

  deleteBoard(uid: string): Observable<boolean> {
    return from(
      new Promise<boolean>((resolve, reject) => {
        this.boardListCollection
          .doc(uid)
          .delete().then(
            () => resolve(true),
            () => reject(false)
          );
      })
    );
  }

}
