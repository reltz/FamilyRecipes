import { mockListRecipesAPI } from "../mocks/apis";
import { Recipe } from "../types/recipe";
import { getLocalToken } from "./login-service";


export async function listRecipes(): Promise<Recipe[]> {
    const token = getLocalToken();
    if(!token) {
        console.info("no token present");
        return Promise.reject(Error("no token in the application"));
    }

    const recipes = await mockListRecipesAPI(token)
    console.log(`Recipes are: ${JSON.stringify(recipes)}`)
    return recipes;
}