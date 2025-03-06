// DELETE DEPENDENCIES AFTER SWAPPING FOR REAL APIS BACKEND

import { LoginParams, LoginResponse } from "../services/login-service";
import { Recipe } from "../types/recipe";

// const secret = "potato-123-secret";

export function mockAuthApi(params: LoginParams): LoginResponse {
    const { username, password } = params;
    let isAuthorized = false;
    let userToken = "";

    if (username === 'user' && password === 'pass') {
        isAuthorized = true;

        // Fake JWT token (this is NOT a real JWT)
        userToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxNzQxMjIyMDE5IiwidXNlcm5hbWUiOiJKb2huIERvZSIsImV4cCI6MTc0MTIyMjA5Mn0.bzHqhdsoroYX5GztB52kGsGbxJAHfq5dwQKIuCjADNQ";
    }

    return { token: userToken, isAuthorized };
}

function verifyToken(token: string) {
    try {
        const decoded = atob(token);
        return JSON.parse(decoded);
    } catch {
        return null;
    }
}



const cards: Recipe[] = [
    {
        name: "Shrimp and Chorizo Paella",
        preparation: "This impressive paella is a perfect party dish...",
        author: "Rodrigo",
    },
    { 
        name: "Spaghetti Bolognese", 
        preparation: "A classic Italian pasta dish with a rich meat sauce..." ,
        author: "Rodrigo"
    },
    { 
        name: "Spaghetti Bolognese", 
        preparation: "A classic Italian pasta dish with a rich meat sauce..." ,
        author: "Rodrigo"
    },
    { 
        name: "Spaghetti Bolognese", 
        preparation: "A classic Italian pasta dish with a rich meat sauce..." ,
        author: "Rodrigo"
    },
    { 
        name: "Spaghetti Bolognese", 
        preparation: "A classic Italian pasta dish with a rich meat sauce..." ,
        author: "Luiza"
    },
    { 
        name: "Spaghetti Bolognese", 
        preparation: "A classic Italian pasta dish with a rich meat sauce..." ,
        author: "Deise"
    },
    { 
        name: "Spaghetti Bolognese", 
        preparation: "A classic Italian pasta dish with a rich meat sauce..." ,
        author: "Cristina"
    },
    { 
        name: "Spaghetti Bolognese", 
        preparation: "A classic Italian pasta dish with a rich meat sauce..." ,
        author: "Rodrigo"
    },
    { 
        name: "Spaghetti Bolognese", 
        preparation: "A classic Italian pasta dish with a rich meat sauce..." ,
        author: "Luiza"
    },
    { 
        name: "Spaghetti Bolognese", 
        preparation: "A classic Italian pasta dish with a rich meat sauce..." ,
        author: "Deise"
    },
    { 
        name: "Spaghetti Bolognese", 
        preparation: "A classic Italian pasta dish with a rich meat sauce..." ,
        author: "Cristina"
    },
    { 
        name: "Spaghetti Bolognese", 
        preparation: "A classic Italian pasta dish with a rich meat sauce..." ,
        author: "Rodrigo"
    },
    { 
        name: "Spaghetti Bolognese", 
        preparation: "A classic Italian pasta dish with a rich meat sauce..." ,
        author: "Luiza"
    },
    { 
        name: "Spaghetti Bolognese", 
        preparation: "A classic Italian pasta dish with a rich meat sauce..." ,
        author: "Deise"
    },
    { 
        name: "Spaghetti Bolognese", 
        preparation: "A classic Italian pasta dish with a rich meat sauce..." ,
        author: "Cristina"
    }
    // Add more cards as needed
];
export async function mockListRecipesAPI(token: string): Promise<Recipe[]> {
    const userInfo = verifyToken(token);
    console.log(`User info ${userInfo}`);

    return Promise.resolve(cards);
}


export async function mockSaveRecipeAPI(formData: FormData, token: string): Promise<{status: number}> {
    const userInfo = verifyToken(token);
    console.log(`User info ${userInfo}`);


    return Promise.resolve({status: 200});
}