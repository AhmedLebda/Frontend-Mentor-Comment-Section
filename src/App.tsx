import AddComment from "./components/add-comment/AddComment";
import CommentsList from "./components/comment/CommentsList";
import data from "../data.json"
import { Data } from "./types";
import { Comment } from "./types";
import { useState } from "react";

const { comments: initialComments, currentUser } = data as Data;


const App = () => {
  const [comments, setComments] = useState<Comment[]>(initialComments)

  const createComment = (comment: string): void => {

    const commentObject: Comment = {
      id: Date.now(),
      content: comment,
      createdAt: new Date().toISOString(),
      score: 0,
      replies: [],
      user: currentUser,
    }
    setComments([...comments, commentObject])
  }

  return (
    <div className="bg-gray-200 min-h-screen py-12 ">
      <div className="container max-w-xl md:max-w-4xl mx-auto px-4">
        <CommentsList comments={comments} />
        <AddComment src={currentUser.image.png} alt={currentUser.username} onSubmit={createComment} />
      </div>
    </div>
  );
};

export default App;
