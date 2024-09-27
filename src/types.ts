export interface User {
	image: {
		png: string;
		webp: string;
	};
	username: string;
}

export interface Comment {
	id: number;
	content: string;
	createdAt: string;
	score: number;
	user: User;
	replies: Comment[];
	replyingTo?: string;
}
export interface Data {
	currentUser: User;
	comments: Comment[];
}

// ** Comment Provider **

export enum CommentActionTypes {
	AddComment = "comments/addComment",
	RemoveComment = "comments/removeComment",
	UpdateComment = "comments/updateComment",
	ReplyComment = "comments/replyComment",
}

export type AddCommentPayload = Comment;
export type RemoveCommentPayload = Comment["id"];
export type UpdateCommentPayload = { id: Comment["id"]; content: string };
export type ReplyCommentPayload = { id: Comment["id"]; comment: Comment };

export interface Action<T extends CommentActionTypes, P> {
	type: T;
	payload: P;
}

export type ActionType =
	| Action<CommentActionTypes.AddComment, AddCommentPayload>
	| Action<CommentActionTypes.RemoveComment, RemoveCommentPayload>
	| Action<CommentActionTypes.UpdateComment, UpdateCommentPayload>
	| Action<CommentActionTypes.ReplyComment, ReplyCommentPayload>;
