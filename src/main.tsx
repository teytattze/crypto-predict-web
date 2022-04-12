import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './app';
import { muiTheme } from './styles/mui-theme';

ReactDOM.render(
	<React.StrictMode>
		<ThemeProvider theme={muiTheme}>
			<CssBaseline />
			<App />
		</ThemeProvider>
	</React.StrictMode>,
	document.getElementById('root'),
);
