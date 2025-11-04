import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
const handler = NextAuth({
    providers: [
        GithubProvider({
            clientId: "Ov23liLnBr33JWZJ0oXC",
            clientSecret:"9f84a684f92fcf420959333b28f03d90838e63be",
        })
    ]
})
export {handler as GET, handler as POST }