import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { AuthService } from './auth.service';
import firebase from 'firebase/app';
import { v4 as uuid } from 'uuid';
import { Task } from '../models/task.model';
import { BoardMetadata } from '../models/board-metadata.model';
import { TaskListMetadata } from '../models/task-list-metadata.model';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  private firebaseUser: firebase.User | null = null;

  private boardsCollection: AngularFirestoreCollection<BoardMetadata>;
  private taskListsCollection: AngularFirestoreCollection<TaskListMetadata>;
  private tasksCollection: AngularFirestoreCollection<Task>;

  private DIFF_POS = 65536; // TODO: make a constant in another place

  constructor(private firestore: AngularFirestore, private authService: AuthService) {
    this.boardsCollection = this.firestore.collection('boards');
    this.taskListsCollection = this.firestore.collection('taskLists');
    this.tasksCollection = this.firestore.collection('tasks');

    // tslint:disable-next-line: deprecation
    this.authService.firebaseUserData.subscribe(firebaseUser => {
      this.firebaseUser = firebaseUser;
    });

  }

  public createBoardMetadata(name: string): Observable<BoardMetadata> {
    return from(
      new Promise<BoardMetadata>((resolve, reject) => {
        const firebaseUser = this.firebaseUser;

        if (firebaseUser == null) {
          return reject();
        }

        const boardId = uuid();

        const newBoardMetadata: BoardMetadata = {
          id: boardId,
          name,
          owner: firebaseUser.uid,
          admins: [firebaseUser.uid],
          members: [firebaseUser.uid],
          taskListsIds: []
        };

        this.boardsCollection.doc(boardId).set(newBoardMetadata).then(
          () => resolve(newBoardMetadata),
          () => reject()
        );
      })
    );
  }

  public readBoardMetadata(boardId: string): Observable<BoardMetadata> {
    return from(
      new Promise<BoardMetadata>((resolve, reject) => {
        this.boardsCollection.doc(boardId).get().forEach(boardSnapshot => {
          const boardData = boardSnapshot.data();

          if (!boardData) {
            return reject();
          }

          resolve(boardData);
        });
      })
    );
  }

  public updateBoardMetadata(
    boardId: string,
    boardUpdate: Partial<Pick<BoardMetadata, 'admins' | 'members' | 'name' | 'owner' | 'taskListsIds'>>
  ): Observable<BoardMetadata> {
    return from(
      new Promise<BoardMetadata>((resolve, reject) => {
        this.boardsCollection.doc(boardId).get().forEach(boardSnapshot => {
          const boardData = boardSnapshot.data();

          if (!boardData) {
            return reject();
          }

          boardSnapshot.ref.set(
            boardUpdate,
            { merge: true }
          ).then(
            () => resolve({ ...boardData, ...boardUpdate })
          );
        }).catch(
          () => reject()
        );
      })
    );
  }

  public deleteBoardMetadata(id: string): Observable<string> {
    return from(
      new Promise<string>((resolve, reject) => {
        const taskListSnapshotQuery = this.firestore.collection<TaskListMetadata>(
          'taskLists',
          ref => ref.where('boardId', '==', id)
        ).get();

        const taskListDeleting: Promise<void>[] = [];

        taskListDeleting.push(
          taskListSnapshotQuery.forEach(taskListReference => {
            taskListReference.forEach(taskListSnapshot => {
              const taskListData: TaskListMetadata = taskListSnapshot.data();
              const taskDeleting: Promise<void>[] = [];

              if (taskListData) {
                taskListData.tasksIds.forEach(taskId => taskDeleting.push(
                  this.tasksCollection.doc(taskId).delete())
                );
              }

              Promise.all(taskDeleting).then(
                () => taskListSnapshot.ref.delete()
              );
            });
          })
        );

        Promise.all(taskListDeleting).then(
          () => this.boardsCollection.doc(id).delete()
        ).then(
          () => resolve(id)
        ).catch(
          () => reject()
        );

      })
    );
  }

  public createTaskList(boardMetadata: BoardMetadata, name: string): Observable<TaskListMetadata> {
    return from(
      new Promise<TaskListMetadata>((resolve, reject) => {
        const newTaskList: TaskListMetadata = {
          id: uuid(),
          name,
          tasksIds: [],
          boardId: boardMetadata.id,
          pos: (boardMetadata.taskListsIds.length + 1) * this.DIFF_POS,
        };

        this.taskListsCollection.doc(newTaskList.id).set(newTaskList).then(
          () => resolve(newTaskList),
          () => reject()
        );
      })
    );
  }

  public readTaskList(taskListId: string): Observable<TaskListMetadata> {
    return from(
      new Promise<TaskListMetadata>((resolve, reject) => {
        this.taskListsCollection.doc(taskListId).get().forEach(taskListSnapshot => {
          const taskListData = taskListSnapshot.data();

          if (!taskListData) {
            return reject();
          }

          resolve(taskListData);
        });
      })
    );
  }

  public updateTaskList(
    taskListId: string,
    taskListUpdate: Partial<Pick<TaskListMetadata, 'name' | 'pos'>>
  ): Observable<TaskListMetadata> {
    return from(
      new Promise<TaskListMetadata>((resolve, reject) => {
        this.taskListsCollection.doc(taskListId).get().forEach(taskListSnapshot => {
          const taskListData = taskListSnapshot.data();

          if (!taskListData) {
            return reject();
          }

          taskListSnapshot.ref.set(
            taskListUpdate,
            { merge: true }
          ).then(
            () => resolve({ ...taskListData, ...taskListUpdate })
          );
        }).catch(
          () => reject()
        );
      })
    );
  }

  public deleteTaskList(taskListId: string): Observable<TaskListMetadata> {
    return from(
      new Promise<TaskListMetadata>((resolve, reject) => {
        this.taskListsCollection.doc(taskListId).get().toPromise().then(taskListSnapshot => {
          const taskListData = taskListSnapshot.data();

          if (!taskListData) {
            return reject();
          }

          const tasksDeleting: Promise<void>[] = [];

          taskListData.tasksIds.forEach(taskId => {
            tasksDeleting.push(this.tasksCollection.doc(taskId).delete());
          });

          Promise.all(tasksDeleting).then(
            () => taskListSnapshot.ref.delete()
          ).then(
            () => this.boardsCollection.doc(taskListData.boardId).get().forEach(boardSnapshot => {
              const boardData = boardSnapshot.data();

              if (!boardData) {
                return reject();
              }

              boardSnapshot.ref.set({
                taskListsIds: boardData.taskListsIds.filter(id => id !== taskListData.id)
              }, {
                merge: true
              });
            })
          ).then(
            () => resolve(taskListData)
          ).catch(
            () => reject()
          );
        });
      })
    );
  }

  public createTask(listId: string, title: string, description: string): Observable<Task> {
    return from(
      new Promise<Task>((resolve, reject) => {
        this.taskListsCollection.doc(listId).get().forEach(taskListSnapshot => {
          const taskListData = taskListSnapshot.data();

          if (!taskListData) {
            return reject();
          }

          const newTask: Task = {
            id: uuid(),
            title,
            listId,
            description,
            pos: taskListData.tasksIds.length * this.DIFF_POS
          };

          this.tasksCollection.doc(newTask.id).set(newTask).then(
            () => {
              taskListData.tasksIds.push(newTask.id);
              taskListSnapshot.ref.set({
                tasksIds: [...taskListData.tasksIds, newTask.id]
              }, {
                merge: true
              });
            }
          ).then(
            () => resolve(newTask)
          );
        }).catch(
          () => reject()
        );
      })
    );
  }

  public deleteTask(taskId: string): Observable<Task> {
    return from(
      new Promise<Task>((resolve, reject) => {
        this.tasksCollection.doc(taskId).get().forEach(taskSnapshot => {
          const taskData = taskSnapshot.data();

          if (!taskData) {
            return reject();
          }

          this.taskListsCollection.doc(taskData.listId).get().forEach(taskListSnapshot => {
            const taskListData = taskListSnapshot.data();

            if (!taskListData) {
              return reject();
            }

            taskListSnapshot.ref.set({
              tasksIds: taskListData.tasksIds.filter(id => id !== taskData.id)
            }, {
              merge: true
            }).then(
              () => taskSnapshot.ref.delete()
            ).then(
              () => resolve(taskData)
            );
          });
        });
      })
    );
  }

  public updateTask(
    taskId: string,
    taskUpdate: Partial<Pick<Task, 'description' | 'listId' | 'title' | 'pos'>>
  ): Observable<Task> {
    return from(
      new Promise<Task>((resolve, reject) => {
        this.tasksCollection.doc(taskId).get().forEach(taskSnapshot => {
          const taskData = taskSnapshot.data();

          if (!taskData) {
            return reject();
          }

          taskSnapshot.ref.set(
            taskUpdate,
            { merge: true }
          ).then(
            () => resolve({ ...taskData, ...taskUpdate })
          );
        }).catch(
          () => reject()
        );
      })
    );
  }

  public readTask(taskId: string): Observable<Task> {
    return from(
      new Promise<Task>((resolve, reject) => {
        this.tasksCollection.doc(taskId).get().forEach(taskSnapshot => {
          const taskData = taskSnapshot.data();

          if (!taskData) {
            return reject();
          }

          resolve(taskData);
        });
      })
    );
  }

}
