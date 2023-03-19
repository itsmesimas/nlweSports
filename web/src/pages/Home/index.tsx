import { useEffect, useState } from 'react';
import AdsModal from '../../components/AdsModal';
import CreateAdBanner from '../../components/CreateAdBanner';
import GameBanner from '../../components/GameBanner';
import Header from '../../components/Header';
import Api from '../../services/Api';

interface GameProps {
	id: number;
	bannerUrl: string;
	title: string;
	adsCount: number;
	_count: {
		ads: number;
	};
}

const Home = () => {
	const [games, setGames] = useState<GameProps[]>([]);
	const [openAdsModal, setOpenAdsModal] = useState(false);

	const fetchGamesData = async () => {
		try {
			const { data, status } = await Api.get('/games');

			if (status === 200) {
				setGames(data);
			}
		} catch (err) {
			console.error(err);
		}
	};
	useEffect(() => {
		fetchGamesData();
	}, []);

	return (
		<div className="max-w-[1344px] mx-auto flex items-center flex-col my-20">
			<Header />

			<div className="grid grid-cols-6 gap-6 mt-16">
				{games.map((game) => (
					<GameBanner bannerUrl={game.bannerUrl} adsCount={game._count.ads} key={game.id} title={game.title} />
				))}
			</div>

			<CreateAdBanner openAdsModal={openAdsModal} setOpenAdsModal={setOpenAdsModal} />

			<AdsModal openAdsModal={openAdsModal} setOpenAdsModal={setOpenAdsModal} />
		</div>
	);
};

export default Home;
