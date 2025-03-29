// DELETE DEPENDENCIES AFTER SWAPPING FOR REAL APIS BACKEND

import { LoginParams, LoginResponse } from "../services/login-service";
import { ListRecipesResponse } from "../types/api";
import { Recipe } from "../types/recipe";

// const secret = "potato-123-secret";

export function mockAuthApi(params: LoginParams): LoginResponse {
  const { username, password } = params;
  let isAuthorized = false;
  let userToken = "";

  if (username === "user" && password === "pass") {
    isAuthorized = true;

    // Fake JWT token (this is NOT a real JWT)
    userToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxNzQxMjIyMDE5IiwidXNlcm5hbWUiOiJKb2huIERvZSIsImV4cCI6MTc0NjA0ODg3Nn0.KLbFcUq3zRc2oxL9MZtDKhxYynCvfuDJnBfZLjFwvD4";
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
    preparation:
      "A delicious seafood and chorizo dish cooked with saffron-infused rice.",
    author: "Rodrigo",
    ingredients: "Potato \n Tomato \n Rice",
    photoUrl:
      "https://images.pexels.com/photos/842571/pexels-photo-842571.jpeg?cs=srgb&dl=pexels-valeriya-842571.jpg&fm=jpg",
    createdAt: new Date().toISOString(),
    familyId: "",
    familyName: "",
    likes: {
      John: true,
      Jane: true,
      Alice: true,
    },
  },
  {
    id: "02",
    name: "Spaghetti Bolognese",
    preparation: "Coloque a lentilha em uma vasilha, cubra com o dobro de água e deixe de molho por 8 horas. Escorra, lave bem e coloque em uma panela, juntamente com 1 e 1/2 xícara de água e as folhas de louro e deixe cozinhar.  2) Enquanto isso, coloque a quinoa em uma vasilha pequena, cubra com água quente e deixe de molho por 2 minutos. Escorra lave bem e reserve.  3) Quando a lentilha estiver quase sem água, retire as folhas de louro, adicione a quinoa, misture e deixe cozinhar até a água do cozimento secar completamente.  4) Em seguida, adicione o azeite, o alho, a cebola, o suco de limão, o cominho, o orégano e tempere com sal a gosto. Misture bem e deixe cozinhar por cerca de 3 minutos, mexendo sempre para não queimar.  5) Desligue e acrescente a farinha de trigo integral, a aveia em flocos, misture bem e deixe esfriar completamente, para não atrapalhar a montagem (vai levar cerca de uma hora e meia).  6) Enquanto isso, prepare o molho de tomate e o purê conforme o seu gosto. Também cozinhe 6 unidades de vagem e 6 palitos grandes de cenoura em água fervente por 5 minutos. Escorra e reserve.  7) Pré aqueça o forno a 240ºC e coloque uma folha de papel manteiga com cerca de 40cm sobre uma superfície limpa. Distribua a mistura de lentilha e quinoa até formar um retângulo com cerca de 30cmx20cm e aperte bem, ajeitando as laterais. Dê 2cm de distância da borda e distribua uma camada de purê. Disponha a vagem e a cenoura sobre ele e em seguida enrole o rocambole. Procure deixar o rocambole bem firme, e para isso aperte bem.  8) Unte uma assadeira antiaderente com uma colher de sopa de óleo, disponha o rocambole sobre ela, ajeite as laterais e pincele óleo sobre toda a superfície dele.  9) Leve para assar por 30 minutos a 240ºC e em seguida retire do forno. Cubra o rocambole com metade do molho e deixe a outra parte para a hora que for servir. Devolva ao forno por mais 10 minutos e está pronto!    Acesse o vídeo da receita aqui: https://presuntovegetariano.com.br/receitas/rocambole-assado-de-lentilha-e-quinoa/  ",
    author: "Rodrigo",
    createdAt: "",
    familyId: "",
    familyName: "",
    likes: {}
  },
  {
    id: "03",
    name: "Chicken Curry",
    preparation:
      "A creamy coconut-based curry with tender chicken and aromatic spices.",
    author: "Luiza",
    createdAt: "",
    familyId: "",
    familyName: "",
    likes: {}
  },
  {
    id: "04",
    name: "Beef Stroganoff",
    preparation:
      "A Russian-inspired dish with sautéed beef in a creamy mushroom sauce.",
    author: "Deise",
    createdAt: "",
    familyId: "",
    familyName: "",
    likes: {}
  },
  {
    id: "05",
    name: "Vegetable Stir-Fry",
    preparation:
      "Crisp vegetables tossed in a savory soy-ginger sauce, served with rice.",
    author: "Cristina",
    createdAt: "",
    familyId: "",
    familyName: "",
    likes: {}
  },
  {
    id: "06",
    name: "Lemon Garlic Salmon",
    preparation: "Oven-baked salmon with a zesty lemon garlic butter sauce.",
    author: "Rodrigo",
    createdAt: "",
    familyId: "",
    familyName: "",
    likes: {}
  },
  {
    id: "07",
    name: "Margherita Pizza",
    preparation:
      "A simple and fresh pizza with tomato sauce, mozzarella, and basil.",
    author: "Rodrigo",
    createdAt: "",
    familyId: "",
    familyName: "",
    likes: {}
  },
  {
    id: "08",
    name: "Tacos al Pastor",
    preparation: "Traditional Mexican tacos with marinated pork and pineapple.",
    author: "Rodrigo",
    createdAt: "",
    familyId: "",
    familyName: "",
    likes: {}
  },
  {
    id: "09",
    name: "Pad Thai",
    preparation:
      "A famous Thai noodle dish with shrimp, peanuts, and tamarind sauce.",
    author: "Rodrigo",
    createdAt: "",
    familyId: "",
    familyName: "",
    likes: {}
  },
  {
    id: "10",
    name: "Greek Salad",
    preparation:
      "A refreshing salad with tomatoes, cucumbers, feta, and olives.",
    author: "Rodrigo",
    createdAt: "",
    familyId: "",
    familyName: "",
    likes: {}
  },
  {
    id: "11",
    name: "Sushi Rolls",
    preparation: "Homemade sushi with fresh fish, rice, and seaweed.",
    author: "Rodrigo",
    createdAt: "",
    familyId: "",
    familyName: "",
    likes: {}
  },
  {
    id: "12",
    name: "BBQ Ribs",
    preparation: "Slow-cooked ribs coated in a smoky barbecue sauce.",
    author: "Rodrigo",
    createdAt: "",
    familyId: "",
    familyName: "",
    likes: {}
  },
  {
    id: "13",
    name: "Chocolate Cake",
    preparation:
      "A rich and moist chocolate cake with a velvety ganache topping.",
    author: "Rodrigo",
    createdAt: "",
    familyId: "",
    familyName: "",
    likes: {}
  },
  {
    id: "14",
    name: "French Onion Soup",
    preparation:
      "A classic French soup with caramelized onions and melted cheese.",
    author: "Rodrigo",
    createdAt: "",
    familyId: "",
    familyName: "",
    likes: {}
  },
  {
    id: "15",
    name: "Caesar Salad",
    preparation:
      "Crisp romaine lettuce with creamy Caesar dressing and parmesan.",
    author: "Rodrigo",
    createdAt: "",
    familyId: "",
    familyName: "",
    likes: {}
  },
];

export async function mockListRecipesAPI(): Promise<ListRecipesResponse> {
  return Promise.resolve({
    recipes: cards,
    total: cards.length,
  });
}

export async function mockSaveRecipeAPI(
  token: string
): Promise<{ status: number }> {
  const userInfo = verifyToken(token);
  console.log(`User info ${userInfo}`);

  return Promise.resolve({ status: 200 });
}
