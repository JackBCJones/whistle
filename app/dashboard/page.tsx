import { getServerSession } from "next-auth"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { redirect } from "next/navigation"
import MyPosts from "./MyPosts"

export default async function Dashboard(){

    const session = await getServerSession(authOptions)
    if (!session) {
        redirect('/api/auth/signin')
    }
    return (
        <div>
            <h1 className="text-2xl font-bold">
                welcome back {session?.user?.name}
                <MyPosts />
            </h1>
        </div>
    )
}