import Avatar from "../general/Avatar";
interface CommentHeaderProps {
  avatar: string;
  username: string;
  timestamp: string;
}

const CommentHeader = ({ avatar, username, timestamp }: CommentHeaderProps) => {
  return (
    <div className="flex items-center gap-4 ">

      <Avatar src={avatar} alt={username} />
      <a href={`#${username}`} className="font-bold capitalize text-lg">
        {username}
      </a>
      <span className="text-gray-800">{timestamp}</span>

    </div>
  );
};

export default CommentHeader;
