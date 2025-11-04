import {SignJWT,jwtVerify} from "jose"

// creating token
let secretKey = new TextEncoder().encode("abcd")
export async function signToken(payload) {
return await new SignJWT(payload).setProtectedHeader({alg:"HS256"}).setExpirationTime("1h").sign(secretKey)
}
// Descript the token and verify
export async function verifyToken(token) {
try {
    const { payload } = await jwtVerify(token, secretKey)
    return payload
} catch (error) {
    return null
}
}