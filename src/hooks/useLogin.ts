import { useMutation, useQueryClient} from "react-query"
import { login } from "../services/auth"
import { UserFromJwt, UserLoginRequest, UserLoginResponse } from "../utils/types"
import jwt_decode from "jwt-decode";

export const useLogin = () => {
    const queryClient = useQueryClient();

    return useMutation((loginRequest: UserLoginRequest) => login(loginRequest), {
        onSuccess: (data: UserLoginResponse) => {
            const jwt = data.response;
            const decodedJwt: UserFromJwt = jwt_decode(jwt);
            const currentUser = {id: decodedJwt.id, username: decodedJwt.username, email: decodedJwt.email}
            queryClient.setQueryData(['currentUser'], currentUser)
            localStorage.setItem("currentUser", JSON.stringify(currentUser))
        }
    })
}