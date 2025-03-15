import { mockListRecipesAPI, mockSaveRecipeAPI } from "../mocks/apis";
import { CreateRecipeRequestInput, ListRecipesResponse } from "../types/api";
import { Log } from "./logging-service";
import { getToken } from "./login-service";
import axios from 'axios';

export const useMockBe = false;
export const baseUrl = "";

export interface PhotoURLs {
  preSignedURL: string;
  photoURL: string;
}


export async function listRecipes(limit: number, cursor: string): Promise<ListRecipesResponse> {
  const { token } = getToken();
  if (!token) {
    return Promise.reject(Error("no token in the application"));
  }


  if (useMockBe) {
    const recipes = await mockListRecipesAPI()
    Log(JSON.stringify(recipes));
    return recipes;
  } else {
    let response;

    try {
      response = await axios.get(`${baseUrl}/recipes/list-recipes?limit=${limit}&cursor=${cursor}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      // response = await fetch(`${baseUrl}/recipes/list-recipes?limit=${limit}&cursor=${cursor}`, {
      //     method: "GET",
      //     headers: {
      //       "Content-Type": "application/json",
      //       "Authorization": `Bearer ${token}`,
      //     },
      //   });
      //   if (!response.ok) {
      //     throw new Error(`Error fetching data: ${response.statusText}`);
      //   }
    } catch (er) {
      throw new Error(`Error fetching data: ${JSON.stringify(er)}`);
    }

    // return response.json();
    return response.data
  }
}

export async function saveRecipe(params: CreateRecipeRequestInput): Promise<void> {
  const { decoded, token } = getToken();
  if (!token || !decoded) {
    Log(`Trying to save Recipe - not token present`);
    return Promise.reject(Error("no token in the application"));
  }

  let response;

  if (useMockBe) {
    // mock

  } else {
    response = await fetch(`${baseUrl}/recipes/create`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });
    if (response.status < 200 || response.status > 399) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    } else {
      Log("Created recipe!");
    }
  }
}


// returns the pre-signed url and the endUrl
export async function getPreSignedURL(): Promise<PhotoURLs> {
  throw new Error("not implemented");
}