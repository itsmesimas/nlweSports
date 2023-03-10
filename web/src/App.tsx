import { RouterProvider } from 'react-router-dom';
import Routes from './Routes/Routes';

import './styles/main.css';

function App() {
	return <RouterProvider router={Routes} />;
}

export default App;
