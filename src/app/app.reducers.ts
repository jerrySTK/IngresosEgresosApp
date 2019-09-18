

import * as fromUI from './shared/ui.reducer';
import * as fromAuth from './auth/auth.reducer';

import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
    ui: fromUI.State;
    loggedUser: fromAuth.AuthState;
}

export const reducers: ActionReducerMap<AppState> = {
    ui: fromUI.reducer,
    loggedUser: fromAuth.reducer
};


