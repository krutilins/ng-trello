import { createAction, props } from '@ngrx/store';
import { TaskCard } from '../../models/task-card.model';

export const addCard = createAction(
  '[Card] Add Card',
  props<{ listID: string, newCard: TaskCard }>()
);
export const deleteCard = createAction(
  '[Card] Delete Card',
  props<{ listID: string, cardID: string }>()
);
export const updateCard = createAction(
  '[Card] Update Card',
  props<{ listID: string, cardID: string, title: string, text: string }>()
);
export const dragCard = createAction(
  '[Card] Drag Card',
  props<{
    droppableIdStart: string,
    droppableIdEnd: string,
    droppableIndexStart: number,
    droppableIndexEnd: number
  }>()
);
