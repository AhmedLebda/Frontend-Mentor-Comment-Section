import { useCommentsContext } from "../../contexts/CommentsProvider";
import Comment from "./Comment";
import { Comment as CommentType } from "../../types";
import { useState } from "react";
import AddComment from "../add-comment/AddComment";

const CommentsList = () => {
  const { comments } = useCommentsContext();
  const [replyToCommentId, setReplyToCommentId] = useState<null | number>(null);
  const [editCommentId, setEditCommentId] = useState<null | number>(null)


  const handleReplyClick = (id: number) => {
    setReplyToCommentId(id);
    setEditCommentId(null);
  };

  const handleSubmitReply = () => {
    setReplyToCommentId(null);
  };

  const handleEditClick = (id: number) => {
    setEditCommentId(id);
    setReplyToCommentId(null);
  }

  const handleSubmitEdit = () => {
    setEditCommentId(null);
  }

  const renderComments = (comments: CommentType[]) => {
    return comments.map((comment) => {
      return (
        <div key={comment.id}>
          {editCommentId === comment.id ?
            <AddComment action="edit" id={comment.id} handleSubmitEdit={handleSubmitEdit} content={comment.content} />
            : <Comment {...comment} onReplyClick={handleReplyClick} onEditClick={handleEditClick} />}
          {replyToCommentId === comment.id && (
            <AddComment action="reply" id={comment.id} handleSubmitReply={handleSubmitReply} replyingTo={comment.user.username} />
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
