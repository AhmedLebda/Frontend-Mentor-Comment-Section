import { Link, useParams } from "react-router-dom"
import { useCommentsContext } from "../contexts/CommentsProvider";
import { Comment as CommentType } from "../types";
import CommentsList from "../components/comment/comments_list/CommentsList";

const Replies = () => {
    const { id } = useParams<{ id: string }>();
    const { comments } = useCommentsContext();


    const findComment = (comments: CommentType[], id: number | undefined): CommentType | undefined => {
        if (id === undefined) return;
        for (const comment of comments) {
            if (comment.id === id) {
                return comment;
            }
            if (comment.replies.length) {
                const foundInReplies = findComment(comment.replies, id);
                if (foundInReplies) {
                    return foundInReplies;
                }
            }
        }
        return undefined;
    };


    const comment = findComment(comments, Number(id))

    if (!comment) return <div>Comment not found</div>;

    return (
        <div className="container max-w-xl md:max-w-4xl mx-auto px-4 py-12">

            <Link to="/" className="font-bold text-gray-600 mb-4 block"> &lt;== Home</Link>
            <h1 className="text-2xl font-bold text-gray-800 font-serif mb-4 italic">Replies:</h1>
            <CommentsList comments={[comment]} />

        </div>
    )
}

export default Replies