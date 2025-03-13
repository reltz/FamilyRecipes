import { mockListRecipesAPI, mockSaveRecipeAPI } from "../mocks/apis";
import { ListRecipesResponse } from "../types/api";
import { Log } from "./logging-service";
import { getToken } from "./login-service";
import axios from 'axios';

export const useMockBe = true;
export const baseUrl = "https://f4c15j8xm0.execute-api.ca-central-1.amazonaws.com/prod";

export async function listRecipes(limit: number, cursor: string): Promise<ListRecipesResponse> {
    const {token} = getToken();
    if(!token) {
        return Promise.reject(Error("no token in the application"));
    }


    if(useMockBe) {
        const recipes = await mockListRecipesAPI()
        Log(JSON.stringify(recipes));
          return recipes;
    } else {
        let response;
        
        try {
            response = await fetch(`${baseUrl}/recipes/list-recipes?limit=${limit}&cursor=${cursor}`, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${token}`,
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

    let response;
    if(useMockBe) {
       response = await mockSaveRecipeAPI(formData, token);

    } else {
      response = await axios.post(`${baseUrl}/recipes/create`, formData, {
        headers: {
          "Authorization": `Bearer ${token}`,
          // Do not manually set Content-Type, Axios will set it automatically
        }
      });
      if (response.status <200 || response.status > 399) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }else {
        Log("Created recipe!");
      }
    }

     // "Content-Type": "multipart/form-data",

      if (response.status !== 200) {
        throw new Error('Error saving recipe');
      }
    
      return Promise.resolve();
}