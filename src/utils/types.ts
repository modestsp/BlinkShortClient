export interface UserFromJwt{
  username: string
  email: string
  jti: string
  id: string
  role: string
  exp: number
  iss: string
  aud: string
}

export interface UserLoginRequest {
    username: string
    password: string
}

export interface UserLoginResponse {
    isSuccess: boolean
    response: string
    errors: string[]
}

export type User = Omit<UserFromJwt, 'exp' | 'aud' | 'iss' | 'jti' | 'role'> 