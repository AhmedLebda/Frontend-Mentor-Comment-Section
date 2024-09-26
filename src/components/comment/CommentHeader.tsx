import { useCurrentUser } from "../../contexts/CurrentUser";
import Avatar from "../general/Avatar";
interface CommentHeaderProps {
  avatar: string;
  username: string;
  timestamp: string;
}

const CommentHeader = ({ avatar, username, timestamp }: CommentHeaderProps) => {
  const { currentUser } = useCurrentUser();
  return (
    <div className="flex items-center gap-4 ">

      <Avatar src={avatar} alt={username} />
      {currentUser.username === username && <span className=" bg-blue-800 text-white rounded-md text-sm py-1 px-3">you</span>}
      <a href={`#${username}`} className="font-bold capitalize text-lg">
        {username}
      </a>
      <span className="text-gray-800">{timestamp}</span>

    </div>
  );
};

export default CommentHeader;
