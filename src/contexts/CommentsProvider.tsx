import { createContext, PropsWithChildren, useContext, useReducer } from "react";
import data from "../../data.json"
import { Comment, Data } from "../types";

const { comments: initialComments } = data as Data;


type ActionType =
    | { type: "comments/addComment", payload: Comment }
    | { type: "comments/removeComment", payload: Comment["id"] }
    | { type: "comments/updateComment", payload: { id: Comment["id"], content: string } }

interface Context {
    comments: Comment[];
    dispatch: React.Dispatch<ActionType>;
}

const CommentsContext = createContext<Context>({ comments: initialComments, dispatch: () => null })

const reducer = (state: Comment[], action: ActionType): Comment[] => {
    switch (action.type) {
        case "comments/addComment":
            return [...state, action.payload]
        case "comments/removeComment":
            return state.filter(comment => comment.id !== action.payload)
        case "comments/updateComment":
            return state.map(comment => comment.id === action.payload.id ? { ...comment, content: action.payload.content } : comment)
        default:
            return state
    }
}

export const CommentsProvider = ({ children }: PropsWithChildren) => {
    const [comments, dispatch] = useReducer(reducer, initialComments)
    return (
        <CommentsContext.Provider value={{ comments, dispatch }}>
            {children}
        </CommentsContext.Provider>
    )
}


export const useCommentsContext = () => {
    const context = useContext(CommentsContext);

    if (!context) {
        throw new Error(
            "useCurrentUser has to be used within <CommentsContext.Provider>"
        );
    }
    const { comments, dispatch } = context

    const addComment = (comment: Comment): void => {
        dispatch({ type: "comments/addComment", payload: comment })
    }

    return { comments, addComment }
}
