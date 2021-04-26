// import { createReducer, on } from '@ngrx/store';
// import { v4 as uuidv4 } from 'uuid';
// import { TaskList } from '../../models/task-list.model';
// import * as TaskActions from '../actions/task.actions';

// const initialState = {
//   lists: [
//     {
//       id: `list-${uuidv4()}`,
//       title: 'Todo',
//       cards: [{
//         id: `card-${uuidv4()}`,
//         title: 'Create Material UI Card',
//         text: 'The card description preview should not contain more than 200 characters. In case the card has more than 200, shorten it with an ellipsis, but enable full-text visibility on editing the card in the modal dialog.'
//       }, {
//         id: `card-${uuidv4()}`,
//         title: 'Create Redux store',
//         text: 'Lorem ipsum dolor sit amet, da adipisicine veniam voluptate voluptatum!'
//       }]
//     }, {
//       id: `list-${uuidv4()}`,
//       title: 'In Progress',
//       cards: [{
//         id: `card-${uuidv4()}`,
//         title: 'Set background color',
//         text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A alias labore magni modi nam numquam officia placeat quidem quos recusandae reiciendis ullam, voluptatem voluptatibus. Adipisci aliquam aliquid cumque, debitis delectus deleniti dolor dolores fugiat harum illo iste laudantium modi, repudiandae! Laudantium neque nihil tenetur! Aperiam itaque minima perspiciatis provident voluptatem!'
//       }]
//     }, {
//       id: `list-${uuidv4()}`,
//       title: 'Done',
//       cards: [{
//         id: `card-${uuidv4()}`,
//         title: 'Create Edit button',
//         text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autemiam voluptate voluptatum!'
//       }, {
//         id: `card-${uuidv4()}`,
//         title: 'Create Delete button',
//         text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aspernatur ducimus explicabo harum ipsa, iusto odit quia quis reiciendis repudiandae? Adipisci aperiam aspernatur atque, beatae culpa cupiditate eos et fugiat fugit, laudantium libero necessitatibus odit perspiciatis quam quis repellendus sunt! Aut eos laudantium, maxime nulla quos tenetur? Adipisci asperiores at aut beatae consectetur doloribus earum eum exercitationem facere id incidunt ipsum, iusto laboriosam maxime necessitatibus neque nisi perspiciatis placeat quas sint sunt tempore ullam voluptatem. Accusantium autem itaque modi nemo perspiciatis rerum? At, aut consequuntur dolorem ea esse est exercitationem expedita harum, ipsa laboriosam laborum nihil nulla odit ut vitae.'
//       }, {
//         id: `card-${uuidv4()}`,
//         title: 'Create Add button',
//         text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. '
//       }]
//     }
//   ]
// };

// function dragInsideSameList(lists: TaskList[], payload: {
//   droppableIdStart: string,
//   droppableIndexStart: number,
//   droppableIndexEnd: number
// }): void {
//   const {
//     droppableIdStart,
//     droppableIndexStart,
//     droppableIndexEnd
//   } = payload;

//   const list = getListByID(lists, droppableIdStart);
//   const card = list?.cards.splice(droppableIndexStart, 1);
//   if (card) {
//     list?.cards.splice(droppableIndexEnd, 0, ...card);
//   }
// }

// function dragBetweenLists(lists: TaskList[], payload: {
//   droppableIdStart: string,
//   droppableIdEnd: string,
//   droppableIndexStart: number,
//   droppableIndexEnd: number
// }): void {
//   const {
//     droppableIdStart,
//     droppableIdEnd,
//     droppableIndexStart,
//     droppableIndexEnd
//   } = payload;
//   const listStart = getListByID(lists, droppableIdStart);
//   const listEnd = getListByID(lists, droppableIdEnd);

//   const card = listStart?.cards.splice(droppableIndexStart, 1);
//   if (card) {
//     listEnd?.cards.splice(droppableIndexEnd, 0, ...card);
//   }
// }

// function getListByID(lists: TaskList[], listID: string): TaskList | undefined {
//   return lists.find(list => listID === list.id);
// }

// function deepCopy(object: any): any {
//   if (typeof object !== 'object' || object === null) {
//     return object;
//   }

//   const newObject: any = Array.isArray(object) ? [] : {};
//   const keys = Object.keys(object);

//   for (const key of keys) {
//     const value = object[key];
//     const isObject = (typeof value === 'object' && value !== null);
//     newObject[key] = isObject ? deepCopy(value) : value;
//   }

//   return newObject;
// }

// export const reducer = createReducer(
//   initialState,
//   on(CardActions.addCard, (state, payload) => {
//     const { listID, newCard } = payload;

//     return {
//       lists: state.lists.map(list => {
//         if (list.id === listID) {
//           return {
//             ...list,
//             cards: [...list.cards, newCard]
//           };
//         }

//         return list;
//       })
//     };
//   }),
//   on(CardActions.deleteCard, (state, payload) => {
//     const { listID, cardID } = payload;
//     const newState = deepCopy(state);
//     const { lists } = newState;

//     const listIndex = (lists as TaskList[]).findIndex(list => list.id === listID);
//     const cardIndex = (lists as TaskList[])[listIndex].cards.findIndex(card => card.id === cardID);
//     lists[listIndex].cards.splice(cardIndex, 1);

//     return newState;
//   }),
//   on(CardActions.updateCard, (state, payload) => {
//     const { listID, cardID, title, text } = payload;
//     const newState = deepCopy(state);
//     const { lists } = newState;

//     const listIndex = (lists as TaskList[]).findIndex(list => list.id === listID);
//     const cardIndex = (lists as TaskList[])[listIndex].cards.findIndex(card => card.id === cardID);
//     lists[listIndex].cards[cardIndex] = { id: cardID, title, text };
//     return newState;
//   }),
//   on(CardActions.dragCard, (state, payload) => {
//     const newState = deepCopy(state);
//     const { lists } = newState;
//     const { droppableIdStart, droppableIdEnd } = payload;

//     if (droppableIdStart === droppableIdEnd) {
//       dragInsideSameList(lists, payload);
//     } else {
//       dragBetweenLists(lists, payload);
//     }

//     return newState;
//   })
// );
