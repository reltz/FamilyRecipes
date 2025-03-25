
import { LoginParams, LoginResponse } from "../services/login-service";
import { ListRecipesResponse } from "../types/api";
import { Recipe } from "../types/recipe";

export function mockAuthApi(params: LoginParams): LoginResponse {
    const { username, password } = params;
    let isAuthorized = false;
    let userToken = "";

    if (username === 'user' && password === 'pass') {
        isAuthorized = true;

        // Fake JWT token (this is NOT a real JWT)
        userToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxNzQxMjIyMDE5IiwidXNlcm5hbWUiOiJKb2huIERvZSIsImV4cCI6MTc0NjA0ODg3Nn0.KLbFcUq3zRc2oxL9MZtDKhxYynCvfuDJnBfZLjFwvD4";
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
        id: "01",
        name: "Shrimp and Chorizo Paella",
        preparation: "A delicious seafood and chorizo dish cooked with saffron-infused rice.",
        author: "Rodrigo",
        ingredients: "Potato \n Tomato \n Rice",
        photoUrl: "https://images.pexels.com/photos/842571/pexels-photo-842571.jpeg?cs=srgb&dl=pexels-valeriya-842571.jpg&fm=jpg",
        createdAt: "",
        familyId: "",
        familyName: ""
    },
    {
        id: "02",
        name: "Spaghetti Bolognese",
        preparation: "A classic Italian pasta dish with a rich and flavorful meat sauce.",
        author: "Rodrigo",
        createdAt: "",
        familyId: "",
        familyName: ""
    },
    {
        id: "03",
        name: "Chicken Curry",
        preparation: "A creamy coconut-based curry with tender chicken and aromatic spices.",
        author: "Luiza",
        createdAt: "",
        familyId: "",
        familyName: ""
    },
    {
        id: "04",
        name: "Beef Stroganoff",
        preparation: "A Russian-inspired dish with sautéed beef in a creamy mushroom sauce.",
        author: "Deise",
        createdAt: "",
        familyId: "",
        familyName: ""
    },
    {
        id: "05",
        name: "Vegetable Stir-Fry",
        preparation: "Crisp vegetables tossed in a savory soy-ginger sauce, served with rice.",
        author: "Cristina",
        createdAt: "",
        familyId: "",
        familyName: ""
    },
    {
        id: "06",
        name: "Lemon Garlic Salmon",
        preparation: "Oven-baked salmon with a zesty lemon garlic butter sauce.",
        author: "Rodrigo",
        createdAt: "",
        familyId: "",
        familyName: ""
    },
    {
        id: "07",
        name: "Margherita Pizza",
        preparation: "A simple and fresh pizza with tomato sauce, mozzarella, and basil.",
        author: "Rodrigo",
        createdAt: "",
        familyId: "",
        familyName: ""
    },
    {
        id: "08",
        name: "Tacos al Pastor",
        preparation: "Traditional Mexican tacos with marinated pork and pineapple.",
        author: "Rodrigo",
        createdAt: "",
        familyId: "",
        familyName: ""
    },
    {
        id: "09",
        name: "Pad Thai",
        preparation: "A famous Thai noodle dish with shrimp, peanuts, and tamarind sauce.",
        author: "Rodrigo",
        createdAt: "",
        familyId: "",
        familyName: ""
    },
    {
        id: "10",
        name: "Greek Salad",
        preparation: "A refreshing salad with tomatoes, cucumbers, feta, and olives.",
        author: "Rodrigo",
        createdAt: "",
        familyId: "",
        familyName: ""
    },
    {
        id: "11",
        name: "Sushi Rolls",
        preparation: "Homemade sushi with fresh fish, rice, and seaweed.",
        author: "Rodrigo",
        createdAt: "",
        familyId: "",
        familyName: ""
    },
    {
        id: "12",
        name: "BBQ Ribs",
        preparation: "Slow-cooked ribs coated in a smoky barbecue sauce.",
        author: "Rodrigo",
        createdAt: "",
        familyId: "",
        familyName: ""
    },
    {
        id: "13",
        name: "Chocolate Cake",
        preparation: "A rich and moist chocolate cake with a velvety ganache topping.",
        author: "Rodrigo",
        createdAt: "",
        familyId: "",
        familyName: ""
    },
    {
        id: "14",
        name: "French Onion Soup",
        preparation: "A classic French soup with caramelized onions and melted cheese.",
        author: "Rodrigo",
        createdAt: "",
        familyId: "",
        familyName: ""
    },
    {
        id: "15",
        name: "Caesar Salad",
        preparation: "Crisp romaine lettuce with creamy Caesar dressing and parmesan.",
        author: "Rodrigo",
        createdAt: "",
        familyId: "",
        familyName: ""
    }
];

export async function mockListRecipesAPI(): Promise<ListRecipesResponse> {
    return Promise.resolve({
        recipes: cards,
        total: cards.length,
    });
}


export async function mockSaveRecipeAPI(token: string): Promise<{status: number}> {
    const userInfo = verifyToken(token);
    console.log(`User info ${userInfo}`);


    return Promise.resolve({status: 200});
}