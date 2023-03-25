interface GameBannerProps {
	bannerUrl: string;
	title: string;
	adsCount: number;
}

const GameBanner = (props: GameBannerProps) => {
	return (
		<div className="relative rounded-lg overflow-hidden w-[285px] h-[380px] mr-4">
			<img src={props.bannerUrl} className="pointer-events-none" />
			<div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute left-0 right-0 bottom-0">
				<strong className="font-bold text-white block">{props.title}</strong>
				<span className="text-zinc-300 text-sm block">{`${
					props.adsCount > 0 ? `${props.adsCount} anúncios` : `${props.adsCount} anúncio`
				}`}</span>
			</div>
		</div>
	);
};

export default GameBanner;
