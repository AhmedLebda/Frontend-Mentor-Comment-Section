import { Comment as CommentType } from "../../../types";
import { useEffect, useState } from "react";

const useCommentsList = (comments: CommentType[]) => {
	const [replyToCommentId, setReplyToCommentId] = useState<null | number>(
		null
	);
	const [editCommentId, setEditCommentId] = useState<null | number>(null);
	const [expandedReplies, setExpandedReplies] = useState<
		Record<number, boolean>
	>({});

	// Make all replies expanded by default
	useEffect(() => {
		const allExpanded = comments.reduce((acc, comment) => {
			acc[comment.id] = true;
			if (comment.replies.length > 0) {
				comment.replies.forEach((reply) => {
					acc[reply.id] = true;
				});
			}
			return acc;
		}, {} as Record<number, boolean>);

		setExpandedReplies(allExpanded);
	}, [comments]);

	const handleReplyClick = (id: number) => {
		setReplyToCommentId(id);
		setEditCommentId(null);
	};

	const handleSubmitReply = () => {
		setReplyToCommentId(null);
	};

	const handleEditClick = (id: number) => {
		setEditCommentId(id);
		setReplyToCommentId(null);
	};

	const handleSubmitEdit = () => {
		setEditCommentId(null);
	};

	const toggleReplies = (commentId: number) => {
		setExpandedReplies((prev) => ({
			...prev,
			[commentId]: !prev[commentId],
		}));
	};

	return {
		replyToCommentId,
		editCommentId,
		expandedReplies,
		handleReplyClick,
		handleSubmitReply,
		handleEditClick,
		handleSubmitEdit,
		toggleReplies,
	};
};

export default useCommentsList;
