import * as Checkbox from '@radix-ui/react-checkbox';
import * as Dialog from '@radix-ui/react-dialog';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import * as Select from '@radix-ui/react-select';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { Check, GameController } from 'phosphor-react';
import { FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { GameProps } from '../../pages/Home';
import Api from '../../services/Api';
import { Input } from '../Form/Input';
import { Toast } from '../Toast/toast';

interface AdsModalProps {
	openAdsModal: boolean;
	setOpenAdsModal: React.Dispatch<React.SetStateAction<boolean>>;
	data: GameProps[];
}

const AdsModal = ({ data, openAdsModal, setOpenAdsModal }: AdsModalProps) => {
	const [weekDays, setWeekDays] = useState<string[]>([]);
	const [useVoiceChannel, setUseVoiceChannel] = useState(false);
	const [gameId, setGameId] = useState<string>('');
	const [errorMsgs, setErrorMsgs] = useState({
		game: '',
		name: '',
		yearsPlaying: '',
		discord: '',
		weekDays: [],
		hourStar: '',
	});

	async function handleCreateAd(event: FormEvent) {
		event.preventDefault();
		const formData = new FormData(event.target as HTMLFormElement);
		const data = Object.fromEntries(formData);

		try {
			await Api.post(`/games/${gameId}/ads`, {
				name: data.name,
				yearsPlaying: Number(data.yearsPlaying),
				discord: data.discord,
				weekDays: weekDays.map(Number),
				hourStart: data.hourStart,
				hourEnd: data.hourEnd,
				useVoiceChannel: useVoiceChannel,
			});

			toast.success('Anúncio criado com sucesso', { theme: 'colored' });
			setWeekDays([]);
			setUseVoiceChannel(false);
			setOpenAdsModal(false);
		} catch (err) {
			console.error(err);
			toast.error('Ops... erro ao tentar criar anúncio', { theme: 'colored' });
		}
	}

	return (
		<Dialog.Root open={openAdsModal} onOpenChange={() => setOpenAdsModal(!openAdsModal)}>
			<Dialog.Overlay className="bg-black/60 inset-0 fixed" />

			<Dialog.Content className="fixed bg-[#2A2634] py-8 p-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg max-w-[480px] w-full shadow-xl shadow-black/25 sm:w-[90%] sm:py-4 sm:px-5 sm:text-xs xm:whitespace-nowrap">
				<Dialog.Title className="font-black text-3xl sm:text-xl">Publique um anúncio</Dialog.Title>

				<form onSubmit={handleCreateAd} className="flex flex-col gap-4 mt-8">
					<div className="flex flex-col gap-2">
						<label htmlFor="game" className="font-semibold">
							Qual o game?
						</label>
						<Select.Root name="game" onValueChange={setGameId}>
							<Select.Trigger className="bg-zinc-900 py-3 px-4 rounded text-sm text-zinc-500 appearence-none flex items-center justify-between">
								<Select.Value placeholder="Selecione o game que deseja jogar" />
								<ChevronDownIcon />
							</Select.Trigger>

							<Select.SelectPortal>
								<Select.SelectContent className="bg-zinc-900 text-white rounded-lg">
									<Select.ScrollUpButton>
										<ChevronUpIcon />
									</Select.ScrollUpButton>
									<Select.SelectViewport className="p-2 rounded-lg">
										<Select.SelectGroup>
											{data.map((game) => {
												return (
													<Select.SelectItem
														key={game.id}
														value={game.id.toString()}
														className="hover:bg-violet-600 px-5 py-3 cursor-pointer relative text-sm flex justify-start items-center rounded"
													>
														<Select.SelectItemText>{game.title}</Select.SelectItemText>

														<Select.ItemIndicator className="absolute left-0 inline-flex items-center">
															<CheckIcon />
														</Select.ItemIndicator>
													</Select.SelectItem>
												);
											})}
										</Select.SelectGroup>
									</Select.SelectViewport>
								</Select.SelectContent>
							</Select.SelectPortal>
						</Select.Root>
					</div>

					<div className="flex flex-col gap-2">
						<label htmlFor="name">Seu nome (ou nickname)</label>
						<Input name="name" id="name" type="text" placeholder="Como te chamam dentro do game?" />
					</div>

					<div className="grid grid-cols-2 gap-6 sm:whitespace-nowrap">
						<div className="flex flex-col gap-2">
							<label htmlFor="yearsPlaying">Tempo de jogo?</label>
							<Input name="yearsPlaying" id="yearsPlaying" type="number" placeholder="Tudo bem ser ZERO" />
						</div>
						<div className="flex flex-col gap-2">
							<label htmlFor="discord">Qual seu discord?</label>
							<Input name="discord" id="discord" type="text" placeholder="Usuário#0000" />
						</div>
					</div>

					<div className="flex gap-6 sm:flex-col">
						<div className="flex flex-col gap-2">
							<label htmlFor="weekDays">Quando costuma jogar?</label>
							<ToggleGroup.Root
								type="multiple"
								className="grid grid-cols-4 gap-2"
								onValueChange={setWeekDays}
								value={weekDays}
							>
								<ToggleGroup.ToggleGroupItem
									value="0"
									type="button"
									className={`w-8 h-8 rounded sm:w-full ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}`}
									title="Domingo"
								>
									D
								</ToggleGroup.ToggleGroupItem>
								<ToggleGroup.ToggleGroupItem
									value="1"
									type="button"
									className={`w-8 h-8 rounded sm:w-full ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'}`}
									title="Segunda"
								>
									S
								</ToggleGroup.ToggleGroupItem>
								<ToggleGroup.ToggleGroupItem
									value="2"
									type="button"
									className={`w-8 h-8 rounded sm:w-full ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}`}
									title="Terça"
								>
									T
								</ToggleGroup.ToggleGroupItem>
								<ToggleGroup.ToggleGroupItem
									value="3"
									type="button"
									className={`w-8 h-8 rounded sm:w-full ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}`}
									title="Quarta"
								>
									Q
								</ToggleGroup.ToggleGroupItem>
								<ToggleGroup.ToggleGroupItem
									value="4"
									type="button"
									className={`w-8 h-8 rounded sm:w-full ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}`}
									title="Quinta"
								>
									Q
								</ToggleGroup.ToggleGroupItem>
								<ToggleGroup.ToggleGroupItem
									value="5"
									type="button"
									className={`w-8 h-8 rounded sm:w-full ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}`}
									title="Sexta"
								>
									S
								</ToggleGroup.ToggleGroupItem>
								<ToggleGroup.ToggleGroupItem
									value="6"
									type="button"
									className={`w-8 h-8 rounded sm:w-full ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}`}
									title="Sábado"
								>
									S
								</ToggleGroup.ToggleGroupItem>
							</ToggleGroup.Root>
						</div>

						<div className="flex flex-col gap-2 flex-1">
							<label htmlFor="hourStart">Qual horário do dia?</label>
							<div className="grid grid-cols-2 gap-2">
								<Input name="hourStart" type="time" id="hourStart" />
								<Input name="hourEnd" type="time" id="hourEnd" />
							</div>
						</div>
					</div>

					<div className="mt-2 flex gap-2 text-sm items-center sm:text-xs">
						<Checkbox.Root
							name="useVoiceChannel"
							// checked={useVoiceChannel}
							onCheckedChange={(checked) => {
								checked ? setUseVoiceChannel(true) : setUseVoiceChannel(false);
							}}
							className="w-6 h-6 p-1 rounded bg-zinc-900"
						>
							<Checkbox.Indicator>
								<Check className="w-4 h-4 text-emerald-400" />
							</Checkbox.Indicator>
						</Checkbox.Root>
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
			<Toast />
		</Dialog.Root>
	);
};

export default AdsModal;
