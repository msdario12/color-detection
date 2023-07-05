import { useEffect } from 'react';
import createStringColor from '../utils/createStringColor';
import getColorTextBasedInBackground from '../utils/getColorTextBasedInBackground';
import { useAnimate, useInView } from 'framer-motion';

export default function ContentIndividualColor(props) {
	const { isColorSmall, color, colorMode, divsQty, className, isHoverColor } =
		props;
	const [scope, animate] = useAnimate();
	const isInView = useInView(scope);

	useEffect(() => {
		if (isInView && isColorSmall) {
			if (isHoverColor) {
				animate(scope.current, { opacity: 1 }, { delay: 0.2, type: 'tween' });
			} else {
				animate(
					scope.current,
					{ opacity: 0 },
					{ duration: 0.1, type: 'tween' }
				);
			}
		}
	}, [isHoverColor]);

	const dimension = '175px';
	const divStyle = {
		height: dimension,
		backgroundColor: createStringColor(color, colorMode),
		color: getColorTextBasedInBackground(color, colorMode),
	};
	const percentage =
		(Number(color.similarColors.length) / Number(divsQty ** 2)) * 100;
	return (
		<div
			style={divStyle}
			className={
				'flex flex-col items-center justify-center font-semibold ' + className
			}>
			{
				<div
					ref={scope}
					style={{ rotate: 180, opacity: !isColorSmall ? 1 : 0 }}>
					<h3>{createStringColor(color, colorMode)}</h3>
					<p>Participación {percentage.toFixed(2)}%</p>
				</div>
			}
		</div>
	);
}
