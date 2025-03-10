import { toast } from "react-toastify";

import DefaultProfileImg from "@/assets/png/pet-profile.png";

import { Flex, Text } from "@/components/common";

import { ALLOW_FILE_EXTENSION, FILE_SIZE_MAX_LIMIT } from "@/constants/file";

import { getDefaultTextStyle } from "@/styles/getDefaultTextStyle";
import { Theme } from "@/styles/Theme";

import { fileExtensionValid } from "@/utils/file";

import { imgStyle } from "@/components/SignUp/Pet/SignUpPet.style";
import {
	inputNoneDisplayStyle,
	commonButtonStyle,
	getFormTextStyle,
} from "@/components/SignUp/SignUp.shared.style";

const PetProfile = ({
	fileURL,
	changeFile,
}: {
	fileURL: string;
	changeFile: React.Dispatch<React.SetStateAction<string>>;
}) => {
	const handleChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
		const target = e.currentTarget;
		const files = (target.files as FileList)[0];

		if (files === undefined) {
			return;
		}

		if (!fileExtensionValid(files)) {
			target.value = "";

			toast.error(`업로드 가능한 확장자가 아닙니다. [가능한 확장자 : ${ALLOW_FILE_EXTENSION}]`);

			return;
		}

		if (files.size > FILE_SIZE_MAX_LIMIT) {
			target.value = "";
			toast.error("업로드 가능한 최대 용량은 1MB입니다. ");
			return;
		}

		const newFileURL = URL.createObjectURL(files);

		changeFile(newFileURL);
	};

	return (
		<Flex styles={{ align: "center", gap: "60px" }}>
			<img src={fileURL ? fileURL : DefaultProfileImg} alt="petProfileImg" css={imgStyle} />
			<Flex styles={{ direction: "column", gap: "14px" }}>
				<Text css={getFormTextStyle(false)}>프로필 이미지</Text>
				<input type="file" id="profileImg" onChange={handleChangeImg} css={inputNoneDisplayStyle} />
				<label htmlFor="profileImg" css={commonButtonStyle}>
					<Text css={getDefaultTextStyle(Theme.color.disabled_text, 500)}>
						컴퓨터에서 파일 선택
					</Text>
				</label>
				<Text size="small" css={getDefaultTextStyle(Theme.color.disabled_text, 500)}>
					확장자: png, jpg, jpeg / 용량: 1MB 이하
				</Text>
			</Flex>
		</Flex>
	);
};

export default PetProfile;
