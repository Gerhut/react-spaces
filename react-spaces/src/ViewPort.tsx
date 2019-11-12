import * as React from 'react';
import './Styles.css';
import * as PropTypes from "prop-types";
import { SpaceInternal } from './Space';
import { SpaceContext } from './Globals/Contexts';
import { ISpace } from './Globals/Types';
import { createSpaceContext } from './Globals/ISpaceContext';

interface IProps {
	className?: string,
	left?: number,
	top?: number,
	right?: number,
	bottom?: number
}

export const ViewPort : React.FC<IProps> = (props) => {
	const [ children, setChildren ] = React.useState<ISpace[]>([]);

	return (
		<div 
			className={`spaces-fullpage-layout${props.className ? ` ${props.className}` : ``}`}
			style={{ 
				left: props.left || 0, 
				top: props.top || 0, 
				right: props.right || 0, 
				bottom: props.bottom || 0
			}}>
			<SpaceContext.Provider value={createSpaceContext(children, setChildren)}>
				<SpaceInternal topMost={true}>
					{props.children}
				</SpaceInternal>
			</SpaceContext.Provider>
		</div>
	)
}

ViewPort.propTypes = {
	className: PropTypes.string,
	left: PropTypes.number,
	top: PropTypes.number,
	right: PropTypes.number,
	bottom: PropTypes.number
}