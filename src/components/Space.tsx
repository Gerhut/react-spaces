import { ISpaceProps, CenterType } from "../core-types";
import { useSpace, ParentContext, LayerContext, DOMRectContext } from "../core-react";
import * as React from "react";
import { Centered } from "./Centered";
import { CenteredVertically } from "./CenteredVertically";

function applyCentering(children: React.ReactNode, centerType: CenterType | undefined) {
	switch (centerType) {
		case CenterType.Vertical:
			return <CenteredVertically>{children}</CenteredVertically>;
		case CenterType.HorizontalVertical:
			return <Centered>{children}</Centered>;
	}
	return children;
}

export const Space: React.FC<ISpaceProps> = (props) => {
	const {
		style,
		className,
		onClick,
		onDoubleClick,
		onMouseDown,
		onMouseEnter,
		onMouseLeave,
		onMouseMove,
		onTouchStart,
		onTouchMove,
		onTouchEnd,
		children,
	} = props;

	const events = {
		onClick: onClick,
		onDoubleClick: onDoubleClick,
		onMouseDown: onMouseDown,
		onMouseEnter: onMouseEnter,
		onMouseLeave: onMouseLeave,
		onMouseMove: onMouseMove,
		onTouchStart: onTouchStart,
		onTouchMove: onTouchMove,
		onTouchEnd: onTouchEnd,
	};

	const { space, domRect, elementRef, resizeHandles } = useSpace(props);

	React.useEffect(() => {
		space.element = elementRef.current!;
	}, []);

	const userClasses = className ? className.split(" ").map((c) => c.trim()) : [];

	const outerClasses = [...["spaces-space", space.children.find((s) => s.resizing) ? "spaces-resizing" : undefined], ...userClasses].filter(
		(c) => c,
	);

	const centeredContent = applyCentering(children, props.centerContent);

	return (
		<>
			{resizeHandles.touchHandles.map((r) => (
				<div {...r} />
			))}
			{resizeHandles.mouseHandles.map((r) => (
				<div {...r} />
			))}
			{React.createElement(
				props.as || "div",
				{
					...{
						id: space.id,
						ref: elementRef,
						className: outerClasses.join(" "),
						style: style,
					},
					...events,
				},
				<>
					<ParentContext.Provider value={space.id}>
						<LayerContext.Provider value={undefined}>
							<DOMRectContext.Provider value={domRect}>{centeredContent}</DOMRectContext.Provider>
						</LayerContext.Provider>
					</ParentContext.Provider>
				</>,
			)}
		</>
	);
};
