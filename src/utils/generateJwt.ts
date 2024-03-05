import { SignJWT, importJWK } from "jose"

export const generateJwt = async (payload:any)=>{
    const secret = process.env.JWT_SECRET;
    const jwk = await importJWK({k: secret, alg: 'HS256', kty: 'oct'})
    const jwt = new SignJWT(payload)
    .setProtectedHeader({alg:'HS256'})
    .setIssuedAt()
    .setExpirationTime('365d')
    .sign(jwk);

    return jwt;
}

