import { createReducer, on } from '@ngrx/store';
import { toggleSidebar } from '../actions/sidebar.actions';
import { SidebarState } from '../models/sidebar-state.model';

const initialState: SidebarState = {
  open: false
};

export const sidebarReducer = createReducer(
  initialState,
  on(toggleSidebar, state => ({
    open: !state.open
  }))
);
