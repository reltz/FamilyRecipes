import {Recipe} from './recipe'

export interface ListRecipesResponse {
    recipes: Recipe[];
    cursor?: string;
}

export interface CreateRecipeRequestInput {
  name: string;
  ingredients?: string;
  preparation: string;
  photoUrl?: string;
}