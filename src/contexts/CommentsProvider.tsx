import { createContext, PropsWithChildren, useContext, useReducer } from "react";
import data from "../../data.json"
import { Action, ActionType, Comment, CommentActionTypes, Data, RemoveCommentPayload, ReplyCommentPayload, UpdateCommentPayload, VoteCommentPayload } from "../types";

const { comments: initialComments } = data as Data;

interface Context {
    comments: Comment[];
    dispatch: React.Dispatch<ActionType>;
}

const CommentsContext = createContext<Context>({ comments: initialComments, dispatch: () => null })

function addReply(comments: Comment[], action: Action<CommentActionTypes.ReplyComment, ReplyCommentPayload>): Comment[] {
    return comments.map(comment => {
        // Check if the current comment is the one we're replying to
        if (comment.id === action.payload.id) {
            return {
                ...comment,
                replies: [...comment.replies, action.payload.comment],
            };
        }

        // If the comment has replies, recursively update them
        if (comment.replies) {
            return {
                ...comment,
                replies: addReply(comment.replies, action),
            };
        }

        return comment;
    });
}
function updateComment(comments: Comment[], action: Action<CommentActionTypes.UpdateComment, UpdateCommentPayload>): Comment[] {
    return comments.map(comment => {
        // Check if the current comment is the one we're replying to
        if (comment.id === action.payload.id) {
            return {
                ...comment,
                content: action.payload.content,
            };
        }

        // If the comment has replies, recursively update them
        if (comment.replies.length) {
            return {
                ...comment,
                replies: updateComment(comment.replies, action),
            };
        }

        return comment;
    });
}

function removeComment(comments: Comment[], action: Action<CommentActionTypes.RemoveComment, RemoveCommentPayload>): Comment[] {
    return comments
        .map(comment => {
            // If the current comment matches the ID, return null to filter it out
            if (comment.id === action.payload) {
                return null;
            }

            // If the comment has replies, recursively update them
            if (comment.replies) {
                return {
                    ...comment,
                    replies: removeComment(comment.replies, action),
                };
            }

            // Keep the comment if it doesn't match
            return comment;
        })
        .filter(comment => comment !== null);
}

const voteComment = (comments: Comment[], action: Action<CommentActionTypes.UpVoteComment | CommentActionTypes.DownVoteComment, VoteCommentPayload>): Comment[] => {
    return comments.map(comment => {
        if (comment.id === action.payload) {
            return action.type === CommentActionTypes.UpVoteComment ?
                { ...comment, score: comment.score + 1 }
                : { ...comment, score: comment.score - 1 };
        }
        if (comment.replies) {
            return { ...comment, replies: voteComment(comment.replies, action) };
        }
        return comment;
    });
}

const reducer = (state: Comment[], action: ActionType): Comment[] => {
    switch (action.type) {
        case CommentActionTypes.AddComment:
            return [...state, action.payload]
        case CommentActionTypes.RemoveComment:
            return removeComment(state, action);
        case CommentActionTypes.UpdateComment:
            return updateComment(state, action)
        case CommentActionTypes.ReplyComment:
            return addReply(state, action)
        case CommentActionTypes.UpVoteComment:
            return voteComment(state, action)
        case CommentActionTypes.DownVoteComment:
            return voteComment(state, action)
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
        dispatch({ type: CommentActionTypes.AddComment, payload: comment })
    }
    const removeComment = (id: Comment["id"]): void => {
        dispatch({ type: CommentActionTypes.RemoveComment, payload: id })
    }
    const updateComment = (id: Comment["id"], content: string): void => {
        dispatch({ type: CommentActionTypes.UpdateComment, payload: { id, content } })
    }
    const replyComment = (id: Comment["id"], comment: Comment): void => {
        dispatch({ type: CommentActionTypes.ReplyComment, payload: { id, comment } })
    }
    const voteComment = (id: Comment["id"], Action: "upVote" | "downVote"): void => {
        const type = Action === "upVote" ?
            CommentActionTypes.UpVoteComment :
            CommentActionTypes.DownVoteComment
        dispatch({ type, payload: id })
    }

    return { comments, addComment, removeComment, updateComment, replyComment, voteComment }

}
