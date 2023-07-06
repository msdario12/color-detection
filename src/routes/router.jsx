import { createBrowserRouter } from 'react-router-dom';
import { HomeScreen } from '../pages/HomeScreen';
import { Root } from './Root';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		children: [
			{
				path: '/',
				element: <HomeScreen />,
			},
		],
	},
]);
