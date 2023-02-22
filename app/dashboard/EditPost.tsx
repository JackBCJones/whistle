'use client'

import Image from "next/image"
import { useState } from "react"
import Toggle from "./Toggle"
import axios from "axios"
import { useQueryClient, useMutation } from "@tanstack/react-query"
import { toast } from "react-hot-toast"


type EditProps = {
    id: string
    title: string
    avatar: string
    name: string
    comment?: {
        id: string
        postId: string,
        userId: string,
}[]
}
export default function EditPost({
    avatar, 
    name, 
    title, 
    comment, 
    id,
}: EditProps){

    // toggle 
    const [toggle, setToggle] = useState(false)
    let deleteToastID: string 
    const queryClient = useQueryClient()

    // delete post

    const { mutate } = useMutation(
        async (id: string) => 
            await axios.delete('/api/posts/deletePost', {data: id}),
            {
                onError: (error) => {
                    console.log(error)
                    toast.error("Error deleting post", {id: deleteToastID})
                },
                onSuccess: (data) => {
                    toast.success("deleted post", {id: deleteToastID})
                    queryClient.invalidateQueries(['auth-posts'])
                },
            }
            
    )

    const deletePost = () => {
        deleteToastID = toast.loading("Deleting Post", {id: deleteToastID})
        mutate(id)
    }

    return (
    <>
        <div className="bg-white my-8 p-8 rounded-lg">
            <div className="flex items-center gap-2">
                <Image className="rounded-full" width={32} height={32} src={avatar} alt="avatar"/>
                <h3 className="font-bold text-gray-700">{name}</h3>
            </div>
            <div className="my-8">
                <p className="break-all">{title}</p>
            </div>
            <div className="flex items-center gap-4">
                <p className="text-sm font-bold text-gray-700">{comment?.length} Comments</p>
                <button onClick={() => setToggle(!toggle)} className="text-sm p-3 bg-red-500 rounded-xl">Delete</button>
            </div>
        </div>
        {toggle && <Toggle handleDelete={deletePost} handleToggle={setToggle}/>}
    </>

    )
}