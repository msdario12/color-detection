import { createBrowserRouter } from 'react-router-dom';
import { HomeScreen } from '../pages/HomeScreen';
import { Root } from './Root';
import { AboutProject } from '../pages/AboutProject';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		children: [
			{
				path: '/',
				element: <HomeScreen />,
			},
			{
				path: '/about-project',
				element: <AboutProject />,
			},
		],
	},
]);
