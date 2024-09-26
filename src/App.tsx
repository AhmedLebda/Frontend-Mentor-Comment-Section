import AddComment from "./components/add-comment/AddComment";
import CommentsList from "./components/comment/CommentsList";


const App = () => {

  return (
    <div className="bg-gray-200 min-h-screen py-12 ">
      <div className="container max-w-xl md:max-w-4xl mx-auto px-4">
        <CommentsList />
        <AddComment />
      </div>
    </div>
  );
};

export default App;
