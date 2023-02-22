'use client'

type ToggleProps = {
    handleDelete: () => void
    handleToggle: (toggle: boolean) => void
}


export default function Toggle({handleDelete, handleToggle}: ToggleProps) {
    return (
        <div onClick={(e) => {handleToggle(false)}} className="fixed bg-black/50 w-full h-full z-20 left-0 top-0">
            <div className="absolute bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-12 rounded-lg flex flex-col gap-6">
                <h2 className="text-xl">
                    Are you sure you want to delete this post? 🥲
                </h2>
                <h3 className="text-red-600 text-sm">
                    Pressing the delete button will permanently delete your post
                </h3>
                <button onClick={handleDelete} className="bg-red-600 text-sm text-white py-2 px-4 rounded-lg">
                    Delete Post
                </button>
            </div>
        </div>
    )
}