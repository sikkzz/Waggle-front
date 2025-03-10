import { useState, useEffect, useRef } from "react";

import HeartEmptyIcon from "@/assets/svg/ic-heart-empty.svg?react";

import { Flex, Box, Divider, Text, Carousel } from "@/components/common";
import Comment from "@/components/Story/StoryDetail/Comment/Comment";
import CommentInput from "@/components/Story/StoryDetail/Comment/CommentInput";
import DeleteWarningModal from "@/components/Story/StoryDetail/DeleteWarningModal/DeleteWarningModal";
import Profile from "@/components/Story/StoryDetail/Profile/Profile";
import StoryEdit from "@/components/Story/StoryUpload/StoryEdit/StoryEdit";

import { useCommentQuery } from "@/hooks/api/useCommentQuery";
// import { useEditCommentMutation } from "@/hooks/api/useEditCommentMutation";
import { usePostCommentMutation } from "@/hooks/api/usePostCommentMutation";
import { useStoryQuery } from "@/hooks/api/useStoryQuery";
import useModal from "@/hooks/useModal";

import { getDefaultTextStyle } from "@/styles/getDefaultTextStyle";
import { Theme } from "@/styles/Theme";

import { convertToUTC } from "@/utils/convertToUTC";

import {
	layoutStyle,
	sliderBoxStyle,
	contentBoxStyle,
	commentLayoutStyle,
} from "@/components/Story/StoryDetail/StoryDetail.style";

const StoryDetail = ({ storyId }: { storyId: number }) => {
	const { storyData } = useStoryQuery(storyId);

	console.log(storyData);

	const { commentData } = useCommentQuery(0, storyId);

	const postCommentMutation = usePostCommentMutation();
	// const editCommentMutation = useEditCommentMutation();

	const [createdDate, setCreatedDate] = useState("");
	const [content, setContent] = useState("");
	const [mentionedMemberList] = useState<string[]>(["test"]);

	const commentInputRef = useRef<HTMLInputElement>(null);

	const modal = useModal();

	const handleAddComment = () => {
		postCommentMutation.mutate(
			{ content, mentionedMemberList, boardId },
			{
				onSuccess: () => {
					setContent("");
				},
			},
		);
	};

	const handleEditComment = () => {
		if (!commentInputRef.current) return;

		commentInputRef.current.focus();
		setContent("asf");
	};

	const handleDeleteStory = () => {
		modal.openModal({
			key: `DeleteWarningModal`,
			component: () => <DeleteWarningModal targetId={storyId} target="story" />,
			isUpper: true,
			notCloseIcon: true,
		});
	};

	const handleEditStory = () => {
		if (!storyData) return;

		modal.closeModal();

		modal.openModal({
			key: `StoryEditModal`,
			component: () => (
				<StoryEdit
					imgUrls={storyData.result.mediaList}
					prevContent={storyData.result.content}
					storyId={storyData.result.boardId}
				/>
			),
		});
	};

	useEffect(() => {
		if (storyData) {
			const date = new Date(storyData.result.createdDate);

			setCreatedDate(convertToUTC(date).date);
		}
	}, [storyData]);

	if (!storyData) {
		return <div>로딩중...</div>;
	}

	if (!commentData) {
		return <div>로딩중...</div>;
	}

	const boardId = storyData.result.boardId;
	const ownerId = storyData.result.member.memberId;

	return (
		<>
			{storyData && (
				<Flex css={layoutStyle}>
					{/* 미디어 영역 */}
					<Flex css={sliderBoxStyle}>
						<Carousel
							width={740}
							height={726}
							borderRadius="36px 0 0 36px"
							showArrows={storyData.result.mediaList.length > 1}
							showDots={storyData.result.mediaList.length > 1}
							length={storyData.result.mediaList.length}
						>
							{storyData.result.mediaList.map((imgUrl, index) => (
								<Carousel.Item index={index} key={imgUrl}>
									<img src={imgUrl} alt="img" />
								</Carousel.Item>
							))}
						</Carousel>
					</Flex>

					{/* 본문 영역 */}
					<Flex styles={{ direction: "column" }}>
						<Flex css={contentBoxStyle}>
							{/* 프로필 영역 */}
							<Profile
								img={storyData.result.member.profileImgUrl}
								nickname={storyData.result.member.nickname}
								editClick={handleEditStory}
								deleteClick={handleDeleteStory}
								ownerId={ownerId}
							/>

							{/* 콘텐츠 본문 영역 */}
							<Box styles={{ maxWidth: "270px" }}>
								<Text css={getDefaultTextStyle(Theme.color.input_text, 500)}>
									{storyData.result.content}
								</Text>
							</Box>

							{/* 게시 날짜 영역 */}
							<Flex styles={{ justify: "flex-end", width: "100%" }}>
								<Text size="xSmall" css={getDefaultTextStyle(Theme.color.readonly_text, 500)}>
									{createdDate}
								</Text>
							</Flex>
						</Flex>

						{/* 구분선 */}
						<Divider length="309px" />

						{/* 코멘트 영역 */}
						<Box css={commentLayoutStyle}>
							{commentData.result.commentList.map((comment) => (
								<Comment
									key={comment.commentId}
									commentId={comment.commentId}
									content={comment.content}
									createdDate={comment.createdDate}
									member={comment.member}
									handleEditClick={handleEditComment}
								/>
							))}
						</Box>

						<Divider length="309px" />

						{/* 코멘트 작성 영역 */}
						<Flex styles={{ direction: "column", gap: "10px", padding: "15px 24px" }}>
							<Flex styles={{ align: "center", gap: "2px" }}>
								<HeartEmptyIcon />

								<Text size="small" css={getDefaultTextStyle(Theme.color.disabled_text, 600)}>
									{storyData.result.recommendationInfo.recommendCount}
								</Text>
							</Flex>

							<CommentInput
								width="260px"
								placeholder="댓글 작성"
								handleAddButton={handleAddComment}
								content={content}
								setContent={setContent}
								commentInputRef={commentInputRef}
							/>
						</Flex>
					</Flex>
				</Flex>
			)}
		</>
	);
};

export default StoryDetail;
