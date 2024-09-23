import Comment from ".//Comment";
import { Comment as CommentType } from "../../types";

interface CommentsListProps {
  comments: CommentType[];
}

const CommentsList = ({ comments }: CommentsListProps) => {

  return (
    <>
      {comments.map((comment) => {
        return <Comment key={comment.id} {...comment} />;
      })}
    </>
  );
};

export default CommentsList;
