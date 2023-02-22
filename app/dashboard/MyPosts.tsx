'use client'


import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { AuthPosts } from "../types/AuthPosts"
import EditPost from "./EditPost"


const fetchAuthPosts = async () => {
    const response = await axios.get('/api/posts/authPosts')
    return response.data
}

export default function myPosts() {
    const {data, isLoading} = useQuery<AuthPosts>({
        queryFn: fetchAuthPosts,
        queryKey: ["auth-posts"],
    })
    // if (isLoading) {return <h3>...Loading</h3>}
    return (
        <div>
            {data?.Post?.map((post) => (
            <EditPost 
            id={post.id} 
            key={post.id} 
            title={post.title} 
            comment={post.Comment} 
            avatar={data.image} 
            name={data.name}
            />
            ))}
        </div>
    )
}