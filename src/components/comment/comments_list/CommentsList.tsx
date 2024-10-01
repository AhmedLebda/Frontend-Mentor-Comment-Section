// Components
import Comment from "../Comment";
import AddComment from "../../add-comment/AddComment";
// react-router-dom
import { Link } from "react-router-dom";
// Custom Hooks
import useCommentsList from "./useCommentsList";
// Types
import { Comment as CommentType } from "../../../types";

const CommentsList = ({ comments }: { comments: CommentType[] }) => {
  const {
    replyToCommentId,
    editCommentId,
    expandedReplies,
    handleReplyClick,
    handleSubmitReply,
    handleEditClick,
    handleSubmitEdit,
    toggleReplies,
  } = useCommentsList()

  function sortCommentsByScore(comments: CommentType[]): CommentType[] {
    const sortedComments = comments.sort((a, b) => b.score - a.score);

    sortedComments.forEach(comment => {
      comment.replies = sortCommentsByScore(comment.replies);
    });

    return sortedComments;
  }

  const renderComments = (comments: CommentType[], depth = 0, maxDepth = 2) => {
    return comments.map((comment) => {
      const hasReplies = comment.replies.length > 0;
      const isExpanded = expandedReplies[comment.id];

      return (
        <div key={comment.id} className={`ml-${depth}`}>
          {editCommentId === comment.id ? (
            <AddComment action="edit" id={comment.id} handleSubmitEdit={handleSubmitEdit} content={comment.content} />
          ) : (
            <Comment {...comment} onReplyClick={handleReplyClick} onEditClick={handleEditClick} />
          )}

          {replyToCommentId === comment.id && (
            <AddComment action="reply" id={comment.id} handleSubmitReply={handleSubmitReply} replyingTo={comment.user.username} />
          )}

          {hasReplies && depth < maxDepth && (
            <div>
              <button onClick={() => toggleReplies(comment.id)} className="mb-2 text-sm font-bold text-blue-800">
                {isExpanded ? 'Hide Replies' : 'View Replies'} ({comment.replies.length})
              </button>
              {isExpanded && (
                <div className="pl-6 ml-4 border-l-2 border-gray-300">
                  {renderComments(comment.replies, depth + 1, maxDepth)}
                </div>
              )}
            </div>
          )}
          {depth >= maxDepth && hasReplies && (
            <Link to={`/${comment.id}`} className="block mb-2 text-sm font-bold text-blue-800">
              View More Replies
            </Link>
          )}
        </div>
      );
    });
  };

  return <>{renderComments(sortCommentsByScore(comments))}</>;
};

export default CommentsList;
