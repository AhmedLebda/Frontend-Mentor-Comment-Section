import Avatar from "../general/Avatar"
import { useForm, SubmitHandler } from "react-hook-form"

interface AddCommentProps {
    src: string;
    alt: string;
    onSubmit: (comment: string) => void;
}

interface Input {
    "comment": string
}

const AddComment = ({ src, alt, onSubmit }: AddCommentProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<Input>()

    const submit: SubmitHandler<Input> = (data) => {
        onSubmit(data.comment);
        reset()
    };

    return (

        <form onSubmit={handleSubmit(submit)} className=" bg-white p-4  rounded-md mb-4 grid grid-cols-2 md:grid-cols-[auto_1fr_auto] items-start gap-6">
            <Avatar src={src} alt={alt} />
            <div className="col-span-2 row-start-1 md:col-span-1 md:col-start-2">
                <textarea {...register("comment", { required: true })} id="comment" placeholder="Add a comment..." rows={4} className="border p-2 rounded-md  w-full"></textarea>
                {errors["comment"] && <span>This field is required</span>}
            </div>
            <button className="bg-blue-800 text-white py-2 px-6 rounded-md uppercase justify-self-end">send</button>
        </form>
    )
}

export default AddComment