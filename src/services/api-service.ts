import { mockListRecipesAPI, mockSaveRecipeAPI } from "../mocks/apis";
import { ListRecipesResponse } from "../types/api";
import { Log } from "./logging-service";
import { getToken } from "./login-service";

export const useMockBe = true;
export const baseUrl = "http://localhost:3000";

export async function listRecipes(page: number): Promise<ListRecipesResponse> {
    const {token} = getToken();
    if(!token) {
        return Promise.reject(Error("no token in the application"));
    }


    if(useMockBe) {
        const recipes = await mockListRecipesAPI(token, page)
        return recipes;
    } else {
        let response;
        
        try {
            response = await fetch(`${baseUrl}/list-recipes?page=${page}`, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              });
              if (!response.ok) {
                throw new Error(`Error fetching data: ${response.statusText}`);
              }
        } catch(er) {
            throw new Error(`Error fetching data: ${JSON.stringify(er)}`);
        }
        
        return response.json();
    }
}


export async function saveRecipe(formData: FormData): Promise<void> {
    const {decoded, token} = getToken();
    if(!token || !decoded) {
        Log(`Trying to save Recipe - not token present`);
        return Promise.reject(Error("no token in the application"));
    }

    const user = decoded.username;
    formData.append("author", user);


    const response = await mockSaveRecipeAPI(formData, token);

      if (response.status !== 200) {
        throw new Error('Error saving recipe');
      }
    
      return Promise.resolve();
}