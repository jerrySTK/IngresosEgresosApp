export class IncomeOutcome {
    description: string;
    amount: number;
    type: string;
    uid?: string;

    constructor(obj: IIncomeOutcome) {
        this.description = obj && obj.description || null;
        this.amount = obj && obj.amount || null;
        this.type = obj && obj.type || null;
        //this.uid = obj && obj.uid || null;
    }
}

export interface IIncomeOutcome {
    description: string;
    amount: number;
    type: string;
    uid?: string;
}