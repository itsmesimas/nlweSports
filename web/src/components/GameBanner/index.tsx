import { Link } from 'react-router-dom';

interface GameBannerProps {
	bannerUrl: string;
	title: string;
	adsCount: number;
}

const GameBanner = (props: GameBannerProps) => {
	return (
		<Link to="/" className="relative rounded-lg overflow-hidden">
			<img src={props.bannerUrl} />
			<div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute left-0 right-0 bottom-0">
				<strong className="font-bold text-white block">{props.title}</strong>
				<span className="text-zinc-300 text-sm block">{`${
					props.adsCount > 0 ? `${props.adsCount} anúncios` : `${props.adsCount} anúncio`
				}`}</span>
			</div>
		</Link>
	);
};

export default GameBanner;
