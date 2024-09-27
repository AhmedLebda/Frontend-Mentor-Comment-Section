import { useCommentsContext } from "../../contexts/CommentsProvider"
import { useCurrentUser } from "../../contexts/CurrentUser"
import { Comment } from "../../types"
import Avatar from "../general/Avatar"
import { useForm, SubmitHandler } from "react-hook-form"
interface Input {
    "comment": string
}

interface AddComment {
    action: 'comment'
}
interface AddReply {
    action: 'reply'
    id: number
    replyingTo: string
    handleSubmitReply: () => void
}

interface EditComment {
    action: 'edit'
    id: number
    content: string
    handleSubmitEdit: () => void
}

type AddCommentProps = AddComment | AddReply | EditComment;

const AddComment = (props: AddCommentProps) => {
    const { currentUser } = useCurrentUser();

    const { addComment, replyComment, updateComment } = useCommentsContext();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<Input>()

    const showCancelButton = props.action === 'reply' || props.action === 'edit'

    const submit: SubmitHandler<Input> = (data) => {

        const commentObject: Comment = {
            id: Date.now(),
            content: data.comment,
            createdAt: new Date().toISOString(),
            score: 0,
            replies: [],
            user: currentUser,
        }
        if (props.action === "reply") {
            const { id, handleSubmitReply } = props
            commentObject.replyingTo = props.replyingTo
            replyComment(id, commentObject)
            handleSubmitReply()
        }
        else if (props.action === 'edit') {
            const { id, handleSubmitEdit } = props
            updateComment(id, data.comment)
            handleSubmitEdit()
        } else {
            addComment(commentObject)
        }

        reset()
    };

    let submitButtonText: string = 'Submit'
    if (props.action === 'edit') {
        submitButtonText = "Save"
    } else if (props.action === 'reply') {
        submitButtonText = "Reply"
    }
    const handleCancelClick = () => {
        if (props.action === 'reply') {
            props.handleSubmitReply()
        } else if (props.action === 'edit') {
            props.handleSubmitEdit()
        }
    }
    return (

        <form onSubmit={handleSubmit(submit)} className=" bg-white p-4  rounded-md mb-4 grid grid-cols-2 md:grid-cols-[auto_1fr_auto] items-start gap-6">
            <Avatar src={currentUser.image.png} alt={currentUser.username} />
            <div className="col-span-2 row-start-1 md:col-span-1 md:col-start-2">
                <textarea defaultValue={props.action === "edit" ? props.content : undefined} {...register("comment", { required: true })} id="comment" placeholder={`Add a ${props.action === 'comment' ? "Comment" : "Reply"}...`} rows={4} className="border p-2 rounded-md  w-full"></textarea>
                {errors["comment"] && <span>This field is required</span>}
            </div>
            <div className="justify-self-end flex flex-col gap-4">
                <button className="bg-blue-800 text-white py-2 px-6 rounded-md capitalize ">{submitButtonText}</button>
                {showCancelButton && <button type="button" className="bg-red-700 text-white py-2 px-6 rounded-md capitalize" onClick={handleCancelClick}>cancel</button>}
            </div>
        </form>
    )
}

export default AddComment