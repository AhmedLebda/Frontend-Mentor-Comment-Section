import CommentHeader from "./CommentHeader";
import CommentBody from "./CommentBody";
import CommentScore from "./CommentScore";
import CommentActions from "./CommentActions";
import { Comment as CommentProps } from "../../types";

const Comment = ({
  id,
  score,
  user,
  createdAt,
  content,
  replyingTo,
  onReplyClick
}: CommentProps & { onReplyClick: (id: number) => void }) => {
  const { username, image } = user;
  const avatar = image.png;


  return (
    <>
      <div className=" bg-white p-4 rounded-md mb-4 grid grid-cols-2 md:grid-cols-[auto_1fr_auto] md:grid-rows-[auto_1fr] gap-3">
        <div className="row-span-2">
          <CommentScore likes={score} />
        </div>

        <div className="col-span-2 row-start-1 md:col-span-1 md:col-start-2">
          <CommentHeader
            username={username}
            avatar={avatar}
            timestamp={createdAt}
          />
        </div>

        <CommentActions username={user.username} id={id} handleReply={onReplyClick} />

        <div className="col-span-2 row-start-2   md:col-start-2">
          <CommentBody content={content} replyingTo={replyingTo} />
        </div>

      </div>

    </>
  );
};

export default Comment;
