import { ToastContainer, ToastContainerProps } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function Toast(props: ToastContainerProps) {
	return <ToastContainer {...props} />;
}
