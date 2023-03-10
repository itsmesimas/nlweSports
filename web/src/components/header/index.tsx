import logo from '../../assets/logo.svg';

const Header = () => {
	return (
			<div className="flex items-center flex-col my-20">
				<img src={logo} />
				<h1 className=" text-6xl text-white font-black mt-20">
					Seu <span className="text-transparent bg-clip-text bg-nlw-gradient">duo</span> está aqui
				</h1>
			</div>
	);
};

export default Header;
