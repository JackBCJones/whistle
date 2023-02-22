export type AuthPosts = {
    email: string;
    id: string;
    image: string;
    name: string;
    Post: {
        createdAt: string;
        id: string;
        title: string;
        Comment?: {
            createdAt: string;
            id: string;
            postId: string;
            userId: string;
            title: string;
        }[]
    }[]
}