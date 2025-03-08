import { mockAuthApi } from "../mocks/apis";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { baseUrl, useMockBe as useMockBackend } from "./api-service";

export interface LoginParams {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  isAuthorized: boolean;
}

export interface CustomJWTPayload extends JwtPayload {
  username: string;
}

export const lsTokenKey = "familyRecipeToken";

export async function login(params: LoginParams): Promise<boolean> {
  let isAuthorized = false;
  let token: string | null = null;

  if (useMockBackend) {
    const response = await mockAuthApi(params);
    token = response.token;
    isAuthorized = response.isAuthorized;
    console.log(`IS AUTHORIZED: ${isAuthorized}`);
  }
  else {
    let response;

    try {
      response = await fetch(`${baseUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: params.username,
          password: params.password
        })
      });

      if (response.status != 200) {
        //  return Promise.reject(new Error('Not authorized'));
        throw new Error(`not authorized, status: ${response.status}`);
      }
      isAuthorized = true;
      const data = await response.json(); // Parse JSON response
      token = data.userSessionToken; // Retrieve the token
    } catch (er) {
      console.error(`Error with request: ${er}`)
    }
  }

  if (!isAuthorized) {
    return false;
  }

  if (token) {
    localStorage.setItem(lsTokenKey, token); // Store status in sessionStorage
  }
  console.log(`Token stored: ${!!token}, Authenticated: ${isAuthorized}`);
  return isAuthorized;
}

export function clearLocalToken(): void {
  localStorage.removeItem(lsTokenKey);
}

export function getLocalToken(): string | null {
  return localStorage.getItem(lsTokenKey);
}

export function getToken(): {
  decoded: CustomJWTPayload | null;
  token: string | null;
} {
  const defaultReturnValue = {
    decoded: null,
    token: null,
  };

  const token = getLocalToken();
  if (!token) {
    console.log("No token found");
    return defaultReturnValue;
  }

  try {
    const decoded = jwtDecode<CustomJWTPayload>(token);
    console.log(`Decoded is: ${JSON.stringify(decoded)}`);
    if (!decoded || (decoded.exp && decoded.exp * 1000 <= Date.now())) { // Token could not be decoded or is expired
      console.log(decoded ? "Token expired!" : "Token could not be decoded");
      clearLocalToken(); // Cleanup invalid or expired token
      return defaultReturnValue;
    }

    // Token is valid and not expired
    console.log("Token is valid");
    return {
      decoded,
      token,
    };
  } catch (er) {
    console.error("Invalid token:", er);
    clearLocalToken();
  }

  return defaultReturnValue;
}


export function checkAuthStatus(): boolean {
  console.log("Checking status!");

  const { decoded, token } = getToken();

  if (!token) {
    console.log("No token found");
    return false;
  }

  if (decoded) {
    console.log("Token is valid and not expired");
    return true;
  } else {
    console.log("Token is invalid or expired");
    return false;
  }
}
