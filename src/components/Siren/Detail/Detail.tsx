import { useParams } from "react-router-dom";

import { Flex, Box, Divider } from "@components/common";

import { useSirenQuery } from "@/hooks/api/useSirenQuery";

import { layoutStyle } from "./Detail.style";

import Title from "./Title/Title";
import Content from "./Content/Content";
import Comment from "./Comment/Comment";

const Detail = () => {
	const param = useParams();

	const { siren } = useSirenQuery(Number(param.id));
	const sirenData = siren && siren.result;

	return (
		<Box tag="main">
			{siren && (
				<Flex styles={{ direction: "column" }} css={layoutStyle}>
					<Title
						profileImg={sirenData.profileImg}
						category={sirenData.category}
						title={sirenData.title}
						username={sirenData.username}
						lostDate={sirenData.lostDate}
					/>
					<Divider />
					<Content
						lostLocate={sirenData.lostLocate}
						petKind={sirenData.petKind}
						petGender={sirenData.petGender}
						lostDate={sirenData.lostDate}
						petAge={sirenData.petAge}
						contact={sirenData.contact}
						medias={sirenData.medias}
						content={sirenData.content}
						recommendIt={sirenData.recommendIt}
						recommendCount={sirenData.recommendCount}
					/>
				</Flex>
			)}

			<Divider />

			<Comment />
		</Box>
	);
};

export default Detail;
