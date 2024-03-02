import { useState, useRef } from "react";

import PlusIcon from "@/assets/svg/ic-gallery-plus.svg?react";
import LeftArrowIcon from "@/assets/svg/ic-left-arrow-primary.svg?react";
import GalleryIcon from "@/assets/svg/ic-many-media.svg?react";

import { Flex, Text } from "@/components/common";
import GallerySlider from "@/components/Story/StoryUpload/GallerySlider";

import useClickOutSide from "@/hooks/useClickOutSide";

import { getDefaultTextStyle } from "@/styles/getDefaultTextStyle";
import { Theme } from "@/styles/Theme";

import {
	layoutStyle,
	headerStyle,
	imgBoxStyle,
	galleryIconBoxStyle,
	galleryBoxStyle,
	galleryPlusIconBoxStyle,
} from "@/components/Story/StoryUpload/UploadCut.style";

const UploadCut = ({ medias }: { medias: string[] }) => {
	const [mediaCurrentIndex, setMediaCurrentIndex] = useState(0);
	const [isGalleryOpen, setIsGalleryOpen] = useState(false);
	const [fileURL, setFileURL] = useState<string[]>(medias);

	const galleryRef = useRef<HTMLDivElement>(null);

	useClickOutSide(galleryRef, () => setIsGalleryOpen(false));

	const handleChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.currentTarget.files;
		const imgUrlList: string[] = [];

		if (!files) {
			return;
		}

		for (let i = 0; i < files.length; i++) {
			const img = new Image();
			img.src = URL.createObjectURL(files[i]);
			imgUrlList.push(img.src);
		}

		setFileURL((prev) => [...prev, ...imgUrlList]);
	};

	return (
		<Flex css={layoutStyle}>
			<Flex css={headerStyle}>
				<LeftArrowIcon />
				<Text size="xLarge" css={getDefaultTextStyle(Theme.color.text, 600)}>
					자르기
				</Text>
			</Flex>

			<Flex css={imgBoxStyle}>
				<img src={fileURL[mediaCurrentIndex]} alt="sample" />

				<div css={galleryIconBoxStyle} ref={galleryRef}>
					<GalleryIcon onClick={() => setIsGalleryOpen((prev) => !prev)} />

					{isGalleryOpen && (
						<Flex css={galleryBoxStyle}>
							<GallerySlider
								medias={fileURL}
								mediaCurrentIndex={mediaCurrentIndex}
								setMediaCurrentIndex={setMediaCurrentIndex}
							/>

							<label css={galleryPlusIconBoxStyle} htmlFor="media">
								<PlusIcon />
							</label>
							<input
								type="file"
								multiple
								id="media"
								onChange={handleChangeImg}
								accept="image/jpeg, image/png, image/heic, image/heif"
							/>
						</Flex>
					)}
				</div>
			</Flex>
		</Flex>
	);
};

export default UploadCut;
