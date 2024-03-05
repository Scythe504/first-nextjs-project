import { SignJWT, importJWK } from "jose"


const generateJwt = async (payload:any)=>{
    const secret = process.env.JWT_SECRET;
    const jwk = importJWK({k: secret, alg: 'HS256', kty: 'oct'})
    const jwt = new SignJWT(payload).setProtectedHeader({alg:'HS256'})
}