import AddComment from "../components/add-comment/AddComment"
import CommentsList from "../components/comment/comments_list/CommentsList"
import DropDown from "../components/general/DropDown";
import { useCommentsContext } from "../contexts/CommentsProvider";
import usersData from "../../usersData.json"
import { User } from "../types";

const users = usersData as User[]

const Home = () => {
    const { comments } = useCommentsContext();
    return (
        <div className="container max-w-xl md:max-w-4xl mx-auto px-4 py-12">
            <div className="flex justify-between items-center flex-wrap gap-2 mb-4">
                <h1 className="text-2xl font-bold text-gray-800 font-serif italic">Comments:</h1>
                <DropDown options={users} />
            </div>
            <CommentsList comments={comments} />
            <AddComment action={"comment"} />
        </div>
    )
}

export default Home