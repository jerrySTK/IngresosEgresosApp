import { Action} from "@ngrx/store";
import { IncomeOutcome } from "./income-outcome.model";

export const SET_ITEMS = '[Ingreso Egreso] Set Items';
export const UNSET_ITEMS = '[Ingreso Egreso] Unset Items';


export class SetItemsActions implements Action {
    readonly type = SET_ITEMS;
    constructor(public payload: IncomeOutcome[]) { }
}

export class UnsetItemsActions implements Action {
    readonly type = UNSET_ITEMS;
}

export type actions = SetItemsActions | UnsetItemsActions;


