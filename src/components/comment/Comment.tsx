import CommentHeader from "./CommentHeader";
import CommentBody from "./CommentBody";
import CommentScore from "./CommentScore";
import CommentActions from "./CommentActions";
import { Comment as CommentProps } from "../../types";

const Comment = ({
  score,
  user,
  createdAt,
  content,
  replyingTo,
  replies,
}: CommentProps) => {
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

        <CommentActions />

        <div className="col-span-2 row-start-2   md:col-start-2">
          <CommentBody content={content} replyingTo={replyingTo} />
        </div>

      </div>

      {replies && (
        <div className=" pl-6 ml-4 border-l-2 border-gray-300">
          {replies.map((reply) => (
            <Comment
              key={reply.id}
              id={reply.id}
              score={reply.score}
              user={reply.user}
              createdAt={reply.createdAt}
              content={reply.content}
              replyingTo={reply.replyingTo}
              replies={reply.replies}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Comment;
