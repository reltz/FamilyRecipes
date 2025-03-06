import { mockAuthApi } from "../mocks/apis";
import {jwtDecode, JwtPayload} from 'jwt-decode'

export interface LoginParams {
    username: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    isAuthorized: boolean;
}

export const lsTokenKey = 'familyRecipeToken';

export async function login(params: LoginParams): Promise<boolean> {
    // call auth api here...
    const {token, isAuthorized} = await mockAuthApi(params);
    
    localStorage.setItem(lsTokenKey, token); // Store status in sessionStorage
    console.log("token stored in LS, isAuthorized: ", isAuthorized);
    return Promise.resolve(isAuthorized);
}


export function clearLocalToken(): void {
    localStorage.removeItem(lsTokenKey);
}

export function getLocalToken(): string | null {
   return localStorage.getItem(lsTokenKey);
}

export function checkAuthStatus(): boolean {
    console.log("checking status!");
    const token = getLocalToken();
    if (!token) {
        return false;
    }

    try {
        const payload: JwtPayload = jwtDecode(token);

        const temp = payload.exp! * 1000;
        console.log(`EXP: ${temp}`);
        console.log(`NOW: ${Date.now()}`);
        if (payload.exp && payload.exp * 1000 < Date.now()) {
            console.log("token not expired");
            return true;
          } else {
            localStorage.removeItem("familyRecipeToken"); // Cleanup expired token
            console.log("token expired!");
          }
    }catch(er ){
        console.error("Invalid token:", er);
        localStorage.removeItem("familyRecipeToken"); // Cleanup corrupt token
    }

    return false;
}