interface CommentScoreProps {
  likes: number;
}
const CommentScore = ({ likes }: CommentScoreProps) => {
  return (
    <div className="flex md:flex-col justify-center gap-4 items-center p-1 bg-gray-200 rounded-md font-bold w-3/4 md:min-w-10">
      <button className="text-gray-500 text-lg">+</button>
      <span className="text-blue-900">{likes}</span>
      <button className="text-gray-500 text-lg">-</button>
    </div>
  );
};

export default CommentScore;
