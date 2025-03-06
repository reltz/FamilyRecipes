import { mockListRecipesAPI, mockSaveRecipeAPI } from "../mocks/apis";
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


export async function saveRecipe(formData: FormData): Promise<void> {
    const token = getLocalToken();
    if(!token) {
        console.info("no token present");
        return Promise.reject(Error("no token in the application"));
    }

    // const response = await fetch('/api/your-endpoint', {
    //     method: 'POST',
    //     body: formData, // don't stringify formData!
    //   });

    const response = await mockSaveRecipeAPI(formData, token);

      if (response.status !== 200) {
        throw new Error('Error saving recipe');
      }
    
      return Promise.resolve();
}