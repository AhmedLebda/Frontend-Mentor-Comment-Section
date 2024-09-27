import CommentHeader from "./CommentHeader";
import CommentBody from "./CommentBody";
import CommentScore from "./CommentScore";
import CommentActions from "./CommentActions";
import { Comment as CommentProps } from "../../types";

interface CommentActions { onReplyClick: (id: number) => void, onEditClick: (id: number) => void }

const Comment = ({
  id,
  score,
  user,
  createdAt,
  content,
  replyingTo,
  onReplyClick,
  onEditClick
}: CommentProps & CommentActions) => {



  return (
    <>
      <div className=" bg-white p-4 rounded-md mb-4 grid grid-cols-2 md:grid-cols-[auto_1fr_auto] md:grid-rows-[auto_1fr] gap-3">
        <div className="row-span-2">
          <CommentScore likes={score} />
        </div>

        <div className="col-span-2 row-start-1 md:col-span-1 md:col-start-2">
          <CommentHeader
            username={user.username}
            avatar={user.image.png}
            timestamp={createdAt}
          />
        </div>

        <CommentActions username={user.username} id={id} handleReply={onReplyClick} handleEdit={onEditClick} />

        <div className="col-span-2 row-start-2   md:col-start-2">
          <CommentBody content={content} replyingTo={replyingTo} />
        </div>

      </div>

    </>
  );
};

export default Comment;
