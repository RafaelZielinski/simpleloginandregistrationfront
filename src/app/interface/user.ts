export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    age: number;
    enabled: boolean;
    isNotLocked: boolean;
    isUsingMfa: boolean;
    createdAt: Date;
}
