import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import AdsModal from '../../components/AdsModal';
import CreateAdBanner from '../../components/CreateAdBanner';
import GameBanner from '../../components/GameBanner';
import Header from '../../components/Header';
import Api from '../../services/Api';

export interface GameProps {
	id: number;
	bannerUrl: string;
	title: string;
	adsCount: number;
	_count: {
		ads: number;
	};
}

const Home = () => {
	const carouselRef = useRef<null | HTMLDivElement>(null);
	const [games, setGames] = useState<GameProps[]>([]);
	const [openAdsModal, setOpenAdsModal] = useState(false);
	const [carouselWidth, setCarouselWidth] = useState(0);

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

	useEffect(() => {
		carouselRef.current && setCarouselWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
	}, [carouselRef.current]);

	return (
		<div className="max-w-[1344px] mx-auto flex items-center flex-col my-20 md:mx-4 md:my-4">
			<Header />

			<div className="w-full overflow-hidden">
				<motion.div whileTap={{ cursor: 'grabbing' }} ref={carouselRef} className="cursor-grab">
					<motion.div
						className="flex w-full"
						drag="x"
						dragConstraints={{ right: 0, left: -carouselWidth }}
						initial={{ x: 100 }}
						animate={{ x: 0 }}
						transition={{ duration: 0.5 }}
					>
						{games.map((game) => (
							<motion.div key={game.id}>
								<GameBanner bannerUrl={game.bannerUrl} adsCount={game._count.ads} title={game.title} />
							</motion.div>
						))}
					</motion.div>
				</motion.div>
			</div>

			<CreateAdBanner openAdsModal={openAdsModal} setOpenAdsModal={setOpenAdsModal} />

			<AdsModal openAdsModal={openAdsModal} setOpenAdsModal={setOpenAdsModal} data={games} />
		</div>
	);
};

export default Home;
