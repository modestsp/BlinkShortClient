import { CreateUrlResponse } from "@/types"


const headers = { 
    "Content-Type": "application/json",
}

const createUrl = async (url: string, userId?: string): Promise<CreateUrlResponse> => {
    const jwt = localStorage.getItem("jwt");
    return await (await fetch(`${import.meta.env.VITE_API_BASE_URL}/create`, {
        method: "POST",
        headers: {...headers, Authorization: jwt ? `Bearer ${jwt}`: ""},
        body: JSON.stringify({url, userId})
    })).json()
}

export {
    createUrl
}