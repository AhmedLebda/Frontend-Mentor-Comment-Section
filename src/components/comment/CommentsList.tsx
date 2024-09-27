import { useCommentsContext } from "../../contexts/CommentsProvider";
import Comment from "./Comment";
import { Comment as CommentType } from "../../types";
import { useState } from "react";
import AddComment from "../add-comment/AddComment";

const CommentsList = () => {
  const { comments } = useCommentsContext();
  const [replyToCommentId, setReplyToCommentId] = useState<null | number>(null);

  const handleReplyClick = (id: number) => {
    setReplyToCommentId(id);
  };

  const handleSubmitReply = () => {
    setReplyToCommentId(null);
  };

  const renderComments = (comments: CommentType[]) => {
    return comments.map((comment) => {
      return (
        <div key={comment.id}>
          <Comment {...comment} onReplyClick={handleReplyClick} />
          {replyToCommentId === comment.id && (
            <AddComment action="reply" id={comment.id} handleSubmitReply={handleSubmitReply} />
          )}
          {comment.replies.length > 0 && (
            <div className="pl-6 ml-4 border-l-2 border-gray-300">
              {renderComments(comment.replies)}
            </div>
          )}
        </div>
      );
    });
  }

  return (
    <>
      {renderComments(comments)}
    </>
  );
};

export default CommentsList;
