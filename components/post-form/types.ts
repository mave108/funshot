export interface PostProps{
    
}

export interface Tag{
    name: string;
    id: string;
    isNew?: boolean;
    alert?: boolean;
}

export interface PostData{
    id: string,
    media_id: string;
    s3_url: string;
    uid: number;
    title: string;
    description: string,
    tags: Tag[],
    video: Blob
}