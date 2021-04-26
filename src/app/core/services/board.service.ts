import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { BoardPreview } from '../models/board-preview.model';
import { User } from '../models/user.model';
import { AuthService } from './auth.service';
import firebase from 'firebase/app';
import { TaskList } from '../models/task-list.model';
import { BoardContent } from '../models/board-content.model';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  private firebaseUser: firebase.User | null = null;
  private userDocRef: AngularFirestoreDocument<User> | null = null;

  private usersCollection: AngularFirestoreCollection<User>;
  private boardsCollection: AngularFirestoreCollection<BoardPreview>;
  private boardContentCollection: AngularFirestoreCollection<BoardContent>;

  constructor(private firestore: AngularFirestore, private authService: AuthService) {
    this.usersCollection = this.firestore.collection('users');
    this.boardsCollection = this.firestore.collection('boards');
    this.boardContentCollection = this.firestore.collection('taskLists');

    // tslint:disable-next-line: deprecation
    this.authService.firebaseUserData.subscribe(firebaseUser => {
      this.firebaseUser = firebaseUser;
      if (this.firebaseUser) {
        this.userDocRef = this.usersCollection.doc(this.firebaseUser.uid);
      }
    });

  }

  public createBoard(name: string): Observable<BoardPreview> {
    return from(
      new Promise<BoardPreview>((resolve, reject) => {
        const firebaseUser = this.firebaseUser;
        const userDocRef = this.userDocRef;

        if (firebaseUser && userDocRef) {
          const boardId = this.firestore.createId();

          const board: BoardPreview = {
            id: boardId,
            name,
            owner: firebaseUser.uid,
            admins: [firebaseUser.uid],
            members: [firebaseUser.uid],
            boardContentId: boardId
          };
          this.boardsCollection.doc(boardId).set(board).then(
            () => {

              userDocRef.get().forEach(userDocSnapshot => {
                const userData = userDocSnapshot.data();

                if (userData) {
                  const boardsIds = userData.idBoards || [];
                  userDocRef.update({
                    idBoards: [...boardsIds, boardId]
                  }).then(() => resolve(board));
                } else {
                  reject();
                }
              });
            }
          ).catch(
            (reason) => {
              this.boardsCollection.doc(boardId).delete();
              reject(reason);
            }
          );
        } else {
          reject();
        }
      })
    );
  }

  public deleteBoard(id: string): Observable<boolean> {
    return from(
      new Promise<boolean>((resolve, reject) => {
        this.boardsCollection.doc(id).delete().then(
          () => resolve(true),
          () => reject(false)
        );
      })
    );
  }

  public loadBoard(boardId: string): Observable<BoardContent> {
    return from(
      new Promise<BoardContent>((resolve, reject) => {
        this.boardContentCollection.doc(boardId).get().forEach(boardContentDocSnapshot => {
          if (boardContentDocSnapshot.exists) {
            const boardContentData = boardContentDocSnapshot.data();
            if (boardContentData) {
              resolve(boardContentData);
            }
          } else {
            const newBoardContent = {
              id: boardId,
              taskLists: []
            };

            boardContentDocSnapshot.ref.set(newBoardContent);
            resolve(newBoardContent);
          }
        }).catch((reason) => reject(reason));
      })
    );
  }

  public loadPreviewBoardList(): Observable<BoardPreview[]> {
    return from(
      new Promise<BoardPreview[]>((resolve, reject) => {
        const userDocRef = this.userDocRef;

        if (userDocRef) {
          let boardList: BoardPreview[] = [];

          userDocRef.get().forEach(userDocSnapshot => {
            const userData = userDocSnapshot.data();
            const promises: Promise<void>[] = [];
            if (userData) {
              userData.idBoards.forEach(boardId => {
                promises.push(
                  this.boardsCollection.doc(boardId).get().forEach(boardDocSnapshot => {
                    const boardData = boardDocSnapshot.data();
                    if (boardData) {
                      boardList = [...boardList, boardData];
                    }
                  })
                );
              });
              Promise.all(promises).then(() => resolve(boardList));
            }
          }).catch(reason => reject(reason));
        } else {
          reject();
        }
      })
    );
  }

  public updateBoardContent(boardContent: BoardContent): Observable<BoardContent> {
    return from(
      new Promise<BoardContent>((resolve, reject) => {
        this.boardContentCollection.doc(boardContent.id).update({
          taskLists: boardContent.taskLists
        }).then(
          () => resolve(boardContent),
          errorMessage => reject({ errorMessage })
        );
      })
    );
  }
}
