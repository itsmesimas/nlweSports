import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from '../pages/404';
import Home from '../pages/Home';

const Routes = createBrowserRouter([
	{
		errorElement: <ErrorPage />,
		children: [
			{
				path: '/',
				element: <Home />,
			},
			{
				path: 'home',
				element: <Home />,
			},
		],
	},
]);

export default Routes;
