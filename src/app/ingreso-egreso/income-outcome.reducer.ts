import * as fromActions from './income-outcome.actions';
import { IncomeOutcome } from './income-outcome.model';
import { AppState } from '../app.reducers';

export interface IncomeOutcomeState {
    items: IncomeOutcome[];
}

export interface ExtendedAppState extends AppState {
    io: IncomeOutcomeState;
}

const initialState: IncomeOutcomeState = { items: [] };

export const reducer = (state = initialState, action: fromActions.actions) => {
    switch (action.type) {
        case fromActions.SET_ITEMS:
            return {
                items: [...action.payload.map(item => {
                    return { ...item };
                })]
            };
        case fromActions.UNSET_ITEMS:
            return { items: [] };
        default:
            return state;
    }
}

export const getIncomeAmount = (state: IncomeOutcomeState) => {
    const sum = state.items.filter(e => e.type === 'income').map(e => e.amount).reduce((count, item) => {
        return count += item;
    }, 0);
    return sum;
};

export const getOutcomeAmount = (state: IncomeOutcomeState) => {
    const sum = state.items.filter(e => e.type === 'outcome').map(e => e.amount).reduce((count, item) => {
        return count += item;
    }, 0);
    return sum;
};

export const getIncomeCount = (state: IncomeOutcomeState) => {
    return state.items.filter(e => e.type === 'income').length;
};

export const getOutcomeCount = (state: IncomeOutcomeState) => {
    return state.items.filter(e => e.type === 'outcome').length;
};

export const getItems = (state: IncomeOutcomeState) => state.items;
