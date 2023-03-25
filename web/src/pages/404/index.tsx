import { ArrowUDownLeft } from 'phosphor-react';
import { Link, useRouteError } from 'react-router-dom';

const ErrorPage = () => {
	const { status, statusText, message }: any = useRouteError();

	return (
		<div className="flex text-white h-[100vh] w-[100vw] justify-center items-center flex-col">
			<div className="flex flex-col md:justify-center md:items-center max-w-[800px] w-full">
				<div className="mx-4 flex items-center flex-col my-auto text-white">
					<h1 className="text-4xl mt-10">Oops!</h1>
					<p className="text-center text-8xl mt-10">
						{status}
						<i className="text-5xl">{statusText || message}</i>
					</p>
					<p className="mt-10">Parece que você se aventurou demais e acabou se perdendo.</p>
				</div>

				<Link
					to="/"
					className="bg-violet-500 px-5 h-12 rounded font-semibold flex items-center justify-center gap-3 hover:bg-violet-600 max-w-[254px] mt-10  whitespace-nowrap"
				>
					<ArrowUDownLeft />
					Voltar para página inicial
				</Link>
			</div>
		</div>
	);
};

export default ErrorPage;
