export interface ListRecipesResponse {
    recipes: Recipe[];
    cursor?: string;
}