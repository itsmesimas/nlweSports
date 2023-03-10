const Cards = () => {
	const games = [
		{ name: 'League of legends', img: '/game1.svg', qt: `${Math.floor(Math.random() * 100)} anúncios` },
		{ name: 'Dota2', img: '/game2.svg', qt: `${Math.floor(Math.random() * 100)} anúncios` },
		{ name: 'Counter-strike', img: '/game3.svg', qt: `${Math.floor(Math.random() * 100)} anúncios` },
		{ name: 'Apex', img: '/game4.svg', qt: `${Math.floor(Math.random() * 100)} anúncios` },
		{ name: 'Fortnite', img: '/game5.svg', qt: `${Math.floor(Math.random() * 100)} anúncios` },
		{ name: 'World of wawrcraft', img: '/game6.svg', qt: `${Math.floor(Math.random() * 100)} anúncios` },
	];
	return (
		<div className="grid grid-cols-6 gap-6 mt-16">
			{games.map(({ name, img, qt }, idx) => (
				<a className="relative rounded-lg overflow-hidden" key={idx}>
					<img src={img} />
					<div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute left-0 right-0 bottom-0">
						<strong className="font-bold text-white block">{name}</strong>
						<span className="text-zinc-300 text-sm block">{qt}</span>
					</div>
				</a>
			))}
		</div>
	);
};

export default Cards;
