import { useState } from "react";

const useCommentsList = () => {
	const [replyToCommentId, setReplyToCommentId] = useState<null | number>(
		null
	);
	const [editCommentId, setEditCommentId] = useState<null | number>(null);
	const [expandedReplies, setExpandedReplies] = useState<
		Record<number, boolean>
	>({});

	const handleReplyClick = (id: number) => {
		setReplyToCommentId(id);
		setEditCommentId(null);
	};

	const handleSubmitReply = (commentId?: number) => {
		setReplyToCommentId(null);
		if (commentId) {
			setExpandedReplies((prev) => ({
				...prev,
				[commentId]: !prev[commentId],
			}));
		}
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
