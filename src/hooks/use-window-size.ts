import { useEffect, useState } from 'react';

export function useWindowSize() {
	const [state, setState] = useState<{
		width: number;
		height: number;
	}>({
		width: window.innerWidth,
		height: window.innerHeight,
	});

	useEffect(() => {
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	const handleResize = () => {
		setState({
			width: window.innerWidth,
			height: window.innerHeight,
		});
	};

	return state;
}
