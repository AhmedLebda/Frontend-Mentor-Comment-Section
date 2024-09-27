import { useCommentsContext } from "../../contexts/CommentsProvider";
import { useCurrentUser } from "../../contexts/CurrentUser"

interface CommentActionsProps { username: string, id: number, handleReply: (id: number) => void, handleEdit: (id: number) => void }

const CommentActions = ({ username, id, handleReply, handleEdit }: CommentActionsProps) => {
    const { currentUser } = useCurrentUser();
    const { removeComment } = useCommentsContext();


    if (currentUser.username !== username)
        return <button className="font-bold text-blue-900" onClick={() => handleReply(id)}>Reply</button>


    return (
        <div className="flex items-center md:items-start justify-end gap-6">
            <button className="font-bold text-red-600" onClick={() => removeComment(id)}>Delete</button>
            <button className="font-bold text-blue-900" onClick={() => handleEdit(id)}>Edit</button>
        </div>)
}

export default CommentActions