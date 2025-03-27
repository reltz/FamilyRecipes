import { mockAuthApi } from "../mocks/apis";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { baseUrl } from "./api-service";
import { Log } from "./logging-service";
import { useMockBe } from "../flags";

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

  if (useMockBe) {
    const response = await mockAuthApi(params);
    token = response.token;
    isAuthorized = response.isAuthorized;
    Log(`IS AUTHORIZED: ${isAuthorized}`);
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
        return false;
      }
      isAuthorized = true;
      const data = await response.json(); // Parse JSON response
      Log(`Data: ${JSON.stringify(data)}`)
      token = data.token; // Retrieve the token
    } catch (er) {
      Log(`Error with request: ${er}`, 'error');
      return false;
    }
  }

  if (!isAuthorized) {
    return false;
  }

  if (token) {
    Log(`Will save token in LS!`);
    localStorage.setItem(lsTokenKey, token); // Store status in sessionStorage
  }
  Log(`Token stored: ${!!token}, Authenticated: ${isAuthorized}`);
  return isAuthorized;
}

export function clearLocalToken(): void {
  localStorage.removeItem(lsTokenKey);
}

export function getLocalToken(): string | null {
  return localStorage.getItem(lsTokenKey);
}

export function getUserName(): string | null {
  const token = getLocalToken();
  if (!token) {
    return null;
  } else {
    const decoded = jwtDecode<CustomJWTPayload>(token);
    return decoded.username;
  }
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
    Log("Getting local token: No token found");
    return defaultReturnValue;
  }

  try {
    const decoded = jwtDecode<CustomJWTPayload>(token);
    Log(`Decoded is: ${JSON.stringify(decoded)}`);
    if (!decoded || (decoded.exp && decoded.exp * 1000 <= Date.now())) { // Token could not be decoded or is expired
      Log(decoded ? "Token expired!" : "Token could not be decoded");
      clearLocalToken(); // Cleanup invalid or expired token
      return defaultReturnValue;
    }

    // Token is valid and not expired
    Log("Token is valid");
    return {
      decoded,
      token,
    };
  } catch (er) {
    Log(`Invalid token: ${er}`, 'error');
    clearLocalToken();
  }

  return defaultReturnValue;
}


export function checkAuthStatus(): boolean {
  Log("Checking status!");

  const { decoded, token } = getToken();

  if (!token) {
    Log("No token found");
    return false;
  }

  if (decoded) {
    Log("Token is valid and not expired");
    return true;
  } else {
    Log("Token is invalid or expired");
    return false;
  }
}
