interface Result<T> {
    isSuccess: boolean
    response: T
    errors: string[]
}

interface Url{
  id: number
  originalUrl: string
  shortUrl: string
  createdAt: string
}

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

export type User = Omit<UserFromJwt, 'exp' | 'aud' | 'iss' | 'jti' | 'role'> 


export interface UserLoginRequest {
    username: string
    password: string
}

export interface CreateUrlRequest {
  url: string
  userId?: string
}


export type UserLoginResponse = Result<string> 
export type CreateUrlResponse = Result<Omit<Url, 'originalUrl'>>

