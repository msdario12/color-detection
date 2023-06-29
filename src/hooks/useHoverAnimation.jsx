import { gsap } from 'gsap';

export default function useHoverAnimation() {
	const onEnter = ({ currentTarget }) => {
		gsap.to(currentTarget, { scale: 1.1 });
	};

	const onLeave = ({ currentTarget }) => {
		gsap.to(currentTarget, { scale: 1 });
	};

	return { onEnter, onLeave };
}
