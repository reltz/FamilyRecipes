import { mockListRecipesAPI, mockSaveRecipeAPI } from "../mocks/apis";
import { Recipe } from "../types/recipe";
import { getToken } from "./login-service";

export const useMockBe = true;
export const baseUrl = "http://localhost:3000";

export async function listRecipes(): Promise<Recipe[]> {
    const {token} = getToken();
    if(!token) {
        console.info("no token present");
        return Promise.reject(Error("no token in the application"));
    }


    if(useMockBe) {
        const recipes = await mockListRecipesAPI(token)
        console.log(`Recipes are: ${JSON.stringify(recipes)}`)
        return recipes;
    } else {
        let response;
        
        try {
            response = await fetch(`${baseUrl}/list-recipes`, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              });
              if (!response.ok) {
                console.error(`Error fetching recipes: ${response.statusText}` )
                throw new Error(`Error fetching data: ${response.statusText}`);
              }
        } catch(er) {
            console.error(`Error fetching recipes: ${JSON.stringify(er)}` )
            throw new Error(`Error fetching data: ${JSON.stringify(er)}`);
        }
        
        return response.json();
    }

  
}


export async function saveRecipe(formData: FormData): Promise<void> {
    const {decoded, token} = getToken();
    if(!token || !decoded) {
        console.info("no token present");
        return Promise.reject(Error("no token in the application"));
    }

    const user = decoded.username;
    formData.append("author", user);



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