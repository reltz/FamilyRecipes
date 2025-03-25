import { mockListRecipesAPI } from "../mocks/apis";
import { CreateRecipeRequestInput, ListRecipesResponse } from "../types/api";
import { Log } from "./logging-service";
import { getToken } from "./login-service";

export const useMockBe = true;
export const baseUrl = "https://94bpys6vk3.execute-api.ca-central-1.amazonaws.com/prod";

export interface PhotoURLs {
  uploadUrl: string;
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
      response = await fetch(`${baseUrl}/recipes/list-recipes?limit=${limit}&cursor=${cursor}`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }
    } catch (er) {
      throw new Error(`Error fetching data: ${JSON.stringify(er)}`);
    }

    return response.json();
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
    return;
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
      throw new Error(`Error with API: ${response.statusText}`);
    } else {
      Log("Created recipe!");
    }
  }
}


// returns the pre-signed url and the endUrl
export async function getPreSignedURL(fileNameForBucket: string): Promise<PhotoURLs> {
  if(useMockBe) {
    return {
      uploadUrl: "https://example.com/1742164318066-batata.jpeg",
      photoURL: "https://example.com/1742164318066-batata.jpeg",
    }
  } else {
    const { decoded, token } = getToken();
    if (!token || !decoded) {
      Log(`Trying to upload recipe image - not token present`);
      return Promise.reject(Error("no token in the application"));
    }
  
    const response = await fetch(`${baseUrl}/recipes/get-bucket-url?fileName=${fileNameForBucket}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  
    const respJson: PhotoURLs = await response.json()
    if (response.status < 200 || response.status > 399) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    } else {
      const photoURL = respJson.uploadUrl.split('?X-Amz-Algorithm')[0]; // parse the base url of the pre-signed
      const urls: PhotoURLs = {
        photoURL,
        uploadUrl: respJson.uploadUrl,
      }
      Log(`Urls: ${JSON.stringify(urls)}`);
      return urls;
    }
  }
}

export async function uploadImageS3Bucket(file: File, url: string): Promise<boolean> {
  const options: RequestInit = {
    method: 'PUT',
    body: file,
    headers: {
      'Content-Type': file.type,
    },
  };
  if(useMockBe) {
    return true;
  } else {
    try {
      const response = await fetch(url, options);
  
      if (!response.ok) {
        throw new Error('Upload failed');
      }
      Log('Upload successful');
      return true;
    } catch (error) {
      Log(`Error: ${error}`);
      return false;
    }
  }
}