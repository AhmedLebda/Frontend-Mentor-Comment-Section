import { Pencil, Reply, Trash } from "lucide-react";
import { useCommentsContext } from "../../contexts/CommentsProvider";
import { useCurrentUser } from "../../contexts/CurrentUser"

interface CommentActionsProps { username: string, id: number, handleReply: (id: number) => void, handleEdit: (id: number) => void }

const CommentActions = ({ username, id, handleReply, handleEdit }: CommentActionsProps) => {
    const { currentUser } = useCurrentUser();
    const { removeComment } = useCommentsContext();


    if (currentUser.username !== username)
        return <button className="font-bold text-blue-900 flex items-center gap-2" onClick={() => handleReply(id)}>
            <Reply size={20} />
            <span>Reply</span>

        </button>


    return (
        <div className="flex items-center md:items-start justify-end gap-6">
            <button className="font-bold text-red-600 flex items-center gap-2" onClick={() => removeComment(id)}>
                <Trash size={16} />
                <span>Delete</span></button>
            <button className="font-bold text-blue-900 flex items-center gap-2" onClick={() => handleEdit(id)}>
                <Pencil size={16} />
                <span>Edit</span></button>
        </div>)
}

export default CommentActions