import { Box, Breakpoint, Typography, useMediaQuery } from '@mui/material';
import { useLayoutEffect, useRef, useState } from 'react';
import Plotly, { PlotParams } from 'react-plotly.js';
import { useWidth } from '../hooks/use-width';
import { useWindowSize } from '../hooks/use-window-size';

interface IPlotProps extends PlotParams {
	title: string;
}

export function Plot({ title, layout, ...props }: IPlotProps) {
	const boxRef = useRef<HTMLDivElement>();
	const width = useWidth();
	const windowSize = useWindowSize();
	const [plotSize, setPlotSize] = useState({
		width: 0,
		height: 0,
	});

	useLayoutEffect(() => {
		if (boxRef.current) {
			setPlotSize({
				width: boxRef.current.offsetWidth,
				height: boxRef.current.offsetHeight,
			});
		}
	}, [windowSize]);

	return (
		<>
			<Box
				ref={boxRef}
				component="section"
				sx={{
					background: '#fafafa',
					border: 1,
					borderColor: 'grey.200',
					borderRadius: 2,
					py: 4,
					px: {
						xs: 2,
						sm: 3,
						lg: 4,
					},
				}}
			>
				<Typography
					variant="h6"
					sx={{
						color: 'primary',
					}}
				>
					{title}
				</Typography>
				<Box sx={{ textAlign: 'center' }}>
					<Plotly
						{...props}
						layout={{
							width: plotSize.width - boxPadding[width],
							margin: {
								t: 24,
								l: 24,
								b: 24,
								r: 24,
								pad: 4,
							},
							paper_bgcolor: '#fafafa',
							plot_bgcolor: '#fafafa',
							...layout,
						}}
					/>
				</Box>
			</Box>
		</>
	);
}

const boxPadding: Record<Breakpoint, number> = {
	xs: 32,
	sm: 48,
	md: 48,
	lg: 64,
	xl: 64,
};
