import * as fromUI from './shared/ui.reducer';
import * as fromAuth from './auth/auth.reducer';
import { ActionReducerMap, createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromIOReducer from './ingreso-egreso/income-outcome.reducer';

export interface AppState {
    ui: fromUI.State;
    loggedUser: fromAuth.AuthState;
}

export const reducers: ActionReducerMap<AppState> = {
    ui: fromUI.reducer,
    loggedUser: fromAuth.reducer,
};

export const appIOstate = createFeatureSelector('io');

export const getIncomeAmountSelector = createSelector(appIOstate, fromIOReducer.getIncomeAmount);
export const getOutcomeAmountSelector = createSelector(appIOstate, fromIOReducer.getOutcomeAmount);
export const getIncomeCountSelector = createSelector(appIOstate, fromIOReducer.getIncomeCount);
export const getOutcomeCountSelector = createSelector(appIOstate, fromIOReducer.getOutcomeCount);
export const getItems = createSelector(appIOstate, fromIOReducer.getItems);

