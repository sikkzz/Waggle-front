import type { ComponentPropsWithoutRef, ElementType } from "react";

import { getBoxStyling } from "@/components/common/Box/Box.styles";

import type { BoxStylingProps } from "@/components/common/Box/Box.styles";

export interface BoxProps extends ComponentPropsWithoutRef<"div"> {
	/**
	 * Box 컴포넌트가 사용할 HTML 태그
	 *
	 * @default 'div'
	 */
	tag?: ElementType;
	/** Box 컴포넌트 스타일 옵션 */
	styles?: BoxStylingProps;
}

const Box = ({ tag = "div", styles = {}, children, ...attributes }: BoxProps) => {
	const Tag = tag;

	return (
		<Tag css={getBoxStyling(styles)} {...attributes}>
			{children}
		</Tag>
	);
};

export default Box;
