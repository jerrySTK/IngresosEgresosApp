import * as fromActions from './ui.actions';

export interface State {
    isLoading: boolean;
}

const initState: State = {
    isLoading: false
};

export const reducer = (state = initState, action: fromActions.actions): State => {
    switch ( action.type ) {
        case fromActions.ACTIVATE_LOADING:
            return { isLoading: true };
        case fromActions.DEACTIVATE_LOADING:
                return { isLoading: false };
        default:
            return state;
    }
};
