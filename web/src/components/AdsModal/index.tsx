import * as Dialog from '@radix-ui/react-dialog';
import { GameController } from 'phosphor-react';
import { Input } from '../Form/Input';

interface AdsModalProps {
	openAdsModal: boolean;
	setOpenAdsModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AdsModal = ({ openAdsModal, setOpenAdsModal }: AdsModalProps) => {
	return (
		<Dialog.Root open={openAdsModal} onOpenChange={() => setOpenAdsModal(!openAdsModal)}>
			<Dialog.Overlay className="bg-black/60 inset-0 fixed" />

			<Dialog.Content className="fixed bg-[#2A2634] py-8 p-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg max-w-[480px] w-full shadow-xl shadow-black/25">
				<Dialog.Title className="font-black text-3xl ">Publique um anúncio</Dialog.Title>

				<form className="flex flex-col gap-4 mt-8">
					<div className="flex flex-col gap-2">
						<label htmlFor="game" className="font-semibold">
							Qual o game?
						</label>
						<Input id="game" placeholder="Selecione o game que deseja jogar" type="text" />
					</div>

					<div className="flex flex-col gap-2">
						<label htmlFor="name">Seu nome (ou nickname)</label>
						<Input id="name" type="text" placeholder="Como te chamam dentro do game?" />
					</div>

					<div className="grid grid-cols-2 gap-6">
						<div className="flex flex-col gap-2">
							<label htmlFor="yearsPlaying">Joga a quantos anos?</label>
							<Input id="yearsPlaying" type="number" placeholder="Tudo bem ser ZERO" />
						</div>
						<div className="flex flex-col gap-2">
							<label htmlFor="discord">Qual seu discord?</label>
							<Input id="discord" type="text" placeholder="Usuário#0000" />
						</div>
					</div>

					<div className="flex gap-6">
						<div className="flex flex-col gap-2">
							<label htmlFor="weekDays">Quando costuma jogar?</label>
							<div className="grid grid-cols-4 gap-2">
								<button className="w-8 h-8 rounded bg-zinc-900" title="Domingo">
									D
								</button>
								<button className="w-8 h-8 rounded bg-zinc-900" title="Segunda">
									S
								</button>
								<button className="w-8 h-8 rounded bg-zinc-900" title="Terça">
									T
								</button>
								<button className="w-8 h-8 rounded bg-zinc-900" title="Quarta">
									Q
								</button>
								<button className="w-8 h-8 rounded bg-zinc-900" title="Quinta">
									Q
								</button>
								<button className="w-8 h-8 rounded bg-zinc-900" title="Setxa">
									S
								</button>
								<button className="w-8 h-8 rounded bg-zinc-900" title="Sábado">
									S
								</button>
							</div>
						</div>

						<div className="flex flex-col gap-2 flex-1">
							<label htmlFor="hourStart">Qual horário do dia?</label>
							<div className="grid grid-cols-2 gap-2">
								<Input type="time" id="hourStart" />
								<Input type="time" id="hourEnd" />
							</div>
						</div>
					</div>

					<div className="mt-2 flex gap-2 text-sm">
						<Input type="checkbox" />
						Costumo me conectar ao chat de voz
					</div>

					<footer className="mt-4 flex justify-end gap-4">
						<Dialog.Close type="button" className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600">
							Cancelar
						</Dialog.Close>
						<button
							type="submit"
							className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
						>
							<GameController className="w-6 h-6" /> Encontrar duo
						</button>
					</footer>
				</form>
			</Dialog.Content>
		</Dialog.Root>
	);
};

export default AdsModal;
