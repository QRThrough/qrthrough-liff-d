import { Flex } from "@mantine/core";
import React from "react";

type Props = {
	isExpanded?: boolean;
	isCenter?: boolean;
	maxWidth?: string;
	children?: React.ReactNode;
};

function PageLayout({
	isExpanded = true,
	isCenter = false,
	maxWidth = "none",
	children,
}: Props) {
	return (
		<Flex
			maw={maxWidth}
			sx={isExpanded ? { flex: 1 } : {}}
			justify={isCenter ? "center" : "flex-start"}
			align={isCenter ? "center" : "flex-start"}
		>
			{children}
		</Flex>
	);
}

export default PageLayout;
