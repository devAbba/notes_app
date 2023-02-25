export interface IUser {
    id?: number;
    first_name: string;
    last_name: string;
    user_name?: string;
    email: string;
    password: string;
}

export interface INote {
    id?: number;
    title: string;
    createdAt: Date;
    updatedAt: Date;
    tags: string;
    body: string;
}