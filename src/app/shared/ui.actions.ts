import { Action } from '@ngrx/store'

export const ACTIVATE_LOADING = '[UI] Activate Loading';
export const DEACTIVATE_LOADING = '[UI] Deactivate Loading';

export class ActivateLoginAction implements Action {
    readonly type = ACTIVATE_LOADING;
}

export class DeactivateLoginAction implements Action {
    readonly type = DEACTIVATE_LOADING;
}

export type actions = ActivateLoginAction | DeactivateLoginAction;
