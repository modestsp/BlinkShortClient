import { useMutation, useQueryClient} from "react-query"
import { DeleteUrlRequest} from "../types"
import { deleteUrl } from "@/services/url";

export const useDeleteUrl= () => {
    const queryClient = useQueryClient();

    return useMutation((deleteRequest: DeleteUrlRequest) => deleteUrl(deleteRequest), {
        onSuccess: () => {
            queryClient.invalidateQueries("urls");   
        }
    })
}