export class User {
    name: string;
    uid?: string;
    email: string;

    constructor(obj: IUser) {
        this.name = obj && obj.name || null;
        this.email = obj && obj.email || null;
        this.uid = obj && obj.uid || null;
    }
}

export interface IUser {
    name: string;
    uid?: string;
    email: string;
}
