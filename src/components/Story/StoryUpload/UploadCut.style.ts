import { css } from "@emotion/react";

import { Theme } from "@/styles/Theme";

export const layoutStyle = css({
	width: "740px",
	height: "790px",
	backgroundColor: Theme.color.white,
	border: `5px solid ${Theme.color.white}`,
	borderRadius: "42px",
	boxShadow: Theme.boxShadow.shadow1,
	flexDirection: "column",
});

export const headerStyle = css({
	justifyContent: "center",
	alignItems: "center",
	width: "100%",
	height: "54px",
	padding: "0 36px",
	borderBottom: `1px solid ${Theme.color.border}`,
	position: "relative",

	"& > svg": {
		position: "absolute",
		left: "24px",
	},
});

export const imgBoxStyle = css({
	width: "100%",
	height: "calc(100% - 54px)",
	position: "relative",

	"& > img": {
		width: "100%",
		height: "100%",
		objectFit: "cover",
	},
});

export const galleryBoxStyle = css({
	gap: "24px",
	alignItems: "center",
	maxWidth: "682px",
	height: "134px",
	padding: "14px",
	borderRadius: "10px",
	backgroundColor: "rgba(0, 0, 0, 0.7)",
	position: "absolute",
	bottom: "60px",
	right: 0,

	"& > input": {
		display: "none !important",
	},
});

export const galleryIconBoxStyle = css({
	width: "50px",
	height: "50px",
	borderRadius: "50%",
	backgroundColor: "rgba(0, 0, 0, 0.7)",
	alignItems: "center",
	justifyContent: "center",
	position: "absolute",
	bottom: "24px",
	right: "24px",
	cursor: "pointer",
});

export const galleryPlusIconBoxStyle = css({
	all: "unset",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	width: "50px",
	height: "50px",
	borderRadius: "50%",
	border: `1px solid ${Theme.color.border}`,
	marginRight: "12px",
	cursor: "pointer",
});
