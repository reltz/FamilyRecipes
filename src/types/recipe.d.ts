export interface Recipe {
    id: string;
    name: string;
    author: string;
    preparation: string;
    ingredients?: string;
    photoUrl?: string;
}
