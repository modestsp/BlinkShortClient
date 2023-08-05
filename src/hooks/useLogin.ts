import { useMutation, useQueryClient} from "react-query"
import { login } from "../services/auth"
import { UserLoginRequest } from "../utils/types"


export const useLogin = () => {
    const queryClient = useQueryClient();

    return useMutation((loginRequest: UserLoginRequest) => login(loginRequest), {
        onSuccess: (data) => {
            console.log('ACA LA DATA', data);
            queryClient.setQueryData(['currentUser'], data.response)
        }
    })
}