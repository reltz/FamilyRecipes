import {Recipe} from './recipe'

export interface ListRecipesResponse {
    recipes: Recipe[];
    cursor?: string;
}