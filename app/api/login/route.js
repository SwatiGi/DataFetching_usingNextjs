import { NextResponse } from "next/dist/server/web/spec-extension/response"
import { signToken } from "../../lib/auth"

export async function POST(reqest) {

    const { email, password } = await reqest.json()
    if (email != "abc@gmail.com" && password != "abc123") {
    return NextResponse.json({error:"Invalid Credentials"},{status:401})
    }
    let token = signToken({ email, "role": "user" })
    let res = NextResponse.json({ message: "Login Successful" })
    res.cookies.set("token", token, {
        httpOnly: true,
        maxAge: 60 * 60,
        path:"/product"
    })
    return res
}