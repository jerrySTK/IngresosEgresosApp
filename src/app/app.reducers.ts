

import * as fromUI from './shared/ui.reducer';
import * as fromAuth from './auth/auth.reducer';
import * as fromIO from './ingreso-egreso/income-outcome.reducer';
import * as fromIOReducer from './ingreso-egreso/income-outcome.reducer';
import { ActionReducerMap, createSelector } from '@ngrx/store';

export interface AppState {
    ui: fromUI.State;
    loggedUser: fromAuth.AuthState;
    io: fromIO.IncomeOutcomeState;
}

export const reducers: ActionReducerMap<AppState> = {
    ui: fromUI.reducer,
    loggedUser: fromAuth.reducer,
    io: fromIO.reducer
};

export const appIOstate = createSelector((state: AppState) => state, (state) => state.io);

export const getIncomeAmountSelector = createSelector(appIOstate, fromIOReducer.getIncomeAmount);
export const getOutcomeAmountSelector = createSelector(appIOstate, fromIOReducer.getOutcomeAmount);
export const getIncomeCountSelector = createSelector(appIOstate, fromIOReducer.getIncomeCount);
export const getOutcomeCountSelector = createSelector(appIOstate, fromIOReducer.getOutcomeCount);
