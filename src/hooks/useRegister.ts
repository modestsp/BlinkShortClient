import { useMutation, useQueryClient} from "react-query"
import {  register } from "../services/auth"
import { UserFromJwt, UserLoginRequest, UserLoginResponse, UserRegisterRequest } from "../types"
import jwt_decode from "jwt-decode";
import {  useNavigate } from "react-router-dom";

export const useRegister = () => {
    const navigate = useNavigate()
    const queryClient = useQueryClient();

    return useMutation((registerRequest: UserRegisterRequest) => register(registerRequest), {
        onSuccess: (data: UserLoginResponse) => {
            const jwt = data.response ?? "";
            localStorage.setItem("jwt", jwt)
            const decodedJwt: UserFromJwt = jwt_decode(jwt);
            const currentUser = {id: decodedJwt.id, username: decodedJwt.username, email: decodedJwt.email}
            queryClient.invalidateQueries({queryKey: "currentUser"})
            queryClient.removeQueries("currentUser")
            queryClient.setQueryData("currentUser", currentUser)
            localStorage.setItem("currentUser", JSON.stringify(currentUser))
            navigate("/")
            window.location.reload()
        }
    })
}