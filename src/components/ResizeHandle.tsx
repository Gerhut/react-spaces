import * as React from "react";
import { ResizeType, ISpace, AnchorToResizeTypeMap, AnchorType } from "../types";
import { startMouseResize, startTouchResize } from "../resizing";
import { ISpaceContext } from "../ISpaceContext";
import "../styles.css";

interface IProps {
	resizable?: boolean;
	anchor?: AnchorType;
	handleSize?: number;
	maximumSize?: number;
	minimumSize?: number;
	parentContext: ISpaceContext | undefined;
	space: ISpace;
	spaceElement: HTMLElement | undefined;
	onResizeStart?: () => boolean | void;
	onResizeEnd?: (newSize: number) => void;
}

export const ResizeHandle: React.FC<IProps> = (props) => {
	if (props.parentContext && props.anchor && props.resizable) {
		const handleSize = props.handleSize === undefined ? 5 : props.handleSize;
		const resizeType: ResizeType | undefined = props.anchor ? AnchorToResizeTypeMap[props.anchor] : undefined;
		const width = resizeType === ResizeType.Left || resizeType === ResizeType.Right ? handleSize : undefined;
		const height = resizeType === ResizeType.Top || resizeType === ResizeType.Bottom ? handleSize : undefined;
		return (
			<div
				style={{ width: width, height: height }}
				className={`spaces-resize-handle ${AnchorToResizeTypeMap[props.anchor]}`}
				onMouseDown={(e) =>
					startMouseResize(e, props.parentContext, props.space, props, props.spaceElement, resizeType, undefined, props.onResizeEnd)
				}
				onTouchStart={(e) =>
					startTouchResize(e, props.parentContext, props.space, props, props.spaceElement, resizeType, undefined, props.onResizeEnd)
				}
			/>
		);
	}

	return null;
};
