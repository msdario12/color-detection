import { gsap } from 'gsap';

export default function useFadeInAnimation(currentRef) {
	gsap.from(currentRef, {
		duration: 1,
		autoAlpha: 0,
		ease: 'none',
	});
}
