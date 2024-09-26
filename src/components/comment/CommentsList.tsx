import Comment from ".//Comment";
import { useCommentsContext } from "../../contexts/CommentsProvider";


const CommentsList = () => {
  const { comments } = useCommentsContext();
  return (
    <>
      {comments.map((comment) => {
        return <Comment key={comment.id} {...comment} />;
      })}
    </>
  );
};

export default CommentsList;
