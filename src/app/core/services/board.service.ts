import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { AuthService } from './auth.service';
import firebase from 'firebase/app';
import { v4 as uuid } from 'uuid';
import { Task } from '../models/task.model';
import { BoardMetadata } from '../models/board-metadata.model';
import { TaskListMetadata } from '../models/task-list-metadata.model';
import { UserMetadata } from '../models/user-metadata.model';
import { BoardContent } from '../models/board-content.model';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  private userMetadata: UserMetadata | null = null;

  private usersCollection: AngularFirestoreCollection<UserMetadata>;
  private boardsCollection: AngularFirestoreCollection<BoardMetadata>;
  private taskListsCollection: AngularFirestoreCollection<TaskListMetadata>;
  private tasksCollection: AngularFirestoreCollection<Task>;

  private DIFF_POS = 65536; // TODO: make a constant in another place

  constructor(private firestore: AngularFirestore, private authService: AuthService) {
    this.boardsCollection = this.firestore.collection('boards');
    this.taskListsCollection = this.firestore.collection('taskLists');
    this.tasksCollection = this.firestore.collection('tasks');
    this.usersCollection = this.firestore.collection('users');

    // tslint:disable-next-line: deprecation
    this.authService.firebaseUserMetadata.subscribe(firebaseUser => {
      if (firebaseUser) {
        this.usersCollection.doc(firebaseUser.uid).get().forEach(userSnapshot => {
          const userData = userSnapshot.data();

          if (userData) {
            this.userMetadata = userData;
          }
        });
      }
    });

  }

  public createBoardMetadata(name: string): Observable<BoardMetadata> {
    return from(
      new Promise<BoardMetadata>((resolve, reject) => {
        const userMetadata = this.userMetadata;

        if (userMetadata == null) {
          return reject();
        }

        const boardId = uuid();

        const newBoardMetadata: BoardMetadata = {
          id: boardId,
          name,
          owner: userMetadata.id,
          admins: [userMetadata.id],
          members: [userMetadata.id],
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

  public deleteBoardMetadata(boardId: string): Observable<BoardMetadata> {
    return from(
      new Promise<BoardMetadata>((resolve, reject) => {
        this.boardsCollection.doc(boardId).get().forEach(boardSnapshot => {
          const boardData = boardSnapshot.data();

          if (!boardData) {
            return reject();
          }

          const taskListsDeleting: Promise<void>[] = [];

          boardData.taskListsIds.forEach(taskListId => {
            taskListsDeleting.push(
              this.taskListsCollection.doc(taskListId).get().forEach(taskListSnapshot => {
                const taskListData = taskListSnapshot.data();
                const tasksDeleting: Promise<void>[] = []

                if (taskListData) {
                  taskListData.tasksIds.forEach(taskId => tasksDeleting.push(
                    this.tasksCollection.doc(taskId).delete())
                  );
                }

                Promise.all(tasksDeleting).then(
                  () => taskListSnapshot.ref.delete()
                );
              })
            );
          });

          Promise.all(taskListsDeleting).then(
            () => boardSnapshot.ref.delete()
          ).then(
            () => resolve(boardData)
          );
        });
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

  public readTaskListMetadata(taskListId: string): Observable<TaskListMetadata> {
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

  public loadPreviewList(): Observable<BoardMetadata[]> {
    return from(
      new Promise<BoardMetadata[]>((resolve, reject) => {
        const userId = this.userMetadata?.id;
        if (userId) {
          const boards: BoardMetadata[] = [];
          this.firestore.collection<BoardMetadata>('boards', ref => ref.where('members', '==', userId)).get().forEach(boardsQuery => {

            boardsQuery.forEach(boardSnapshot => {
              const boardData = boardSnapshot.data();

              if (boardData) {
                boards.push(boardData);
              }
            });
          }).then(
            () => resolve(boards),
            () => reject()
          );
        }
      })
    );
  }

  public loadBoardContent(boardId: string): Observable<BoardContent> {
    return from(
      this.readBoardMetadata(boardId).toPromise().then(boardMetadata => {
        const boardContent: BoardContent = {
          admins: boardMetadata.admins,
          id: boardMetadata.id,
          members: boardMetadata.members,
          name: boardMetadata.name,
          owner: boardMetadata.owner,
          taskLists: []
        };

        return {
          boardContent,
          boardMetadata
        };
      }).then(({ boardContent, boardMetadata }) => {
        return new Promise<BoardContent>((resolve, reject) => {
          const taskListsGetting: Promise<void>[] = [];
          const taskGetting: Promise<void>[] = [];

          boardMetadata.taskListsIds.forEach((taskListId, taskListIndex) => {
            taskListsGetting.push(
              this.readTaskListMetadata(taskListId).toPromise().then(taskListMetadata => {
                boardContent.taskLists.push({
                  boardId: taskListMetadata.boardId,
                  id: taskListMetadata.id,
                  name: taskListMetadata.name,
                  pos: taskListMetadata.pos,
                  tasks: []
                });

                taskListMetadata.tasksIds.forEach(taskId => {

                  taskGetting.push(this.tasksCollection.doc(taskId).get().forEach(taskSnapshot => {
                    const taskData = taskSnapshot.data();

                    if (taskData) {
                      boardContent.taskLists[taskListIndex].tasks.push(taskData);
                    }
                  }));
                });

              }));
          });

          Promise.all([...taskListsGetting, ...taskGetting]).then(
            () => resolve(boardContent),
            () => reject()
          );
        });
      })
    );
  }

}
