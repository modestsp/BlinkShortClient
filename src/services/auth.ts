import { UserLoginRequest, UserLoginResponse } from "../types";

const headers = { 
    "Content-Type": "application/json",
}

const login = async ({username, password}: UserLoginRequest): Promise<UserLoginResponse> => {
    console.log(username, password);
    return await (await fetch(`${import.meta.env.VITE_API_BASE_URL}/user/login`,
    {
        method: "POST",
        headers,
        body: JSON.stringify({username, password})
    })).json()    
}

export {
    login
}