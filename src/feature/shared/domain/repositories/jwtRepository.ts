interface returnVerifyToken{
  uuid: string 
}
export interface JWTRepository {
  sign: (payload: object,jwt_scret: string, jwt_expire:{}) => Promise<string | any>
  verify: (token: string,jwt_scret:string) => Promise<returnVerifyToken | any>
}
