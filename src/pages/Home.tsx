import AddComment from "../components/add-comment/AddComment"
import CommentsList from "../components/comment/comments_list/CommentsList"
import { useCommentsContext } from "../contexts/CommentsProvider";

const Home = () => {
    const { comments } = useCommentsContext();
    return (
        <>
            <CommentsList comments={comments} />
            <AddComment action={"comment"} />
        </>
    )
}

export default Home