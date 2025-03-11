export interface Recipe {
    id: string;
    name: string;
    author: string;
    preparation: string;
    createdAt: string;
    ingredients?: string;
    photoUrl?: string;
}
