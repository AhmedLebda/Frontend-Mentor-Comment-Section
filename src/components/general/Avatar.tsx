interface AvatarProps {
    src: string;
    alt: string;
}
const Avatar = ({ src, alt }: AvatarProps) => {
    return (
        <img src={src} alt={`${alt}'s avatar`} className="h-10 w-10" />
    )
}

export default Avatar