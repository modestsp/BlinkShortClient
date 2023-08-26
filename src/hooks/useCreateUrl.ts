import { createUrl } from "@/services/url";
import { CreateUrlRequest } from "@/types";
import { useMutation, useQueryClient } from "react-query";


export const useCreateUrl= () => {
    const queryClient = useQueryClient();
    return useMutation((request: CreateUrlRequest) => createUrl(request.url, request.userId), {
        onSuccess: () => {
            queryClient.invalidateQueries("urls");
        }

    })
}