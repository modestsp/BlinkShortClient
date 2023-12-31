import { UserLoginRequest, UserLoginResponse, UserRegisterRequest, UserRegisterResponse } from "../types";

const headers = { 
    "Content-Type": "application/json",
}

const login = async ({username, password}: UserLoginRequest): Promise<UserLoginResponse> => {
    return await (await fetch(`${import.meta.env.VITE_API_BASE_URL}/user/login`,
    {
        method: "POST",
        headers,
        body: JSON.stringify({username, password})
    })).json()    
}

const register = async ({username, email, password}: UserRegisterRequest): Promise<UserRegisterResponse> => {
    return await (await fetch(`${import.meta.env.VITE_API_BASE_URL}/user/register`,
    {
        method: "POST",
        headers,
        body: JSON.stringify({username, email, password})
    })).json();
}

export {
    login,
    register
}