import { createUrl } from "@/services/url";
import { CreateUrlRequest, CreateUrlResponse } from "@/types";
import { useMutation, useQueryClient } from "react-query";


export const useCreateUrl= () => {

    return useMutation((request: CreateUrlRequest) => createUrl(request.url, request.userId), {
        onSuccess: () => {
            console.log("CREATED SUCCESFULLY");
        }
        // onSuccess: (data: CreateUrlResponse) => {
        //     return data
        // }
    })
}