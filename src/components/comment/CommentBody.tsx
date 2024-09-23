interface CommentBodyProps {
  content: string;
  replyingTo?: string;
}

const CommentBody = ({ content, replyingTo }: CommentBodyProps) => {
  if (replyingTo !== undefined) {
    return (
      <p className="text-gray-700">
        <a href={`#${replyingTo}`} className="text-blue-900 mr-2 font-bold">
          @{replyingTo}
        </a>
        {content}
      </p>
    );
  }
  return <p>{content}</p>;
};

export default CommentBody;
