import { createSelector } from '@ngrx/store';
import { AppState } from '../models/app-state.model';
import { SidebarState } from '../models/sidebar-state.model';
import { UserState } from '../models/user-state.model';

export const selectSidebar = (state: AppState): SidebarState => state.sidebar;

export const selectSidebarOpen = createSelector(
  selectSidebar,
  (userState: SidebarState) => userState.open
);
