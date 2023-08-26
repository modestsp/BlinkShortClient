import { CreateUrlResponse, DeleteUrlRequest, GetUrlsResponse } from "@/types"


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

const getUrls = async (userId: string):Promise<GetUrlsResponse>  => {
    const jwt = localStorage.getItem("jwt");
    return await (await fetch(`${import.meta.env.VITE_API_BASE_URL}/user/${userId}`, {
        method: "GET",
        headers: {...headers, Authorization: jwt ? `Bearer ${jwt}`: ""}
    })).json()
}

const deleteUrl = async ({urlId, userId}: DeleteUrlRequest) => {
    const jwt = localStorage.getItem("jwt");
    return await (await fetch(`${import.meta.env.VITE_API_BASE_URL}/${userId}/${urlId}`, {
        method: "DELETE",
        headers: {...headers, Authorization: jwt ? `Bearer ${jwt}`: ""},
        body: JSON.stringify({urlId, userId})
    })).json()
}

export {
    createUrl,
    getUrls,
    deleteUrl
}