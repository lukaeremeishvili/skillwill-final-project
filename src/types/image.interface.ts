export interface UnsplashUser {
    id: string;
    username: string;
    name: string;
    profile_image: {
        small: string;
        medium: string;
        large: string;
    };
}

export interface UnsplashUrls {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
}

export interface UnsplashPhoto {
    id: string;
    created_at: string;
    updated_at: string;
    width: number;
    height: number;
    color: string | null;
    blur_hash: string;
    description: string | null;
    alt_description: string | null;
    urls: UnsplashUrls;
    user: UnsplashUser;
    likes: number;
    links: {
        download: string;
        html: string;
    };
}
