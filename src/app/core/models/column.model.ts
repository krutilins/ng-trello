import { TaskCard } from './task-card.model';

export class Column {
  constructor(public id: string, public title: string, public cards: TaskCard[]) {
    this.id = id;
    this.title = title;
    this.cards = cards;
  }
}
