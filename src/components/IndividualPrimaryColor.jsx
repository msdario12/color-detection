import { useRef, useState } from 'react';
import ContentIndividualColor from './ContentIndividualColor';
import { motion } from 'framer-motion';

export default function IndividualPrimaryColor(props) {
	const [isHoverColor, setIsHoverColor] = useState(false);
	const { color, colorMode, divsQty, className, isColorSmall, colorWidth } =
		props;
	const style = {
		width: colorWidth,
	};

	const variants = {
		hover: { scale: 1.2, width: 200, zIndex: 10 },
		not: { scale: 1 },
	};

	const divColorRef = useRef(null);

	return (
		<motion.div
			ref={divColorRef}
			style={style}
			className={className}
			onHoverStart={() => setIsHoverColor(true)}
			onHoverEnd={() => setIsHoverColor(false)}
			animate={isHoverColor && isColorSmall ? 'hover' : 'not'}
			variants={variants}
			whileTap={{
				scale: 0.8,
				rotate: -90,
				borderRadius: '100%',
			}}>
			<ContentIndividualColor
				isHoverColor={isHoverColor}
				isColorSmall={isColorSmall}
				color={color}
				divsQty={divsQty}
				colorMode={colorMode}
			/>
		</motion.div>
	);
}
