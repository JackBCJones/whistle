'use client'

import AddComment from "@/app/components/AddComment"
import Post from "@/app/components/Post"
// import { PostType } from "@/app/types/Post"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import Image from "next/image"

type URL = {
    params: {
        slug: string
    }
}


// fetch all posts 

const fetchDetails = async (slug: string) => {
    const response = await axios.get(`/api/posts/${slug}`)
    return response.data
}

export default function PostDetail(url: URL) {
    const {data, isLoading} = useQuery({
        queryKey: ['detail-post'],
        queryFn: () => fetchDetails(url.params.slug),
    })

    if(isLoading) return "...Loading"
    console.log(data)
    return (
        <div>
            <Post 
            id={data.id} 
            name={data.user.name} 
            avatar={data.user.image} 
            postTitle={data.title} 
            comment={data.Comment}
            />
            <AddComment id={data.id}/>
            {data?.Comment?.map((comment) => (
                <div key={comment.id} className="bg-white my-8 p-8 rounded-lg">
                <div className="flex items-center gap-2">
                    <Image 
                    className="rounded-full"
                    width={32}
                    height={32}
                    src={comment.user?.image}
                    alt="avatar"                
                    />
                    <h3 className="font-bold text-gray-700">
                        {comment?.user?.name}
                    </h3>
                </div>
                <div className="my-3">
                    <p className="break-all">{comment.message}</p>
                </div>
                <div className="my-3">
                    <p className="break-all text-sm">{comment.createdAt}</p>
                </div>
            </div>
            ))}
        </div>
    )
}