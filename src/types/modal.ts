import type { SchedulePositionType, ScheduleType } from "@/types/planning";

export interface ModalType {
	key: string;
	component?: () => JSX.Element;
	notCloseIcon?: boolean;
	isWhiteIcon?: boolean;
	close?: () => void;
	isUpper?: boolean;
}

export interface MoreModalStateType {
	day: string | null;
}

export interface ScheduleModalType {
	schedule: ScheduleType;
	position: SchedulePositionType;
}

export interface MoreModalType {
	day: Date;
	schedules: Array<ScheduleType>;
	position: SchedulePositionType;
}

export interface modalCloseType {
	modalClose: () => void;
}
