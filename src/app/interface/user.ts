export interface User {

    id: number;
    lastName: string;
    email: string;
    age: number;
    enabled: boolean;
    isNotLocked: boolean;
    isUsingMfa: boolean;
    createdAt: Date;
}
