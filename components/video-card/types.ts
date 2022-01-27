export interface TagProps {
    id: string;
    name: string
}
export interface VideoCardProps {
    img: string;
    title?: string;
    user?: string
    description?: string;
    tags?: TagProps[]   
    shimmer?: boolean;
}